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
  AdaptiveCheckboxClasses,
  AdaptiveCheckboxProps,
} from "../components/checkbox/adaptiveCheckbox";
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
  AdaptiveRadioClasses,
  AdaptiveRadioProps,
} from "../components/radio/adaptiveRadio";
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
import {
  AdaptiveFilledInputClasses,
  AdaptiveFilledInputProps,
  AdaptiveInputClasses,
  AdaptiveInputProps,
  AdaptiveOutlinedInputClasses,
  AdaptiveOutlinedInputProps,
} from "../components/textField/adaptiveInput";
import {
  AdaptiveTextFieldClasses,
  AdaptiveTextFieldProps,
} from "../components/textField/adaptiveTextField";

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
  AdaptiveCheckbox?: {
    defaultProps?: ComponentsProps["AdaptiveCheckbox"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveCheckbox"];
  };
  AdaptiveDialog?: {
    defaultProps?: ComponentsProps["AdaptiveDialog"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveDialog"];
  };
  AdaptiveDialogActions?: {
    defaultProps?: ComponentsProps["AdaptiveDialogActions"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveDialogActions"];
  };
  AdaptiveFilledInput?: {
    defaultProps?: ComponentsProps["AdaptiveFilledInput"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveFilledInput"];
  };
  AdaptiveInput?: {
    defaultProps?: ComponentsProps["AdaptiveInput"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveInput"];
  };
  AdaptiveMenu?: {
    defaultProps?: ComponentsProps["AdaptiveMenu"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveMenu"];
  };
  AdaptiveOutlinedInput?: {
    defaultProps?: ComponentsProps["AdaptiveOutlinedInput"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveOutlinedInput"];
  };
  AdaptiveRadio?: {
    defaultProps?: ComponentsProps["AdaptiveRadio"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveRadio"];
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
  AdaptiveTextField?: {
    defaultProps?: ComponentsProps["AdaptiveTextField"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveTextField"];
  };
}

export interface AdaptiveComponentsPropsList {
  AdaptiveButton: AdaptiveButtonProps;
  AdaptiveButtonStack: AdaptiveButtonStackProps;
  AdaptiveCheckbox: AdaptiveCheckboxProps;
  AdaptiveDialog: AdaptiveDialogProps;
  AdaptiveDialogActions: AdaptiveDialogActionsProps;
  AdaptiveFilledInput: AdaptiveFilledInputProps;
  AdaptiveInput: AdaptiveInputProps;
  AdaptiveMenu: AdaptiveMenuProps;
  AdaptiveOutlinedInput: AdaptiveOutlinedInputProps;
  AdaptiveRadio: AdaptiveRadioProps;
  AdaptiveSelect: AdaptiveSelectProps;
  AdaptiveSelectItem: AdaptiveSelectItemProps;
  AdaptiveSlider: AdaptiveSliderProps;
  AdaptiveSwitch: AdaptiveSwitchProps;
  AdaptiveTextField: AdaptiveTextFieldProps;
}

export interface AdaptiveComponentNameToClassKey {
  AdaptiveButton: keyof AdaptiveButtonClasses;
  AdaptiveButtonStack: keyof AdaptiveButtonStackClasses;
  AdaptiveCheckbox: keyof AdaptiveCheckboxClasses;
  AdaptiveDialog: keyof AdaptiveDialogClasses;
  AdaptiveDialogActions: keyof AdaptiveDialogActionsClasses;
  AdaptiveFilledInput: keyof AdaptiveFilledInputClasses;
  AdaptiveInput: keyof AdaptiveInputClasses;
  AdaptiveMenu: keyof AdaptiveMenuClasses;
  AdaptiveOutlinedInput: keyof AdaptiveOutlinedInputClasses;
  AdaptiveRadio: keyof AdaptiveRadioClasses;
  AdaptiveSelect: keyof AdaptiveSelectClasses;
  AdaptiveSelectItem: keyof AdaptiveSelectItemClasses;
  AdaptiveSlider: keyof AdaptiveSliderClasses;
  AdaptiveSwitch: keyof AdaptiveSwitchClasses;
  AdaptiveTextField: keyof AdaptiveTextFieldClasses;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends AdaptiveComponentNameToClassKey {}

  interface ComponentsPropsList extends AdaptiveComponentsPropsList {}

  interface Components extends AdaptiveComponents {}
}
