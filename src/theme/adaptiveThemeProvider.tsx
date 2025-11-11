import {
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
  ThemeProviderProps,
} from "@mui/material/styles";
import deepmerge from "@mui/utils/deepmerge";
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

  theme?: ThemeOptions | ((adaptiveMode: AdaptiveMode) => ThemeOptions);
}

const iosFontFamily =
  '-apple-system, "SF Pro Text", "SF UI Text", system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

function createAdaptiveTheme(
  adaptiveMode: AdaptiveMode,
  options?: ThemeOptions,
) {
  const defaultOptions: ThemeOptions = {
    typography: {
      fontFamily: adaptiveMode === "ios" ? iosFontFamily : undefined,
    },
  };

  const mergedOptions = deepmerge(defaultOptions, options ?? {});

  return createTheme(mergedOptions);
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
