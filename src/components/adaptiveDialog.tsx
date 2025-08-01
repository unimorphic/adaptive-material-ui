import { DialogClasses } from "@mui/material/Dialog";
import { useThemeProps } from "@mui/material/styles";
import { lazy } from "react";
import {
  AdaptiveMode,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../adaptiveMode/adaptiveMode";
import { DialogResponsiveProps } from "./shared/dialogResponsive";

export interface AdaptiveDialogProps
  extends DialogResponsiveProps,
    AdaptiveModeProp {
  classes?: Partial<DialogClasses> & Partial<AdaptiveDialogClasses>;
}

export interface AdaptiveDialogClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export type AdaptiveDialogKey = keyof AdaptiveDialogClasses;

// See docs\pages\docs\theCodes\codeSplitting.md
const DialogAndroid = lazy(async () => {
  const { DialogAndroid } = await import("./android");
  return { default: DialogAndroid };
});
const DialogDesktop = lazy(async () => {
  const { DialogDesktop } = await import("./desktop");
  return { default: DialogDesktop };
});
const DialogIOS = lazy(async () => {
  const { DialogIOS } = await import("./ios");
  return { default: DialogIOS };
});

export default function AdaptiveDialog(inProps: AdaptiveDialogProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveDialog" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  switch (adaptiveMode) {
    case AdaptiveMode.android:
      return <DialogAndroid {...otherProps} />;
    case AdaptiveMode.ios:
      return <DialogIOS {...otherProps} />;
    default:
      return <DialogDesktop {...otherProps} />;
  }
}
