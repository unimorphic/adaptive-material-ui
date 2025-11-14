import Menu, { MenuProps } from "@mui/material/Menu";
import { mergeSlotProps } from "@mui/material/utils";
import { ModalNonBlocking } from "../../shared/modalNonBlocking";

/**
 * Menu that doesn't block interaction with other page elements when open
 * https://github.com/mui/material-ui/issues/17353
 */
export function MenuDesktop(props: MenuProps) {
  const { slotProps, slots, ...otherProps } = props;

  return (
    <Menu
      disableScrollLock
      slotProps={{
        ...slotProps,
        root: mergeSlotProps(slotProps?.root, {
          ignoreAnchorClicks: otherProps.anchorEl,
        }),
      }}
      slots={{ root: ModalNonBlocking, ...slots }}
      {...otherProps}
    />
  );
}
