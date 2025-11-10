import { DialogClasses } from "@mui/material/Dialog";
import DialogActions, {
  dialogActionsClasses,
  DialogActionsClasses,
  DialogActionsProps,
} from "@mui/material/DialogActions";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { createContext, lazy, ReactNode } from "react";
import {
  AdaptiveModeContext,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { AdaptiveButtonProps } from "../button/adaptiveButton";
import {
  dialogResponsiveClasses,
  DialogResponsiveProps,
} from "./dialogResponsive";

export interface AdaptiveDialogProps
  extends Omit<DialogResponsiveProps, "classes">,
    StyledComponentProps<keyof AdaptiveDialogClasses>,
    AdaptiveModeProp {}

export interface AdaptiveDialogClasses extends DialogClasses, IosClasses {}

export const adaptiveDialogClasses = {
  ...dialogResponsiveClasses,
  ...generateUtilityClasses("AdaptiveDialog", ["ios"]),
};

export interface AdaptiveDialogActionsProps
  extends Omit<DialogActionsProps, "classes">,
    StyledComponentProps<keyof AdaptiveDialogActionsClasses> {
  /** Props passed to child AdaptiveButton components */
  buttonDefaultProps?: AdaptiveButtonProps;
}

export interface AdaptiveDialogActionsClasses extends DialogActionsClasses {}

export const adaptiveDialogActionsClasses = dialogActionsClasses;

/** Context used to pass buttonDefaultProps */
export const AdaptiveDialogActionsContext = createContext<
  AdaptiveButtonProps | undefined
>(undefined);

// See docs\pages\docs\codeSplitting.md
const DialogAndroid = lazy(async () => {
  const { DialogAndroid } = await import("../android");
  return { default: DialogAndroid };
});
const DialogDesktop = lazy(async () => {
  const { DialogDesktop } = await import("../desktop");
  return { default: DialogDesktop };
});
const DialogIOS = lazy(async () => {
  const { DialogIOS } = await import("../ios");
  return { default: DialogIOS };
});

export function AdaptiveDialogActions(inProps: AdaptiveDialogActionsProps) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveDialogActions",
  });
  const { buttonDefaultProps, ...otherProps } = props;

  return (
    <AdaptiveDialogActionsContext value={buttonDefaultProps}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveDialogActions"
        targetComponentName="MuiDialogActions"
      >
        <DialogActions {...otherProps} />
      </ReplaceComponentInTheme>
    </AdaptiveDialogActionsContext>
  );
}

export function AdaptiveDialog(inProps: AdaptiveDialogProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveDialog" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <DialogAndroid {...otherProps} />;
      break;
    case "ios":
      content = <DialogIOS {...otherProps} />;
      break;
    default:
      content = <DialogDesktop {...otherProps} />;
      break;
  }

  return (
    <AdaptiveModeContext.Provider value={{ mode: adaptiveMode }}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveDialog"
        targetComponentName="MuiDialog"
      >
        {content}
      </ReplaceComponentInTheme>
    </AdaptiveModeContext.Provider>
  );
}
