import {
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
} from "../adaptiveMode";

export interface AdaptiveThemeProps
  extends Omit<ThemeProviderProps<Theme>, "theme"> {
  adaptiveModeInfo?: {
    mode?: AdaptiveMode;
    userAgent?: string;
  };

  theme?: Partial<Theme> | ((adaptiveMode: AdaptiveMode) => Partial<Theme>);
}

const iosFontFamily =
  '-apple-system, "SF Pro Text", "SF UI Text", system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

function createAdaptiveTheme(
  adaptiveMode: AdaptiveMode,
  themePartial?: Partial<Theme>,
): Partial<Theme> {
  const theme = !themePartial?.typography
    ? createTheme(themePartial ?? {})
    : (themePartial as Theme);

  if (adaptiveMode !== "ios") {
    return theme;
  }

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
