import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { snackbarContentClasses } from "@mui/material/SnackbarContent";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { iosLiquidGlass } from "../../shared/ios/iosLiquidGlass";

const StyledSnackbar = styled(Snackbar, {
  name: "AdaptiveSnackbar",
  slot: "ios",
})<{ ownerState: SnackbarProps }>(({ theme }) => ({
  [`& .${snackbarContentClasses.root}`]: {
    ...iosLiquidGlass.overlay(theme),

    borderRadius: 16,
    color: theme.palette.text.primary,

    ...theme.applyStyles("dark", {
      color: theme.palette.common.white,
    }),
  },
}));

export function SnackbarIOS(props: SnackbarProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveSnackbar", s),
    props.classes,
  );

  return (
    <StyledSnackbar
      className={clsx(composedClasses.ios, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
