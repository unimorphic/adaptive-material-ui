import { backdropClasses } from "@mui/material/Backdrop";
import { dialogClasses } from "@mui/material/Dialog";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { dialogContentClasses } from "@mui/material/DialogContent";
import { dialogTitleClasses } from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { iosLiquidGlass } from "../shared/iosLiquidGlass";
import { DialogResponsive, DialogResponsiveProps } from "./dialogResponsive";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Alerts
 */
const StyledDialogResponsive = styled(DialogResponsive, {
  name: "AdaptiveDialog",
  slot: "ios",
})<{
  ownerState: DialogResponsiveProps;
}>(({ theme }) => {
  const bottomPadding = theme.spacing(1.75);
  const topPadding = theme.spacing(3);

  return {
    variants: [
      {
        props: (props) => props.variant === "short",
        style: {
          [`& .${backdropClasses.root}`]: iosLiquidGlass.backdrop(theme),

          [`& .${dialogClasses.paper}`]: {
            ...iosLiquidGlass.overlay(theme),
            borderRadius: 34,
          },

          [`& .${dialogTitleClasses.root}`]: {
            padding: `${topPadding} ${topPadding} ${theme.spacing(1.25)} ${topPadding}`,

            [`& + .${dialogContentClasses.root}`]: {
              paddingTop: 0,
            },
          },

          [`& .${dialogContentClasses.root}`]: {
            padding: topPadding,
          },

          [`& .${dialogActionsClasses.root}`]: {
            padding: `0 ${bottomPadding} ${bottomPadding} ${bottomPadding}`,
          },
        },
      },
    ],
  };
});

export function DialogIOS(props: DialogResponsiveProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveDialog", s),
    props.classes,
  );

  return (
    <StyledDialogResponsive
      className={clsx(composedClasses.ios, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
