/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  ComponentsOverrides,
  ComponentsProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import {
  AdaptiveSelectKey,
  AdaptiveSelectProps,
} from "./components/adaptiveSelect";
import {
  AdaptiveSwitchKey,
  AdaptiveSwitchProps,
} from "./components/adaptiveSwitch";

type Theme = Omit<MuiTheme, "components">;

export interface AdaptiveComponents {
  AdaptiveSelect?: {
    defaultProps?: ComponentsProps["AdaptiveSelect"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSelect"];
  };
  AdaptiveSwitch?: {
    defaultProps?: ComponentsProps["AdaptiveSwitch"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSwitch"];
  };
}

export interface AdaptiveComponentsPropsList {
  AdaptiveSelect: AdaptiveSelectProps;
  AdaptiveSwitch: AdaptiveSwitchProps;
}

export interface AdaptiveComponentNameToClassKey {
  AdaptiveSelect: AdaptiveSelectKey;
  AdaptiveSwitch: AdaptiveSwitchKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends AdaptiveComponentNameToClassKey {}

  interface ComponentsPropsList extends AdaptiveComponentsPropsList {}

  interface Components extends AdaptiveComponents {}
}
