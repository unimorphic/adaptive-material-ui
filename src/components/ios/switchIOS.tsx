import {
  createTheme,
  styled,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import Switch, { switchClasses, SwitchProps } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Toggle
 */
const StyledSwitch = styled(Switch, { name: "AdaptiveSwitch", slot: "ios" })<{
  ownerState: SwitchProps;
}>(({ theme, ownerState }) => ({
  height: 28,
  padding: 0,
  width: 64,

  ...(ownerState.size === "small" && {
    height: 24,
    width: 56,
  }),

  [`& .${switchClasses.switchBase}`]: {
    margin: 2,
    padding: 0,

    [`&.${switchClasses.checked}`]: {
      [`&.${switchClasses.switchBase}`]: {
        transform: "translateX(21px)",
      },

      [`& + .${switchClasses.track}`]: {
        opacity: 1,
      },
    },

    [`&.${switchClasses.disabled}`]: {
      [`& + .${switchClasses.track}, & .${switchClasses.thumb}`]: {
        opacity: 0.4,
      },
    },
  },

  [`& .${switchClasses.track}`]: {
    borderRadius: 15,
    transition: theme.transitions.create(["background-color"], {
      duration: 200,
    }),
  },

  [`& .${switchClasses.thumb}`]: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 13,
    boxShadow: "none",
    display: "block",
    height: 24,
    width: 39,

    ...(ownerState.size === "small" && {
      height: 20,
      width: 31,
    }),
  },
}));

export default function SwitchIOS(props: SwitchProps) {
  const { className, classes, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveSwitch", s),
    classes,
  );

  return (
    <ThemeProvider
      theme={(theme: Theme) =>
        createTheme({
          ...theme,
          components: {
            ...theme.components,
            MuiSwitch: {}, // Only use AdaptiveSwitch styles
          },
        })
      }
    >
      <StyledSwitch
        className={clsx(composedClasses.ios, className)}
        disableRipple
        ownerState={props}
        {...otherProps}
      />
    </ThemeProvider>
  );
}
