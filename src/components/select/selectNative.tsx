import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import SelectItemProps from "./selectItemProps";

const StyledOption = styled("option", {
  name: "AdaptiveSelectItem",
  slot: "root",
})();

export function SelectItemNative(props: SelectItemProps<"option">) {
  const {
    action,
    classes,
    centerRipple,
    className,
    component,
    dense,
    disableGutters,
    disableRipple,
    disableTouchRipple,
    divider,
    focusRipple,
    focusVisibleClassName,
    LinkComponent,
    onFocusVisible,
    TouchRippleProps,
    touchRippleRef,
    ...otherProps
  } = props;

  const composedClasses = composeClasses(
    { root: ["root"] },
    (s) => generateUtilityClass("MuiMenuItem", s),
    classes,
  );

  return (
    <StyledOption
      className={clsx(composedClasses.root, className)}
      {...otherProps}
    />
  );
}

export default function SelectNative<Value = unknown>(
  props: SelectProps<Value>,
) {
  return <Select native {...props} />;
}
