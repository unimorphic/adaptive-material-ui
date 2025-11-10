import { menuClasses, MenuClasses, MenuProps } from "@mui/material/Menu";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeContext,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveMenuProps = MenuProps &
  StyledComponentProps<keyof AdaptiveMenuClasses> &
  AdaptiveModeProp;

export interface AdaptiveMenuClasses extends MenuClasses, IosClasses {}

export const adaptiveMenuClasses = {
  ...menuClasses,
  ...generateUtilityClasses("AdaptiveMenu", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const MenuAndroid = lazy(async () => {
  const { MenuAndroid } = await import("../android");
  return { default: MenuAndroid };
});
const MenuDesktop = lazy(async () => {
  const { MenuDesktop } = await import("../desktop");
  return { default: MenuDesktop };
});
const MenuIOS = lazy(async () => {
  const { MenuIOS } = await import("../ios");
  return { default: MenuIOS };
});

export function AdaptiveMenu(inProps: AdaptiveMenuProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveMenu" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <MenuAndroid {...otherProps} />;
      break;
    case "ios":
      content = <MenuIOS {...otherProps} />;
      break;
    default:
      content = <MenuDesktop {...otherProps} />;
      break;
  }

  return (
    <AdaptiveModeContext.Provider value={{ mode: adaptiveMode }}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveMenu"
        targetComponentName="MuiMenu"
      >
        {content}
      </ReplaceComponentInTheme>
    </AdaptiveModeContext.Provider>
  );
}
