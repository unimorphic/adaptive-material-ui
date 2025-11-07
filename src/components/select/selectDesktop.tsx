import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { ModalNonBlocking } from "../shared/modalNonBlocking";
import { SelectItemProps } from "./selectItemProps";

export function SelectItemDesktop<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
>(props: SelectItemProps<RootComponent, AdditionalProps>) {
  return <MenuItem {...props} />;
}

/**
 * Select that doesn't block interaction with other page elements when open
 * https://github.com/mui/material-ui/issues/17353
 */
export function SelectDesktop<Value = unknown>(props: SelectProps<Value>) {
  const { MenuProps, ...otherProps } = props;

  return (
    <Select
      MenuProps={{
        disableScrollLock: true,
        ...MenuProps,
        slots: { ...MenuProps?.slots, root: ModalNonBlocking },
      }}
      {...otherProps}
    />
  );
}
