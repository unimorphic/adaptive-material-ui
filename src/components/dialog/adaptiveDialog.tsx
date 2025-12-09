import { dialogClasses, DialogClasses } from "@mui/material/Dialog";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeContext,
  useAdaptiveMode,
} from "../../adaptiveMode/adaptiveMode";
import { AndroidClasses } from "../../shared/android/androidClasses";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { DialogResponsiveProps } from "./dialogResponsive";

export type AdaptiveDialogProps = DialogResponsiveProps &
  StyledComponentProps<keyof AdaptiveDialogClasses>;

export interface AdaptiveDialogClasses
  extends DialogClasses,
    IosClasses,
    AndroidClasses {}

export const adaptiveDialogClasses = {
  ...dialogClasses,
  ...generateUtilityClasses("AdaptiveDialog", ["android", "ios"]),
};

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

export function AdaptiveDialog(inProps: AdaptiveDialogProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveDialog" });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <DialogAndroid {...props} />;
      break;
    case "ios":
      content = <DialogIOS {...props} />;
      break;
    default:
      content = <DialogDesktop {...props} />;
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
