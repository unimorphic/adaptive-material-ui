import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { AdaptiveSwitch } from "adaptive-material-ui/components/switch";
import { AdaptiveThemeProvider } from "adaptive-material-ui/theme/adaptiveThemeProvider";

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
});

export default function App() {
  return (
    <AdaptiveThemeProvider theme={theme}>
      <CssBaseline />
      <AdaptiveSwitch defaultChecked />
    </AdaptiveThemeProvider>
  );
}
