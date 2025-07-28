import {
  createTheme,
  ThemeProvider,
  useColorScheme,
} from "@mui/material/styles";
import { useEffect } from "react";
import { useDark } from "rspress/runtime";

interface Props {
  children?: React.ReactNode;
}

const theme = createTheme({ colorSchemes: { dark: true } });

function DarkModeMonitor() {
  const dark = useDark();
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(dark ? "dark" : "light");
  }, [dark, setMode]);

  return null;
}

export default function BasicTheme(props: Props) {
  return (
    <ThemeProvider theme={theme}>
      <DarkModeMonitor />
      {props.children}
    </ThemeProvider>
  );
}
