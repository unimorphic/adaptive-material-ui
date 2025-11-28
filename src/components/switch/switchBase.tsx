import { styled, Theme } from "@mui/material/styles";
import Switch, { switchClasses, SwitchProps } from "@mui/material/Switch";
import { mergeSlotProps } from "@mui/material/utils";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { ReactNode } from "react";
import { slotShouldForwardProp } from "../../shared/slotShouldForwardProp";
import { adaptiveSwitchClasses } from "./adaptiveSwitch";

export interface SwitchBaseProps extends SwitchProps {
  /**
   * Icon displayed inside the thumb when not checked
   */
  thumbIcon?: ReactNode;
  /**
   * Icon displayed inside the thumb when checked
   */
  thumbIconChecked?: ReactNode;
}

export function getSwitchColor(theme: Theme, color: SwitchProps["color"]) {
  return color === "default"
    ? getSwitchDefaultColor(theme)
    : (theme.vars ?? theme).palette[color ?? "primary"].main;
}

function getSwitchDefaultColor(theme: Theme) {
  return theme.vars
    ? theme.vars.palette.Switch.defaultColor
    : theme.palette.mode === "light"
      ? theme.palette.common.white
      : theme.palette.grey[300];
}

const StyledSwitch = styled(Switch, {
  name: "AdaptiveSwitch",
  slot: "root",
  shouldForwardProp: slotShouldForwardProp,
})<{ ownerState: SwitchBaseProps }>(({ ownerState, theme }) => ({
  [`& .${switchClasses.thumb}`]: {
    alignItems: "center",
    display: "flex",
    padding: 1,
    justifyContent: "center",
  },

  [`& .${adaptiveSwitchClasses.thumbIcon}, & .${adaptiveSwitchClasses.thumbIconChecked}`]:
    {
      color: theme.palette.getContrastText(getSwitchDefaultColor(theme)),
      display: "flex",
      minWidth: 0,
      transition: theme.transitions.create(["opacity"], {
        duration: theme.transitions.duration.shortest,
      }),

      "& svg": {
        maxHeight: "100%",
        maxWidth: "100%",
      },
    },
  [`& .${adaptiveSwitchClasses.thumbIcon}`]: {
    opacity: 1,
  },
  [`& .${adaptiveSwitchClasses.thumbIconChecked}`]: {
    color: theme.palette.getContrastText(
      getSwitchColor(theme, ownerState.color),
    ),
    opacity: 0,
    visibility: "hidden",
    width: 0,
  },

  [`& .${switchClasses.checked}`]: {
    [`& .${adaptiveSwitchClasses.thumbIcon}`]: {
      opacity: 0,
      visibility: "hidden",
      width: 0,
    },
    [`& .${adaptiveSwitchClasses.thumbIconChecked}`]: {
      opacity: 1,
      visibility: "visible",
      width: "auto",
    },
  },
}));

export function SwitchBase(props: SwitchBaseProps) {
  const { className, slotProps, thumbIcon, thumbIconChecked, ...otherProps } =
    props;

  const composedClasses = composeClasses(
    { root: ["root"] },
    (s) => generateUtilityClass("AdaptiveSwitch", s),
    props.classes,
  );

  return (
    <StyledSwitch
      className={clsx(composedClasses.root, className)}
      ownerState={props}
      slotProps={{
        ...slotProps,
        thumb: mergeSlotProps(slotProps?.thumb, {
          children:
            thumbIcon || thumbIconChecked ? (
              <>
                <div className={adaptiveSwitchClasses.thumbIcon}>
                  {thumbIcon}
                </div>
                <div className={adaptiveSwitchClasses.thumbIconChecked}>
                  {thumbIconChecked}
                </div>
              </>
            ) : undefined,
        }),
      }}
      {...otherProps}
    />
  );
}
