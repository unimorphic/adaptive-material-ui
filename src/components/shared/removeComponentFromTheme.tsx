import {
  ComponentsProps,
  createTheme,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import { useThemeWithoutDefault } from "@mui/system";
import { ReactNode } from "react";

export interface RemoveComponentFromThemeProps {
  children: ReactNode;
  componentName: keyof ComponentsProps;
}

export function RemoveComponentFromTheme(props: RemoveComponentFromThemeProps) {
  const outerTheme = useThemeWithoutDefault<Theme | null>();

  if (!outerTheme) {
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
