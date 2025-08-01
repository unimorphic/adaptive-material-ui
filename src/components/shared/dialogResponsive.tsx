import Dialog, { DialogProps } from "@mui/material/Dialog";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { Breakpoint, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type ValidBreakpoints = Exclude<Breakpoint, "xl">;

export interface DialogResponsiveProps extends DialogProps {
  /**
   * Breakpoint or screen width in px and below at which the dialog starts rendering full screen
   * This behaviour can be disabled by setting the fullScreen or variant properties or setting it to false
   * @default xs
   */
  fullScreenBreakpoint?: ValidBreakpoints | number | false;

  /**
   * Breakpoint or screen width in px and below at which the actions will be streched
   * This behaviour can be disabled by setting it to false
   * @default xs
   */
  strechActionsBreakpoint?: ValidBreakpoints | number | false;

  /**
   * Short dialogs ignore the fullScreenBreakpoint logic and may be styled differently depending on the device
   * @default tall
   */
  variant?: "short" | "tall";
}

interface OwnerState
  extends Omit<DialogResponsiveProps, "strechActionsBreakpoint"> {
  strechActionsBreakpointExclusive: Breakpoint | number;
}

/**
 * Used to transform breakpoints since the down method is exclusive
 */
function inclusiveToExclusiveBreakpoint(
  breakpoint: ValidBreakpoints | number | false,
) {
  const breakpointMap: Record<ValidBreakpoints, Breakpoint> = {
    lg: "xl",
    md: "lg",
    sm: "md",
    xs: "sm",
  };

  return breakpoint === false
    ? 0
    : typeof breakpoint === "string"
      ? breakpointMap[breakpoint]
      : breakpoint + 1;
}

const StyledDialog = styled(Dialog)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  [theme.breakpoints.down(ownerState.strechActionsBreakpointExclusive)]: {
    [`& .${dialogActionsClasses.root}`]: {
      alignItems: "stretch",
      flexDirection: "column",
      gap: 5,

      "& > *": {
        margin: 0,
      },
      // Emotion has issues with nth-child in SSR https://github.com/emotion-js/emotion/issues/1105
      "&:has(> :last-child:nth-child(1 of :not(style))) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
        {
          alignItems: "center",
          flexDirection: "row",

          "& > *": {
            flex: 0.5,
            flexBasis: "content",
          },
        },
      "&:has(> :last-child:nth-child(2 of :not(style))) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
        {
          alignItems: "center",
          flexDirection: "row",

          "& > *": {
            flex: 1,
          },
        },
    },
  },
}));

export default function DialogResponsive(props: DialogResponsiveProps) {
  const {
    strechActionsBreakpoint = "xs",
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
        strechActionsBreakpointExclusive: inclusiveToExclusiveBreakpoint(
          strechActionsBreakpoint,
        ),
      }}
      {...otherProps}
    />
  );
}
