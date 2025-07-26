/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  ComponentsOverrides,
  ComponentsProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import {
  AdaptiveSwitchKey,
  AdaptiveSwitchProps,
} from "./components/adaptiveSwitch";

type Theme = Omit<MuiTheme, "components">;

export interface AdaptiveComponents {
  AdaptiveSwitch?: {
    defaultProps?: ComponentsProps["AdaptiveSwitch"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSwitch"];
  };
}

export interface AdaptiveComponentsPropsList {
  AdaptiveSwitch: AdaptiveSwitchProps;
}

export interface AdaptiveComponentNameToClassKey {
  AdaptiveSwitch: AdaptiveSwitchKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends AdaptiveComponentNameToClassKey {}

  interface ComponentsPropsList extends AdaptiveComponentsPropsList {}

  interface Components extends AdaptiveComponents {}
}
