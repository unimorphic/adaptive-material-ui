import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  createTheme,
  ThemeProvider,
  useColorScheme,
} from "@mui/material/styles";
import { useEffect } from "react";
import { useDark } from "rspress/runtime";
import Theme from "rspress/theme";

function DarkModeMonitor() {
  const dark = useDark();
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(dark ? "dark" : "light");
  }, [dark, setMode]);

  return null;
}

const docsTheme = createTheme({ colorSchemes: { dark: true } });

function Layout() {
  return (
    <ThemeProvider theme={docsTheme}>
      <DarkModeMonitor />
      <Theme.Layout />
    </ThemeProvider>
  );
}

export default {
  ...Theme,
  Layout,
};

export * from "rspress/theme";
