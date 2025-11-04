import Menu, { MenuProps } from "@mui/material/Menu";
import resolveComponentProps from "@mui/utils/resolveComponentProps";
import {
  ModalNonBlocking,
  ModalNonBlockingProps,
} from "../shared/modalNonBlocking";

/**
 * Menu that doesn't block interaction with other page elements when open
 * https://github.com/mui/material-ui/issues/17353
 */
export function MenuDesktop(props: MenuProps) {
  const { slotProps, slots, ...otherProps } = props;

  const rootProps = resolveComponentProps(slotProps?.root, props);

  return (
    <Menu
      disableScrollLock
      slotProps={{
        ...slotProps,
        root: {
          ...rootProps,
          ignoreAnchorClicks: otherProps.anchorEl,
        } as ModalNonBlockingProps,
      }}
      slots={{ ...slots, root: ModalNonBlocking }}
      {...otherProps}
    />
  );
}
