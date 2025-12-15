import {
  argbFromHex,
  customColor,
  DynamicColor,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeContent,
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

function getSchemeColor(
  scheme: SchemeContent,
  name: keyof typeof MaterialDynamicColors,
) {
  return hexFromArgb(
    (MaterialDynamicColors[name] as DynamicColor).getArgb(scheme),
  );
}

function addMissingColors(palette: PaletteOptions | undefined, theme: Theme) {
  if (!palette) {
    return;
  }

  if (!palette.inverse) {
    let background = palette.background?.default
      ? convertColorToHex(palette.background.default)
      : null;
    background = background
      ? invertHexColor(background)
      : palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black;

    palette.inverse = {
      background: background,
      contrastText: theme.palette.getContrastText(background),
    };
  }

  if (
    palette.background &&
    palette.primary &&
    "main" in palette.primary &&
    (!palette.background.container || !palette.dividerSecondary)
  ) {
    try {
      const scheme = new SchemeContent(
        Hct.fromInt(
          argbFromHex(
            convertColorToHex(palette.primary.main) ?? "unknown-color-type",
          ),
        ),
        palette.mode === "dark",
        0,
      );

      palette.background.container ??= {
        lowest: getSchemeColor(scheme, "surfaceContainerLowest"),
        low: getSchemeColor(scheme, "surfaceContainerLow"),
        main: getSchemeColor(scheme, "surfaceContainer"),
        high: getSchemeColor(scheme, "surfaceContainerHigh"),
        highest: getSchemeColor(scheme, "surfaceContainerHighest"),
      };
      palette.dividerSecondary ??= getSchemeColor(scheme, "outline");
    } catch (ex) {
      console.log(ex);
      console.warn(
        `Could not set the palette.background.container/palette.dividerSecondary colors. Value ${palette.primary.main} is in a unsupported format, set the colors manually`,
      );
    }
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
