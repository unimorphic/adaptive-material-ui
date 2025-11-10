import {
  fabClasses,
  FabClasses,
  FabProps,
  FabTypeMap,
} from "@mui/material/Fab";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveFabProps<
  RootComponent extends React.ElementType = FabTypeMap["defaultComponent"],
  AdditionalProps = {},
> = Omit<FabProps<RootComponent, AdditionalProps>, "classes"> &
  StyledComponentProps<keyof AdaptiveFabClasses> &
  AdaptiveModeProp;

export interface AdaptiveFabClasses extends FabClasses, IosClasses {}

export const adaptiveFabClasses = {
  ...fabClasses,
  ...generateUtilityClasses("AdaptiveFab", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const FabAndroid = lazy(async () => {
  const { FabAndroid } = await import("../android");
  return { default: FabAndroid };
});
const FabDesktop = lazy(async () => {
  const { FabDesktop } = await import("../desktop");
  return { default: FabDesktop };
});
const FabIOS = lazy(async () => {
  const { FabIOS } = await import("../ios");
  return { default: FabIOS };
});

export function AdaptiveFab<
  RootComponent extends React.ElementType = FabTypeMap["defaultComponent"],
  AdditionalProps = {},
>(inProps: AdaptiveFabProps<RootComponent, AdditionalProps>) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveFab" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <FabAndroid {...(otherProps as AdaptiveFabProps)} />;
      break;
    case "ios":
      content = <FabIOS {...(otherProps as AdaptiveFabProps)} />;
      break;
    default:
      content = <FabDesktop {...(otherProps as AdaptiveFabProps)} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveFab"
      targetComponentName="MuiFab"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
