"use client";

import { createTheme } from "@mui/material/styles";
import { AdaptiveThemeProvider } from "adaptive-material-ui/theme/adaptiveThemeProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  typography: { fontFamily: roboto.style.fontFamily },
});

export default function App({
  children,
  userAgent,
}: Readonly<{ children: React.ReactNode; userAgent: string }>) {
  return (
    <AdaptiveThemeProvider
      adaptiveModeInfo={{ userAgent: userAgent }}
      theme={theme}
    >
      {children}
    </AdaptiveThemeProvider>
  );
}
