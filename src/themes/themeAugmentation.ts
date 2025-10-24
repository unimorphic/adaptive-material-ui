/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  ComponentsOverrides,
  ComponentsProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import {
  AdaptiveButtonStackKey,
  AdaptiveButtonStackProps,
} from "../components/buttonStack/adaptiveButtonStack";
import {
  AdaptiveDialogKey,
  AdaptiveDialogProps,
} from "../components/dialog/adaptiveDialog";
import {
  AdaptiveSelectItemKey,
  AdaptiveSelectItemProps,
  AdaptiveSelectKey,
  AdaptiveSelectProps,
} from "../components/select/adaptiveSelect";
import {
  AdaptiveSwitchKey,
  AdaptiveSwitchProps,
} from "../components/switch/adaptiveSwitch";

type Theme = Omit<MuiTheme, "components">;

export interface AdaptiveComponents {
  AdaptiveButtonStack?: {
    defaultProps?: ComponentsProps["AdaptiveButtonStack"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveButtonStack"];
  };
  AdaptiveDialog?: {
    defaultProps?: ComponentsProps["AdaptiveDialog"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveDialog"];
  };
  AdaptiveSelect?: {
    defaultProps?: ComponentsProps["AdaptiveSelect"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSelect"];
  };
  AdaptiveSelectItem?: {
    defaultProps?: ComponentsProps["AdaptiveSelectItem"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSelectItem"];
  };
  AdaptiveSwitch?: {
    defaultProps?: ComponentsProps["AdaptiveSwitch"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSwitch"];
  };
}

export interface AdaptiveComponentsPropsList {
  AdaptiveButtonStack: AdaptiveButtonStackProps;
  AdaptiveDialog: AdaptiveDialogProps;
  AdaptiveSelect: AdaptiveSelectProps;
  AdaptiveSelectItem: AdaptiveSelectItemProps;
  AdaptiveSwitch: AdaptiveSwitchProps;
}

export interface AdaptiveComponentNameToClassKey {
  AdaptiveButtonStack: AdaptiveButtonStackKey;
  AdaptiveDialog: AdaptiveDialogKey;
  AdaptiveSelect: AdaptiveSelectKey;
  AdaptiveSelectItem: AdaptiveSelectItemKey;
  AdaptiveSwitch: AdaptiveSwitchKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends AdaptiveComponentNameToClassKey {}

  interface ComponentsPropsList extends AdaptiveComponentsPropsList {}

  interface Components extends AdaptiveComponents {}
}
