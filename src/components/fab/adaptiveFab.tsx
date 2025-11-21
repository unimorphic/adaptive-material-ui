import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import {
  fabClasses,
  FabClasses,
  FabOwnProps,
  FabProps,
} from "@mui/material/Fab";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveFabOwnProps = StyledComponentProps<
  keyof AdaptiveFabClasses
>;

export type AdaptiveFabTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & FabOwnProps & AdaptiveFabOwnProps;
  defaultComponent: RootComponent;
}>;

export type AdaptiveFabProps<
  RootComponent extends
    React.ElementType = AdaptiveFabTypeMap["defaultComponent"],
  AdditionalProps = {},
> = FabProps<RootComponent, AdditionalProps> & AdaptiveFabOwnProps;

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

export const AdaptiveFab: ExtendButtonBase<AdaptiveFabTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(inProps: AdaptiveFabProps<RootComponent, AdditionalProps>) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveFab" });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <FabAndroid {...props} />;
      break;
    case "ios":
      content = <FabIOS {...props} />;
      break;
    default:
      content = <FabDesktop {...props} />;
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
};
