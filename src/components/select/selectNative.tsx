import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import {
  SelectItemGroupProps,
  SelectItemProps,
  SelectNativeProps,
} from "./selectProps";

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
    (s) => generateUtilityClass("AdaptiveSelectItem", s),
    classes,
  );

  return (
    <StyledOption
      className={clsx(composedClasses.root, className)}
      {...otherProps}
    />
  );
}

const StyledOptGroup = styled("optgroup", {
  name: "AdaptiveSelectItemGroup",
  slot: "root",
})();

export function SelectItemGroupNative(props: SelectItemGroupProps<"optgroup">) {
  const {
    classes,
    className,
    color,
    component,
    disableGutters,
    disableSticky,
    inset,
    ...otherProps
  } = props;

  const composedClasses = composeClasses(
    { root: ["root"] },
    (s) => generateUtilityClass("AdaptiveSelectItemGroup", s),
    classes,
  );

  return (
    <StyledOptGroup
      className={clsx(composedClasses.root, className)}
      {...otherProps}
    />
  );
}

export function SelectNative<Value = unknown>(props: SelectNativeProps<Value>) {
  const { children, disableNativeEmptyValue, ...otherProps } = props;

  return (
    <Select native {...otherProps}>
      {!disableNativeEmptyValue ? (
        <SelectItemNative sx={{ display: "none" }} value="" />
      ) : null}
      {children}
    </Select>
  );
}
