import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import capitalize from "@mui/utils/capitalize";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import * as React from "react";
import { AdaptiveSelectItemGroup } from "./adaptiveSelectItemGroup";
import {
  SelectItemGroupProps,
  SelectItemProps,
  SelectBaseProps,
} from "./selectProps";

export const SelectContext = React.createContext<{ native: boolean }>({
  native: false,
});

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

export function SelectBase<Value = unknown>(props: SelectBaseProps<Value>) {
  const {
    children,
    classes,
    disableNativeEmptyValue,
    variant = "outlined",
    ...otherProps
  } = props;
  const native = props.native ?? false;

  const expandedChildren = native
    ? children
    : React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          child.type === AdaptiveSelectItemGroup &&
          child.props &&
          typeof child.props === "object" &&
          "children" in child.props &&
          Array.isArray(child.props.children)
        ) {
          return [child, ...(child.props.children as React.ReactNode[])];
        }

        return child;
      });

  // Apply standard classes to the native select
  // https://github.com/mui/material-ui/blob/92c82252c77237100aebbea0446848a70d0ba2a7/packages/mui-material/src/NativeSelect/NativeSelectInput.js#L15
  const composedClasses = native
    ? composeClasses(
        {
          select: [
            "select",
            variant,
            props.disabled && "disabled",
            props.multiple && "multiple",
            props.error && "error",
          ],
          icon: [
            "icon",
            `icon${capitalize(variant)}`,
            props.open && "iconOpen",
            props.disabled && "disabled",
          ],
        },
        (s) => generateUtilityClass("MuiSelect", s),
        props.classes,
      )
    : classes;

  return (
    <SelectContext.Provider value={{ native: native }}>
      <Select classes={composedClasses} variant={variant} {...otherProps}>
        {native && !disableNativeEmptyValue ? (
          <SelectItemNative sx={{ display: "none" }} value="" />
        ) : null}
        {expandedChildren}
      </Select>
    </SelectContext.Provider>
  );
}
