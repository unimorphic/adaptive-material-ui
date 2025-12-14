import { dialogClasses } from "@mui/material/Dialog";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { dialogContentClasses } from "@mui/material/DialogContent";
import { dialogTitleClasses } from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { DialogResponsive, DialogResponsiveProps } from "./dialogResponsive";

/**
 * MD3 https://m3.material.io/components/dialogs
 */
const StyledDialogResponsive = styled(DialogResponsive, {
  name: "AdaptiveDialog",
  slot: "android",
})<{ ownerState: DialogResponsiveProps }>(({ theme }) => {
  const edgePadding = theme.spacing(3);

  return {
    [`& .${dialogClasses.paperFullScreen}`]: {
      backgroundColor: theme.palette.background.container.main,

      [`.${dialogTitleClasses.root}`]: {
        fontSize: theme.typography.pxToRem(22),
        fontWeight: 400,
        lineHeight: theme.typography.pxToRem(28),
      },
    },
    [`& .${dialogClasses.paper}:not(.${dialogClasses.paperFullScreen})`]: {
      backgroundColor: theme.palette.background.container.high,
      borderRadius: 28,
      maxWidth: 560,
      minWidth: 280,

      [`& .${dialogTitleClasses.root}`]: {
        fontSize: theme.typography.pxToRem(24),
        fontWeight: 400,
        lineHeight: theme.typography.pxToRem(32),
        paddingTop: edgePadding,
      },
      [`& .${dialogContentClasses.root}`]: {
        paddingBottom: edgePadding,
      },
      [`& .${dialogActionsClasses.root}`]: {
        padding: `0 ${edgePadding} ${edgePadding} ${edgePadding}`,
      },
    },
  };
});

export function DialogAndroid(props: DialogResponsiveProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveDialog", s),
    props.classes,
  );

  return (
    <StyledDialogResponsive
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
