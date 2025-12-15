import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { snackbarContentClasses } from "@mui/material/SnackbarContent";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

const StyledSnackbar = styled(Snackbar, {
  name: "AdaptiveSnackbar",
  slot: "android",
})<{ ownerState: SnackbarProps }>(({ theme }) => ({
  [`& .${snackbarContentClasses.root}`]: {
    backgroundColor: theme.palette.inverse.background,
    color: theme.palette.inverse.contrastText,
  },
}));

export function SnackbarAndroid(props: SnackbarProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveSnackbar", s),
    props.classes,
  );

  return (
    <StyledSnackbar
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
