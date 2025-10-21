import { styled } from "@mui/material/styles";
import Switch, { switchClasses, SwitchProps } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import RemoveComponentFromTheme from "../shared/removeComponentFromTheme";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Toggle
 */
const StyledSwitch = styled(Switch, { name: "AdaptiveSwitch", slot: "ios" })<{
  ownerState: SwitchProps;
}>(({ theme, ownerState }) => ({
  height: 32,
  padding: "2px 4px",
  width: 72,

  ...(ownerState.size === "small" && {
    height: 24,
    width: 56,
  }),

  "&:before": {
    backgroundColor: theme.palette.grey[700],
    borderRadius: 15,
    content: '""',
    display: "block",
    height: "calc(100% - 4px)",
    position: "absolute",
    right: 4,
    transition: theme.transitions.create(["background-color", "right"], {
      duration: 300,
    }),
    width: 28,
  },

  [`& .${switchClasses.switchBase}`]: {
    margin: "4px 6px",
    padding: 0,
    transition: theme.transitions.create(["transform"], {
      duration: 300,
    }),
  },

  [`& .${switchClasses.track}`]: {
    backgroundColor: theme.palette.grey[700],
    borderRadius: 15,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: 300,
    }),
  },

  [`& .${switchClasses.thumb}`]: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 13,
    boxShadow: "none",
    display: "block",
    height: 24,
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: 300,
    }),
    width: 39,

    ...(ownerState.size === "small" && {
      height: 20,
      width: 31,
    }),
  },

  [`&:has(.${switchClasses.checked})`]: {
    "&:before": {
      backgroundColor: theme.palette.primary.main,
      right: 39,
    },
    [`& .${switchClasses.switchBase}`]: {
      transform: "translateX(21px)",
    },
    [`& .${switchClasses.track}`]: {
      opacity: 1,
    },
  },

  [`&:has(:active)`]: {
    [`& .${switchClasses.thumb}`]: {
      backgroundColor: "transparent",
      boxShadow:
        "inset 3px 3px 0px -3.5px #fff, inset -3px -3px 0px -3.5px #fff, inset -.5px -.5px 0px #ffffff80, inset .5px .5px 0px #ffffff1a, inset -3px 3px 0px -3.5px #ffffff40, inset 0px -5px 0px -3.5px #ffffff40, inset 0px -5px 5px #ffffff40",
      transform: "scale(1.3)",
    },
    [`& .${switchClasses.track}`]: {
      transform: "scale(0.75)",
    },
  },

  [`&:has(.${switchClasses.disabled})`]: {
    [`& .${switchClasses.track}, & .${switchClasses.thumb}`]: {
      opacity: 0.4,
    },
    "&:before": {
      display: "none"
    },
  },
}));

export default function SwitchIOS(props: SwitchProps) {
  const { className, classes, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveSwitch", s),
    classes,
  );

  return (
    // Only use AdaptiveSwitch styles
    <RemoveComponentFromTheme componentName="MuiSwitch">
      <StyledSwitch
        className={clsx(composedClasses.ios, className)}
        disableRipple
        ownerState={props}
        {...otherProps}
      />
    </RemoveComponentFromTheme>
  );
}
