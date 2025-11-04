import Dialog, { DialogProps } from "@mui/material/Dialog";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { Breakpoint, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { adaptiveButtonStackStyles } from "../buttonStack/adaptiveButtonStack";
import { AdaptiveButtonStackSpacerContext } from "../buttonStack/adaptiveButtonStackSpacer";
import {
  inclusiveToExclusiveBreakpoint,
  ValidInclusiveBreakpoint,
} from "../shared/inclusiveToExclusiveBreakpoint";

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

interface OwnerState
  extends Omit<DialogResponsiveProps, "stretchActionsBreakpoint"> {
  stretchActionsBreakpointExclusive: Breakpoint | number;
}

const StyledDialog = styled(Dialog)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  [theme.breakpoints.down(ownerState.stretchActionsBreakpointExclusive)]: {
    [`& .${dialogActionsClasses.root}`]: {
      ...adaptiveButtonStackStyles,

      [`&.${dialogActionsClasses.spacing}`]: {
        gap: theme.spacing(1),
      },
      "& > *": {
        margin: 0,
      },
    },
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

  const stretchBreakpointExclusive = inclusiveToExclusiveBreakpoint(
    stretchActionsBreakpoint,
  );

  return (
    <AdaptiveButtonStackSpacerContext.Provider
      value={stretchBreakpointExclusive}
    >
      <StyledDialog
        fullScreen={variant === "tall" ? isFullScreenBreakpoint : undefined}
        ownerState={{
          ...props,
          stretchActionsBreakpointExclusive: stretchBreakpointExclusive,
        }}
        {...otherProps}
      />
    </AdaptiveButtonStackSpacerContext.Provider>
  );
}
