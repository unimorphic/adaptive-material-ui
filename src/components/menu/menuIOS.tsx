import { backdropClasses } from "@mui/material/Backdrop";
import { dividerClasses } from "@mui/material/Divider";
import { listClasses } from "@mui/material/List";
import Menu, { menuClasses, MenuProps } from "@mui/material/Menu";
import { menuItemClasses } from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { iosLiquidGlass } from "../shared/iosLiquidGlass";
import { RemoveComponentFromTheme } from "../shared/removeComponentFromTheme";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Menus
 */
const StyledMenu = styled(Menu, {
  name: "AdaptiveMenu",
  slot: "ios",
})<{
  ownerState: MenuProps;
}>(({ theme }) => ({
  [`& .${backdropClasses.root}`]: iosLiquidGlass.backdrop(theme),

  [`& .${menuClasses.paper}`]: {
    ...iosLiquidGlass.overlay(theme),
    borderRadius: 30,
  },

  [`& .${menuClasses.list}:not(.${listClasses.dense})`]: {
    padding: `${theme.spacing(1.25)} 0`,

    [`& .${menuItemClasses.root}`]: {
      minHeight: 0,
      padding: `${theme.spacing(1.125)} ${theme.spacing(3)}`,
    },

    [`& .${dividerClasses.root}`]: {
      margin: `${theme.spacing(1.25)} ${theme.spacing(3)}`,
    },
  },
}));

export function MenuIOS(props: MenuProps) {
  const { className, classes, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveMenu", s),
    classes,
  );

  return (
    // Only use AdaptiveMenu styles
    <RemoveComponentFromTheme componentName="MuiMenu">
      <StyledMenu
        className={clsx(composedClasses.ios, className)}
        ownerState={props}
        {...otherProps}
      />
    </RemoveComponentFromTheme>
  );
}
