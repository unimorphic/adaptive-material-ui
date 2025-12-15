import Dialog, { DialogProps } from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  inclusiveToExclusiveBreakpoint,
  ValidInclusiveBreakpoint,
} from "../../shared/inclusiveToExclusiveBreakpoint";

export interface DialogResponsiveProps extends DialogProps {
  /**
   * Breakpoint or screen width in px and below at which the dialog starts rendering full screen.
   * This behavior can be disabled by setting the fullScreen or variant property or setting it to false
   * @default xs
   */
  fullScreenBreakpoint?: ValidInclusiveBreakpoint | number | false;

  /**
   * Short dialogs ignore the fullScreenBreakpoint logic and may be styled differently depending on the device
   * @default tall
   */
  variant?: "short" | "tall";
}

export function DialogResponsive(props: DialogResponsiveProps) {
  const {
    fullScreenBreakpoint = "xs",
    variant = "tall",
    ...otherProps
  } = props;

  const isFullScreenBreakpoint = useMediaQuery((theme) => {
    let mediaQuery = theme.breakpoints.down(
      inclusiveToExclusiveBreakpoint(fullScreenBreakpoint),
    );

    // Tests
    if (typeof mediaQuery === "undefined") {
      console.warn("mediaQuery is undefined");
      mediaQuery = "@media (min-width:500px)";
    }

    return mediaQuery;
  });

  return (
    <Dialog
      fullScreen={variant === "tall" ? isFullScreenBreakpoint : undefined}
      {...otherProps}
    />
  );
}
