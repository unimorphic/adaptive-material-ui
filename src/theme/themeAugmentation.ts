import {
  ComponentsOverrides,
  ComponentsProps,
  Theme as MuiTheme,
} from "@mui/material/styles";
import {
  AdaptiveButtonClasses,
  AdaptiveButtonProps,
} from "../components/button/adaptiveButton";
import {
  AdaptiveButtonStackClasses,
  AdaptiveButtonStackProps,
} from "../components/buttonStack/adaptiveButtonStack";
import {
  AdaptiveDialogActionsClasses,
  AdaptiveDialogActionsProps,
  AdaptiveDialogClasses,
  AdaptiveDialogProps,
} from "../components/dialog/adaptiveDialog";
import {
  AdaptiveMenuClasses,
  AdaptiveMenuProps,
} from "../components/menu/adaptiveMenu";
import {
  AdaptiveSelectItemClasses,
  AdaptiveSelectItemProps,
  AdaptiveSelectClasses,
  AdaptiveSelectProps,
} from "../components/select/adaptiveSelect";
import {
  AdaptiveSliderClasses,
  AdaptiveSliderProps,
} from "../components/slider/adaptiveSlider";
import {
  AdaptiveSwitchClasses,
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
  AdaptiveDialogActions?: {
    defaultProps?: ComponentsProps["AdaptiveDialogActions"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveDialogActions"];
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
  AdaptiveDialogActions: AdaptiveDialogActionsProps;
  AdaptiveMenu: AdaptiveMenuProps;
  AdaptiveSelect: AdaptiveSelectProps;
  AdaptiveSelectItem: AdaptiveSelectItemProps;
  AdaptiveSlider: AdaptiveSliderProps;
  AdaptiveSwitch: AdaptiveSwitchProps;
}

export interface AdaptiveComponentNameToClassKey {
  AdaptiveButton: keyof AdaptiveButtonClasses;
  AdaptiveButtonStack: keyof AdaptiveButtonStackClasses;
  AdaptiveDialog: keyof AdaptiveDialogClasses;
  AdaptiveDialogActions: keyof AdaptiveDialogActionsClasses;
  AdaptiveMenu: keyof AdaptiveMenuClasses;
  AdaptiveSelect: keyof AdaptiveSelectClasses;
  AdaptiveSelectItem: keyof AdaptiveSelectItemClasses;
  AdaptiveSlider: keyof AdaptiveSliderClasses;
  AdaptiveSwitch: keyof AdaptiveSwitchClasses;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends AdaptiveComponentNameToClassKey {}

  interface ComponentsPropsList extends AdaptiveComponentsPropsList {}

  interface Components extends AdaptiveComponents {}
}
