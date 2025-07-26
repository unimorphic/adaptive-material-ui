import { styled, useThemeProps } from "@mui/material/styles";
import Switch, { SwitchClasses, SwitchProps } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { forwardRef, ReactNode } from "react";

export interface AdaptiveSwitchProps extends SwitchProps {
  adaptiveMode?: "android" | "desktop" | "ios";
  classes?: Partial<SwitchClasses> & Partial<AdaptiveSwitchClasses>;
}

export interface AdaptiveSwitchClasses {
  /** Styles applied to the IOS adaptive mode */
  ios: string;
}

export type AdaptiveSwitchKey = keyof AdaptiveSwitchClasses;

const IOSSwitch = styled(
  (props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ),
  { name: "AdaptiveSwitch", slot: "ios" },
)<{ ownerState: AdaptiveSwitchProps }>(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const AdaptiveSwitch = forwardRef<HTMLButtonElement, AdaptiveSwitchProps>(
  function (inProps, ref): ReactNode {
    const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
    const { adaptiveMode, classes, ...otherProps } = props;

    const composedClasses = composeClasses(
      { ios: ["ios"] },
      (s) => generateUtilityClass("AdaptiveSwitch", s),
      classes,
    );

    if (adaptiveMode === "ios") {
      return (
        <IOSSwitch
          classes={{
            root: clsx(composedClasses.ios, classes?.root),
            ...classes,
          }}
          ownerState={props}
          ref={ref}
          {...otherProps}
        />
      );
    }

    return <Switch classes={classes} ref={ref} {...otherProps} />;
  },
);

export default AdaptiveSwitch;
