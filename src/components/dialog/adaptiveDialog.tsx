import { DialogClassKey } from "@mui/material/Dialog";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { createContext, lazy } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { AdaptiveButtonProps } from "../button/adaptiveButton";
import { DialogResponsiveProps } from "./dialogResponsive";

export interface AdaptiveDialogProps
  extends Omit<DialogResponsiveProps, "classes">,
    StyledComponentProps<DialogClassKey | AdaptiveDialogKey>,
    AdaptiveModeProp {}

export interface AdaptiveDialogActionsProps extends DialogActionsProps {
  /** Props passed to child AdaptiveButton components */
  buttonDefaultProps?: AdaptiveButtonProps;
}

export interface AdaptiveDialogClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export type AdaptiveDialogKey = keyof AdaptiveDialogClasses;

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
      <DialogActions {...otherProps} />
    </AdaptiveDialogActionsContext>
  );
}

export function AdaptiveDialog(inProps: AdaptiveDialogProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveDialog" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  switch (adaptiveMode) {
    case "android":
      return <DialogAndroid {...otherProps} />;
    case "ios":
      return <DialogIOS {...otherProps} />;
    default:
      return <DialogDesktop {...otherProps} />;
  }
}
