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
  decomposeColor,
  hslToRgb,
  PaletteOptions,
  rgbToHex,
  Theme,
} from "@mui/material/styles";
import invert from "invert-color";
import {
  AdaptiveThemeProviderMin,
  AdaptiveThemeProps,
  AdaptiveTheme,
} from "./adaptiveThemeProviderMin";

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

function getSchemeColor(
  scheme: SchemeContent,
  name: keyof typeof MaterialDynamicColors,
) {
  return hexFromArgb(
    (MaterialDynamicColors[name] as DynamicColor).getArgb(scheme),
  );
}

export function addMissingColorsToPalette(
  palette: PaletteOptions | undefined,
  theme: Theme,
) {
  if (!palette) {
    return;
  }

  if (!palette.inverse) {
    let background = palette.background?.default
      ? convertColorToHex(palette.background.default)
      : null;
    background = background
      ? invert(background)
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

function customizeTheme(theme: AdaptiveTheme) {
  addMissingColorsToPalette(theme.palette, theme);
  if (theme.colorSchemes) {
    if (theme.colorSchemes.light) {
      addMissingColorsToPalette(theme.colorSchemes.light.palette, theme);
    }
    if (theme.colorSchemes.dark) {
      addMissingColorsToPalette(theme.colorSchemes.dark.palette, theme);
    }
  }
}

export function AdaptiveThemeProvider(props: AdaptiveThemeProps) {
  return (
    <AdaptiveThemeProviderMin customizeTheme={customizeTheme} {...props} />
  );
}
