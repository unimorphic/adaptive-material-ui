import {
  argbFromHex,
  customColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import {
  ColorSystemOptions,
  createTheme,
  decomposeColor,
  hslToRgb,
  PaletteOptions,
  rgbToHex,
  Theme,
  ThemeProvider,
  ThemeProviderProps,
  TypographyVariants,
} from "@mui/material/styles";
import { useMemo } from "react";
import {
  AdaptiveMode,
  AdaptiveModeContext,
  useAdaptiveMode,
} from "../adaptiveMode/adaptiveMode";

export interface AdaptiveThemeProps
  extends Omit<ThemeProviderProps<Theme>, "theme"> {
  adaptiveModeInfo?: {
    mode?: AdaptiveMode;
    userAgent?: string;
  };

  theme?: Partial<Theme> | ((adaptiveMode: AdaptiveMode) => Partial<Theme>);
}

interface FinalTheme extends Theme {
  colorSchemes?: Partial<Record<"light" | "dark", ColorSystemOptions>>;
}

const iosFontFamily =
  '-apple-system, "SF Pro Text", "SF UI Text", system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

function convertColorToHex(color: string) {
  const colorType = decomposeColor(color).type;
  return color.startsWith("#")
    ? color
    : colorType.startsWith("rgb")
      ? rgbToHex(color)
      : colorType.startsWith("hsl")
        ? rgbToHex(hslToRgb(color))
        : null;
}

// https://stackoverflow.com/a/54569758/264921
function invertHexColor(hex: string) {
  return (
    "#" +
    (Number(`0x1${hex.substring(1)}`) ^ 0xffffff).toString(16).substring(1)
  );
}

function addMissingColors(palette: PaletteOptions | undefined, theme: Theme) {
  if (!palette) {
    return;
  }

  palette.tertiary ??= theme.palette.augmentColor({
    color: { main: "#7D5260" },
    name: "tertiary",
  });

  if (!palette.inverse) {
    const background = palette.background?.default
      ? convertColorToHex(palette.background.default)
      : null;

    palette.inverse = {
      background: background
        ? invertHexColor(background)
        : theme.palette.common.black,
      contrastText: background
        ? theme.palette.getContrastText(background)
        : theme.palette.common.white,
      primary: theme.palette.primary.main,
    };
  }

  for (const key of Object.keys(palette)) {
    const color = palette[key as keyof PaletteOptions];

    if (
      typeof color === "object" &&
      "main" in color &&
      (!color.container || !color.containerContrastText)
    ) {
      try {
        const tokens = customColor(argbFromHex("#000000"), {
          name: "temp",
          value: argbFromHex(
            convertColorToHex(color.main) ?? "unknown-color-type",
          ),
          blend: false,
        })[palette.mode ?? "light"];

        color.container ??= hexFromArgb(tokens.colorContainer);
        color.containerContrastText ??= hexFromArgb(tokens.onColorContainer);
      } catch (ex) {
        console.log(ex);
        console.warn(
          `Could not set the container colors for palette.${key}. Value ${color.main} is in a unsupported format, set the colors manually`,
        );
      }
    }
  }
}

function createAdaptiveTheme(
  adaptiveMode: AdaptiveMode,
  themePartial?: Partial<Theme>,
): Partial<Theme> {
  const theme = !themePartial?.typography
    ? (createTheme(themePartial ?? {}) as FinalTheme)
    : (themePartial as FinalTheme);

  addMissingColors(theme.palette, theme);
  if (theme.colorSchemes) {
    if (theme.colorSchemes.light) {
      addMissingColors(theme.colorSchemes.light.palette, theme);
    }
    if (theme.colorSchemes.dark) {
      addMissingColors(theme.colorSchemes.dark.palette, theme);
    }
  }

  if (adaptiveMode === "ios") {
    theme.typography.fontFamily = iosFontFamily;

    for (const key of Object.keys(theme.typography)) {
      const typography = theme.typography[key as keyof TypographyVariants];

      if (
        typography &&
        typeof typography === "object" &&
        "fontFamily" in typography &&
        typography.fontFamily?.toLowerCase().includes("roboto")
      ) {
        typography.fontFamily = iosFontFamily;
      }
    }
  }

  if (!theme.vars) {
    return theme;
  }

  if ("font" in theme) {
    theme.font = undefined;
  }
  return createTheme({ ...theme, cssVariables: true });
}

export function AdaptiveThemeProvider(props: AdaptiveThemeProps) {
  const { adaptiveModeInfo, theme, ...otherProps } = props;
  const resolvedAdaptiveMode = useAdaptiveMode(
    adaptiveModeInfo?.mode,
    adaptiveModeInfo?.userAgent,
  );

  const mergedTheme = useMemo(() => {
    const resolvedTheme =
      typeof theme === "function" ? theme(resolvedAdaptiveMode) : theme;

    return createAdaptiveTheme(resolvedAdaptiveMode, resolvedTheme);
  }, [resolvedAdaptiveMode, theme]);

  return (
    <AdaptiveModeContext.Provider value={{ mode: resolvedAdaptiveMode }}>
      <ThemeProvider {...otherProps} theme={mergedTheme}></ThemeProvider>
    </AdaptiveModeContext.Provider>
  );
}
