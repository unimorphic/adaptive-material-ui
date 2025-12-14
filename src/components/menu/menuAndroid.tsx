import { dividerClasses } from "@mui/material/Divider";
import { listClasses } from "@mui/material/List";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import Menu, { menuClasses, MenuProps } from "@mui/material/Menu";
import { menuItemClasses } from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

/**
 * MD3 https://m3.material.io/components/menus
 */
const StyledMenu = styled(Menu, {
  name: "AdaptiveMenu",
  slot: "android",
})<{ ownerState: MenuProps }>(({ theme }) => ({
  [`& .${menuClasses.paper}`]: {
    backgroundColor: theme.palette.background.container.low,
    borderRadius: 16,
  },
  [`& .${menuClasses.list}`]: {
    padding: theme.spacing(0.5),

    [`&:not(.${listClasses.dense}) .${menuItemClasses.root}`]: {
      padding: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
    },
  },
  [`& .${dividerClasses.root}`]: {
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
  },
  [`& .${menuItemClasses.root}`]: {
    marginBottom: theme.spacing(0.25),
    marginTop: theme.spacing(0.25),
    transition: theme.transitions.create(["border-radius"], {
      duration: theme.transitions.duration.shortest,
    }),

    "&:first-of-type": {
      marginTop: 0,
    },
    "&:last-of-type": {
      marginBottom: 0,
    },
    [`&.${menuItemClasses.selected}`]: {
      borderRadius: 12,
    },
    [`&:hover, &.${menuItemClasses.focusVisible}`]: {
      borderRadius: 4,

      "&:first-of-type": {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      },
      "&:last-of-type": {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      },
    },
    [`& .${listItemIconClasses.root}`]: {
      minWidth: 28,
    },
  },
}));

export function MenuAndroid(props: MenuProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveMenu", s),
    props.classes,
  );

  return (
    <StyledMenu
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
