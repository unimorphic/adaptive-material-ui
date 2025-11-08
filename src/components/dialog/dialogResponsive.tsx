import Dialog, { dialogClasses, DialogProps } from "@mui/material/Dialog";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { Breakpoint, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import {
  inclusiveToExclusiveBreakpoint,
  ValidInclusiveBreakpoint,
} from "../../shared/inclusiveToExclusiveBreakpoint";
import { createAdaptiveButtonStackStyles } from "../buttonStack/adaptiveButtonStack";

export interface DialogResponsiveProps extends DialogProps {
  /**
   * Breakpoint or screen width in px and below at which the dialog starts rendering full screen.
   * This behavior can be disabled by setting the fullScreen or variant property or setting it to false
   * @default xs
   */
  fullScreenBreakpoint?: ValidInclusiveBreakpoint | number | false;

  /**
   * Breakpoint or screen width in px and below at which the actions will be stretched.
   * This behavior can be disabled by setting it to false
   * @default xs
   */
  stretchActionsBreakpoint?: ValidInclusiveBreakpoint | number | false;

  /**
   * Short dialogs ignore the fullScreenBreakpoint logic and may be styled differently depending on the device
   * @default tall
   */
  variant?: "short" | "tall";
}

export const dialogResponsiveClasses = {
  ...dialogClasses,
  ...generateUtilityClasses("DialogResponsive", ["alignActionLeft"]),
};

interface OwnerState
  extends Omit<DialogResponsiveProps, "stretchActionsBreakpoint"> {
  stretchActionsBreakpointExclusive: Breakpoint | number;
}

const StyledDialog = styled(Dialog)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  [`& .${dialogActionsClasses.root}`]: {
    ...createAdaptiveButtonStackStyles(
      theme,
      ownerState.stretchActionsBreakpointExclusive,
      dialogResponsiveClasses.alignActionLeft,
      {
        [`&.${dialogActionsClasses.spacing}`]: {
          gap: theme.spacing(1),
        },
        "& > *": {
          margin: 0,
        },
      },
    ),
  },
}));

export function DialogResponsive(props: DialogResponsiveProps) {
  const {
    stretchActionsBreakpoint = "xs",
    fullScreenBreakpoint = "xs",
    variant = "tall",
    ...otherProps
  } = props;

  const isFullScreenBreakpoint = useMediaQuery((theme) =>
    theme.breakpoints.down(
      inclusiveToExclusiveBreakpoint(fullScreenBreakpoint),
    ),
  );

  return (
    <StyledDialog
      fullScreen={variant === "tall" ? isFullScreenBreakpoint : undefined}
      ownerState={{
        ...props,
        stretchActionsBreakpointExclusive: inclusiveToExclusiveBreakpoint(
          stretchActionsBreakpoint,
        ),
      }}
      {...otherProps}
    />
  );
}
