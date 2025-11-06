import {
  ComponentsOverrides,
  ComponentsProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import {
  AdaptiveButtonKey,
  AdaptiveButtonProps,
} from "../components/button/adaptiveButton";
import {
  AdaptiveButtonStackKey,
  AdaptiveButtonStackProps,
} from "../components/buttonStack/adaptiveButtonStack";
import {
  AdaptiveDialogKey,
  AdaptiveDialogProps,
} from "../components/dialog/adaptiveDialog";
import {
  AdaptiveMenuKey,
  AdaptiveMenuProps,
} from "../components/menu/adaptiveMenu";
import {
  AdaptiveSelectItemKey,
  AdaptiveSelectItemProps,
  AdaptiveSelectKey,
  AdaptiveSelectProps,
} from "../components/select/adaptiveSelect";
import {
  AdaptiveSliderKey,
  AdaptiveSliderProps,
} from "../components/slider/adaptiveSlider";
import {
  AdaptiveSwitchKey,
  AdaptiveSwitchProps,
} from "../components/switch/adaptiveSwitch";

type Theme = Omit<MuiTheme, "components">;

export interface AdaptiveComponents {
  AdaptiveButton?: {
    defaultProps?: ComponentsProps["AdaptiveButton"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveButton"];
  };
  AdaptiveButtonStack?: {
    defaultProps?: ComponentsProps["AdaptiveButtonStack"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveButtonStack"];
  };
  AdaptiveDialog?: {
    defaultProps?: ComponentsProps["AdaptiveDialog"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveDialog"];
  };
  AdaptiveMenu?: {
    defaultProps?: ComponentsProps["AdaptiveMenu"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveMenu"];
  };
  AdaptiveSelect?: {
    defaultProps?: ComponentsProps["AdaptiveSelect"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSelect"];
  };
  AdaptiveSelectItem?: {
    defaultProps?: ComponentsProps["AdaptiveSelectItem"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSelectItem"];
  };
  AdaptiveSlider?: {
    defaultProps?: ComponentsProps["AdaptiveSlider"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSlider"];
  };
  AdaptiveSwitch?: {
    defaultProps?: ComponentsProps["AdaptiveSwitch"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSwitch"];
  };
}

export interface AdaptiveComponentsPropsList {
  AdaptiveButton: AdaptiveButtonProps;
  AdaptiveButtonStack: AdaptiveButtonStackProps;
  AdaptiveDialog: AdaptiveDialogProps;
  AdaptiveMenu: AdaptiveMenuProps;
  AdaptiveSelect: AdaptiveSelectProps;
  AdaptiveSelectItem: AdaptiveSelectItemProps;
  AdaptiveSlider: AdaptiveSliderProps;
  AdaptiveSwitch: AdaptiveSwitchProps;
}

export interface AdaptiveComponentNameToClassKey {
  AdaptiveButton: AdaptiveButtonKey;
  AdaptiveButtonStack: AdaptiveButtonStackKey;
  AdaptiveDialog: AdaptiveDialogKey;
  AdaptiveMenu: AdaptiveMenuKey;
  AdaptiveSelect: AdaptiveSelectKey;
  AdaptiveSelectItem: AdaptiveSelectItemKey;
  AdaptiveSlider: AdaptiveSliderKey;
  AdaptiveSwitch: AdaptiveSwitchKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends AdaptiveComponentNameToClassKey {}

  interface ComponentsPropsList extends AdaptiveComponentsPropsList {}

  interface Components extends AdaptiveComponents {}
}
