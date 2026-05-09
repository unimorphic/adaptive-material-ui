import {
  ColorSystemOptions,
  createTheme,
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

export interface AdaptiveTheme extends Theme {
  colorSchemes?: Partial<Record<"light" | "dark", ColorSystemOptions>>;
}

export interface AdaptiveThemeProps extends Omit<
  ThemeProviderProps<Theme>,
  "theme"
> {
  adaptiveModeInfo?: {
    mode?: AdaptiveMode;
    userAgent?: string;
  };
  customizeTheme?: (theme: AdaptiveTheme) => void;
  theme?: Partial<Theme> | ((adaptiveMode: AdaptiveMode) => Partial<Theme>);
}

const iosFontFamily =
  '-apple-system, "SF Pro Text", "SF UI Text", system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

function createAdaptiveTheme(
  adaptiveMode: AdaptiveMode,
  themePartial?: Partial<Theme>,
  customizeTheme?: (theme: AdaptiveTheme) => void,
): Partial<Theme> {
  const theme = !themePartial?.typography
    ? (createTheme(themePartial ?? {}) as AdaptiveTheme)
    : (themePartial as AdaptiveTheme);

  customizeTheme?.(theme);

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

export function AdaptiveThemeProviderMin(props: AdaptiveThemeProps) {
  const { adaptiveModeInfo, customizeTheme, theme, ...otherProps } = props;
  const resolvedAdaptiveMode = useAdaptiveMode(
    adaptiveModeInfo?.mode,
    adaptiveModeInfo?.userAgent,
  );

  const mergedTheme = useMemo(() => {
    const resolvedTheme =
      typeof theme === "function" ? theme(resolvedAdaptiveMode) : theme;

    return createAdaptiveTheme(
      resolvedAdaptiveMode,
      resolvedTheme,
      customizeTheme,
    );
  }, [customizeTheme, resolvedAdaptiveMode, theme]);

  return (
    <AdaptiveModeContext.Provider value={{ mode: resolvedAdaptiveMode }}>
      <ThemeProvider {...otherProps} theme={mergedTheme}></ThemeProvider>
    </AdaptiveModeContext.Provider>
  );
}
