"use client";

import { ThemeOptions } from "@mui/material/styles";
import { AdaptiveMode } from "adaptive-material-ui/adaptiveMode";
import { AdaptiveThemeProvider } from "adaptive-material-ui/theme/adaptiveThemeProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function createTheme(adaptiveMode: AdaptiveMode): ThemeOptions {
  const theme: ThemeOptions = {
    colorSchemes: { light: true, dark: true },
  };

  if (adaptiveMode !== "ios") {
    theme.typography = { fontFamily: roboto.style.fontFamily };
  }

  return theme;
}

export default function App({
  children,
  userAgent,
}: Readonly<{ children: React.ReactNode; userAgent: string }>) {
  return (
    <AdaptiveThemeProvider
      adaptiveModeInfo={{ userAgent: userAgent }}
      theme={createTheme}
    >
      {children}
    </AdaptiveThemeProvider>
  );
}
