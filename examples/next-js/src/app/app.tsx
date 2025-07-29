"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdaptiveModeContext } from "adaptive-material-ui/adaptiveMode";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default function App({
  children,
  userAgent,
}: Readonly<{ children: React.ReactNode; userAgent: string }>) {
  return (
    <AdaptiveModeContext value={{ userAgent: userAgent }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AdaptiveModeContext>
  );
}
