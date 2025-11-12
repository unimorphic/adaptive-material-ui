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
  AdaptiveCircularProgressClasses,
  AdaptiveCircularProgressProps,
} from "../components/circularProgress/adaptiveCircularProgress";
import {
  AdaptiveDialogActionsClasses,
  AdaptiveDialogActionsProps,
  AdaptiveDialogClasses,
  AdaptiveDialogProps,
} from "../components/dialog/adaptiveDialog";
import {
  AdaptiveFabClasses,
  AdaptiveFabProps,
} from "../components/fab/adaptiveFab";
import {
  AdaptiveIconButtonClasses,
  AdaptiveIconButtonProps,
} from "../components/iconButton/adaptiveIconButton";
import {
  AdaptiveLinearProgressClasses,
  AdaptiveLinearProgressProps,
} from "../components/linearProgress/adaptiveLinearProgress";
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
  AdaptiveSnackbarClasses,
  AdaptiveSnackbarProps,
} from "../components/snackbar/adaptiveSnackbar";
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
  AdaptiveCircularProgress?: {
    defaultProps?: ComponentsProps["AdaptiveCircularProgress"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveCircularProgress"];
  };
  AdaptiveDialog?: {
    defaultProps?: ComponentsProps["AdaptiveDialog"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveDialog"];
  };
  AdaptiveDialogActions?: {
    defaultProps?: ComponentsProps["AdaptiveDialogActions"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveDialogActions"];
  };
  AdaptiveFab?: {
    defaultProps?: ComponentsProps["AdaptiveFab"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveFab"];
  };
  AdaptiveFilledInput?: {
    defaultProps?: ComponentsProps["AdaptiveFilledInput"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveFilledInput"];
  };
  AdaptiveIconButton?: {
    defaultProps?: ComponentsProps["AdaptiveIconButton"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveIconButton"];
  };
  AdaptiveInput?: {
    defaultProps?: ComponentsProps["AdaptiveInput"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveInput"];
  };
  AdaptiveLinearProgress?: {
    defaultProps?: ComponentsProps["AdaptiveLinearProgress"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveLinearProgress"];
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
  AdaptiveSnackbar?: {
    defaultProps?: ComponentsProps["AdaptiveSnackbar"];
    styleOverrides?: ComponentsOverrides<Theme>["AdaptiveSnackbar"];
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
  AdaptiveCircularProgress: AdaptiveCircularProgressProps;
  AdaptiveDialog: AdaptiveDialogProps;
  AdaptiveDialogActions: AdaptiveDialogActionsProps;
  AdaptiveFab: AdaptiveFabProps;
  AdaptiveFilledInput: AdaptiveFilledInputProps;
  AdaptiveIconButton: AdaptiveIconButtonProps;
  AdaptiveInput: AdaptiveInputProps;
  AdaptiveLinearProgress: AdaptiveLinearProgressProps;
  AdaptiveMenu: AdaptiveMenuProps;
  AdaptiveOutlinedInput: AdaptiveOutlinedInputProps;
  AdaptiveRadio: AdaptiveRadioProps;
  AdaptiveSelect: AdaptiveSelectProps;
  AdaptiveSelectItem: AdaptiveSelectItemProps;
  AdaptiveSlider: AdaptiveSliderProps;
  AdaptiveSnackbar: AdaptiveSnackbarProps;
  AdaptiveSwitch: AdaptiveSwitchProps;
  AdaptiveTextField: AdaptiveTextFieldProps;
}

export interface AdaptiveComponentNameToClassKey {
  AdaptiveButton: keyof AdaptiveButtonClasses;
  AdaptiveButtonStack: keyof AdaptiveButtonStackClasses;
  AdaptiveCheckbox: keyof AdaptiveCheckboxClasses;
  AdaptiveCircularProgress: keyof AdaptiveCircularProgressClasses;
  AdaptiveDialog: keyof AdaptiveDialogClasses;
  AdaptiveDialogActions: keyof AdaptiveDialogActionsClasses;
  AdaptiveFab: keyof AdaptiveFabClasses;
  AdaptiveFilledInput: keyof AdaptiveFilledInputClasses;
  AdaptiveIconButton: keyof AdaptiveIconButtonClasses;
  AdaptiveInput: keyof AdaptiveInputClasses;
  AdaptiveLinearProgress: keyof AdaptiveLinearProgressClasses;
  AdaptiveMenu: keyof AdaptiveMenuClasses;
  AdaptiveOutlinedInput: keyof AdaptiveOutlinedInputClasses;
  AdaptiveRadio: keyof AdaptiveRadioClasses;
  AdaptiveSelect: keyof AdaptiveSelectClasses;
  AdaptiveSelectItem: keyof AdaptiveSelectItemClasses;
  AdaptiveSlider: keyof AdaptiveSliderClasses;
  AdaptiveSnackbar: keyof AdaptiveSnackbarClasses;
  AdaptiveSwitch: keyof AdaptiveSwitchClasses;
  AdaptiveTextField: keyof AdaptiveTextFieldClasses;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends AdaptiveComponentNameToClassKey {}

  interface ComponentsPropsList extends AdaptiveComponentsPropsList {}

  interface Components extends AdaptiveComponents {}
}
