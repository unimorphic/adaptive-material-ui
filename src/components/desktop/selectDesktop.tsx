import Select, { SelectProps } from "@mui/material/Select";
import ModalNonBlocking from "../shared/modalNonBlocking";

/**
 * Select that doesn't block interaction with other page elements when open
 * https://github.com/mui/material-ui/issues/17353
 */
export default function SelectDesktop(props: SelectProps) {
  const { MenuProps, ...otherProps } = props;

  return (
    <Select
      MenuProps={{
        ...MenuProps,
        disableScrollLock: true,
        marginThreshold: null,
        slots: { ...MenuProps?.slots, root: ModalNonBlocking },
      }}
      {...otherProps}
    />
  );
}
