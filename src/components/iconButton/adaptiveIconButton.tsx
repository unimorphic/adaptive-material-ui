import {
  iconButtonClasses,
  IconButtonClasses,
  IconButtonTypeMap,
} from "@mui/material/IconButton";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { IconButtonContainedProps } from "./iconButtonContained";

export type AdaptiveIconButtonProps<
  RootComponent extends
    React.ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = Omit<IconButtonContainedProps<RootComponent, AdditionalProps>, "classes"> &
  StyledComponentProps<keyof AdaptiveIconButtonClasses> &
  AdaptiveModeProp;

export interface AdaptiveIconButtonClasses
  extends IconButtonClasses,
    IosClasses {}

export const adaptiveIconButtonClasses = {
  ...iconButtonClasses,
  ...generateUtilityClasses("AdaptiveIconButton", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const IconButtonAndroid = lazy(async () => {
  const { IconButtonAndroid } = await import("../android");
  return { default: IconButtonAndroid };
});
const IconButtonDesktop = lazy(async () => {
  const { IconButtonDesktop } = await import("../desktop");
  return { default: IconButtonDesktop };
});
const IconButtonIOS = lazy(async () => {
  const { IconButtonIOS } = await import("../ios");
  return { default: IconButtonIOS };
});

export function AdaptiveIconButton<
  RootComponent extends
    React.ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
>(inProps: AdaptiveIconButtonProps<RootComponent, AdditionalProps>) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveIconButton" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = (
        <IconButtonAndroid {...(otherProps as AdaptiveIconButtonProps)} />
      );
      break;
    case "ios":
      content = <IconButtonIOS {...(otherProps as AdaptiveIconButtonProps)} />;
      break;
    default:
      content = (
        <IconButtonDesktop {...(otherProps as AdaptiveIconButtonProps)} />
      );
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveIconButton"
      targetComponentName="MuiIconButton"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
