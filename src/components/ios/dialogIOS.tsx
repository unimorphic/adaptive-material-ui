import { dialogClasses } from "@mui/material/Dialog";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { dialogContentClasses } from "@mui/material/DialogContent";
import { dialogTitleClasses } from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import DialogResponsive, {
  DialogResponsiveProps,
} from "../shared/dialogResponsive";
import RemoveComponentFromTheme from "../shared/removeComponentFromTheme";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Alerts
 */
const StyledDialogResponsive = styled(DialogResponsive, {
  name: "AdaptiveDialog",
  slot: "ios",
})<{
  ownerState: DialogResponsiveProps;
}>(() => ({
  variants: [
    {
      props: (props) => props.variant === "short",
      style: {
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 34,
        },

        [`& .${dialogTitleClasses.root}`]: {
          padding: 14,

          [`& + .${dialogContentClasses.root}`]: {
            paddingTop: 0,
          },
        },

        [`& .${dialogContentClasses.root}`]: {
          padding: 14,
        },

        [`& .${dialogActionsClasses.root}`]: {
          padding: 14,
        },
      },
    },
  ],
}));

export default function DialogIOS(props: DialogResponsiveProps) {
  const { className, classes, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveDialog", s),
    classes,
  );

  return (
    // Only use AdaptiveDialog styles
    <RemoveComponentFromTheme componentName="MuiDialog">
      <StyledDialogResponsive
        className={clsx(composedClasses.ios, className)}
        ownerState={props}
        {...otherProps}
      />
    </RemoveComponentFromTheme>
  );
}
