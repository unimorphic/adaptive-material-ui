import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import {
  ModalNonBlocking,
  ModalNonBlockingProps,
} from "../../shared/modalNonBlocking";
import { AdaptiveSelectItemGroup } from "./adaptiveSelectItemGroup";
import {
  SelectItemGroupProps,
  SelectItemProps,
  SelectNativeProps,
} from "./selectProps";

export function SelectItemDesktop<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
>(props: SelectItemProps<RootComponent, AdditionalProps>) {
  return <MenuItem {...props} />;
}

export function SelectItemGroupDesktop<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
>(props: SelectItemGroupProps<RootComponent, AdditionalProps>) {
  const { children, label, ...otherProps } = props;

  // Children are rendered in the parent SelectDesktop

  return <ListSubheader {...otherProps}>{label}</ListSubheader>;
}

/**
 * Suspense added for when AdaptiveSelectItem is bundled separately
 */
function ModalNonBlockingWithSuspense(props: ModalNonBlockingProps) {
  return (
    <React.Suspense>
      <ModalNonBlocking {...props} />
    </React.Suspense>
  );
}

/**
 * Select that doesn't block interaction with other page elements when open
 * https://github.com/mui/material-ui/issues/17353
 */
export function SelectDesktop<Value = unknown>(
  props: SelectNativeProps<Value>,
) {
  const { children, disableNativeEmptyValue, MenuProps, ...otherProps } = props;

  const expandedChildren = React.Children.map(children, (child) => {
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

  return (
    <Select
      MenuProps={{
        disableScrollLock: true,
        ...MenuProps,
        slots: { root: ModalNonBlockingWithSuspense, ...MenuProps?.slots },
      }}
      {...otherProps}
    >
      {expandedChildren}
    </Select>
  );
}
