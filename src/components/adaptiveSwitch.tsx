import { useThemeProps } from "@mui/material/styles";
import { SwitchClasses, SwitchProps } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { lazy } from "react";

export interface AdaptiveSwitchProps extends SwitchProps {
  adaptiveMode?: "android" | "desktop" | "ios";
  classes?: Partial<SwitchClasses> & Partial<AdaptiveSwitchClasses>;
}

export interface AdaptiveSwitchClasses {
  /** Styles applied to the IOS adaptive mode */
  ios: string;
}

export type AdaptiveSwitchKey = keyof AdaptiveSwitchClasses;

// The below import statements have to be destructured for proper tree shaking
const SwitchDesktop = lazy(async () => {
  const { SwitchDesktop } = await import("./desktop");
  return { default: SwitchDesktop };
});
const SwitchIOS = lazy(async () => {
  const { SwitchIOS } = await import("./ios");
  return { default: SwitchIOS };
});

export default function AdaptiveSwitch(inProps: AdaptiveSwitchProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
  const { adaptiveMode, className, classes, ...otherProps } = props;

  if (adaptiveMode === "ios") {
    const composedClasses = composeClasses(
      { ios: ["ios"] },
      (s) => generateUtilityClass("AdaptiveSwitch", s),
      classes,
    );

    return (
      <SwitchIOS
        className={clsx(composedClasses.ios, className)}
        {...otherProps}
      />
    );
  }

  return (
    <SwitchDesktop className={className} classes={classes} {...otherProps} />
  );
}
