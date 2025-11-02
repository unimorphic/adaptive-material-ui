import {
  ComponentsProps,
  createTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import { ReactNode } from "react";

export interface RemoveComponentFromThemeProps {
  children: ReactNode;
  componentName: keyof ComponentsProps;
}

export default function RemoveComponentFromTheme(
  props: RemoveComponentFromThemeProps,
) {
  const outerTheme = useTheme();

  if (Object.keys(outerTheme).length === 0) {
    return props.children;
  }

  return (
    <ThemeProvider<Theme>
      theme={(theme) =>
        createTheme({
          ...theme,
          components: { ...theme.components, [props.componentName]: {} },
        })
      }
    >
      {props.children}
    </ThemeProvider>
  );
}
