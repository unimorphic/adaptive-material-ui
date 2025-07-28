import { Switch } from "@base-ui-components/react";
import { styled } from "@mui/material/styles";
import { SwitchProps } from "@mui/material/Switch";
import { ReactNode } from "react";

// https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Toggle

const SwitchIOS: (props: SwitchProps) => ReactNode | Promise<ReactNode> =
  styled(
    (props: SwitchProps) => {
      const { classes, type, value, ...otherProps } = props;
      
      // TODO handle slots

      return (
        <Switch.Root
          type={type as "button"}
          value={value as string}
          {...otherProps}
        >
          <Switch.Thumb />
        </Switch.Root>
      );
    },
    { name: "AdaptiveSwitch", slot: "ios" },
  )(({ theme }) => ({
    width: 64,
    height: 28,
    borderRadius: 15,
    backgroundColor: "rgba(120, 120, 120, 0.2)",

    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(120, 120, 128, 0.36)",
    }),

    "&[data-checked]": {
      backgroundColor: "rgba(52, 199, 89, 1)",

      ...theme.applyStyles("dark", {
        backgroundColor: "rgba(48, 209, 88, 1)",
      }),
    },

    "&[data-disabled]": {
      opacity: 0.4,
    },

    "& > span": {
      display: "block",
      width: 39,
      height: 24,
      borderRadius: 13,
      backgroundColor: "#FFFFFF",
      transition: theme.transitions.create(["translate"], {
        duration: 150,
      }),

      "&[data-checked]": {
        translate: "23px 0",
      },
    },
  }));

export default SwitchIOS;
