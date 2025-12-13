import { ComponentsProps, Theme, ThemeProvider } from "@mui/material/styles";
import useThemeWithoutDefault from "@mui/system/useThemeWithoutDefault";
import { ReactNode } from "react";

export interface ReplaceComponentInThemeProps {
  children: ReactNode;
  sourceComponentName: keyof ComponentsProps;
  targetComponentName: keyof ComponentsProps;
}

/**
 * Copies a component's styles in the current theme to another component.
 * Used to ignore MUI styles of the `targetComponentName` and only use Adaptive styles of the `sourceComponentName`
 */
export function ReplaceComponentInTheme(props: ReplaceComponentInThemeProps) {
  const outerTheme = useThemeWithoutDefault<Theme | null>();

  if (!outerTheme) {
    return props.children;
  }

  return (
    <ThemeProvider
      theme={() => ({
        ...outerTheme,
        components: {
          ...outerTheme.components,
          [props.targetComponentName]: {
            ...outerTheme.components?.[props.sourceComponentName],
            defaultProps: {},
          },
        },
      })}
    >
      {props.children}
    </ThemeProvider>
  );
}
