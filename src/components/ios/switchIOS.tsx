import { styled } from "@mui/material/styles";
import Switch, { switchClasses, SwitchProps } from "@mui/material/Switch";
import { ReactNode } from "react";

// https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Toggle

const SwitchIOS: (props: SwitchProps) => ReactNode | Promise<ReactNode> =
  styled((props: SwitchProps) => <Switch disableRipple {...props} />, {
    name: "AdaptiveSwitch",
    slot: "ios",
  })(({ theme }) => ({
    height: 28,
    padding: 0,
    width: 64,

    [`& .${switchClasses.switchBase}`]: {
      margin: 2,
      padding: 0,
    },

    [`& .${switchClasses.track}`]: {
      backgroundColor: "rgba(120, 120, 120, 0.2)",
      borderRadius: 15,
      opacity: 1,

      transition: theme.transitions.create(["background-color"], {
        duration: 200,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "rgba(120, 120, 128, 0.36)",
      }),
    },

    [`& .${switchClasses.thumb}`]: {
      backgroundColor: "#FFFFFF",
      borderRadius: 13,
      boxShadow: "none",
      display: "block",
      height: 24,
      width: 39,
    },

    [`& .${switchClasses.checked}`]: {
      [`& .${switchClasses.switchBase}`]: {
        transform: "translateX(21px)",
      },

      [`& + .${switchClasses.track}`]: {
        backgroundColor: "rgba(52, 199, 89, 1)",
        opacity: 1,

        ...theme.applyStyles("dark", {
          backgroundColor: "rgba(48, 209, 88, 1)",
        }),
      },
    },

    [`& .${switchClasses.disabled}`]: {
      [`& + .${switchClasses.track}, & .${switchClasses.thumb}`]: {
        opacity: 0.4,
      },
    },
  }));

export default SwitchIOS;
