import { ModalNonBlocking } from "../../shared/modalNonBlocking";
import { SelectBase } from "./selectBase";
import { SelectBaseProps } from "./selectProps";

/**
 * Select that doesn't block interaction with other page elements when open
 * https://github.com/mui/material-ui/issues/17353
 */
export function SelectDesktop<Value = unknown>(props: SelectBaseProps<Value>) {
  const { MenuProps, ...otherProps } = props;

  return (
    <SelectBase
      MenuProps={{
        disableScrollLock: true,
        ...MenuProps,
        slots: { root: ModalNonBlocking, ...MenuProps?.slots },
      }}
      {...otherProps}
    />
  );
}
