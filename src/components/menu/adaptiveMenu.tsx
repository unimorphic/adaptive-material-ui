import { MenuClassKey, MenuProps } from "@mui/material/Menu";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeContext,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";

export type AdaptiveMenuProps = MenuProps &
  StyledComponentProps<MenuClassKey | AdaptiveMenuKey> &
  AdaptiveModeProp;

export interface AdaptiveMenuClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}
export type AdaptiveMenuKey = keyof AdaptiveMenuClasses;

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

export default function AdaptiveMenu(inProps: AdaptiveMenuProps) {
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
      {content}
    </AdaptiveModeContext.Provider>
  );
}
