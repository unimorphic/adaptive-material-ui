import { menuClasses, MenuClasses, MenuProps } from "@mui/material/Menu";
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

export type AdaptiveMenuProps = MenuProps &
  StyledComponentProps<keyof AdaptiveMenuClasses>;

export interface AdaptiveMenuClasses
  extends MenuClasses,
    IosClasses,
    AndroidClasses {}

export const adaptiveMenuClasses = {
  ...menuClasses,
  ...generateUtilityClasses("AdaptiveMenu", ["android", "ios"]),
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
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <MenuAndroid {...props} />;
      break;
    case "ios":
      content = <MenuIOS {...props} />;
      break;
    default:
      content = <MenuDesktop {...props} />;
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
