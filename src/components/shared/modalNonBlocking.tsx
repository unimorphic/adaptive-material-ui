/* eslint-disable @typescript-eslint/no-deprecated */
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useDefaultProps } from "@mui/material/DefaultPropsProvider";
import { ModalProps } from "@mui/material/Modal";
import { PopoverVirtualElement } from "@mui/material/Popover";
import Portal from "@mui/material/Portal";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import FocusTrap from "@mui/material/Unstable_TrapFocus";
import { cloneElement, useState } from "react";

type AnchorElType =
  | null
  | Element
  | PopoverVirtualElement
  | (() => Element | PopoverVirtualElement | null);

export interface MenuPopperRootProps extends ModalProps {
  ownerState?: { anchorEl?: AnchorElType };
}

function resolveAnchorEl(anchorEl?: AnchorElType) {
  let element: Element | PopoverVirtualElement | null | undefined;
  if (typeof anchorEl === "function") {
    element = anchorEl();
  } else {
    element = anchorEl;
  }

  if (element && !("contains" in element)) {
    return undefined;
  }

  return element;
}

const RootContainer = styled("div")(() => ({
  bottom: 0,
  left: 0,
  pointerEvents: "none",
  position: "fixed",
  right: 0,
  top: 0,

  "& > *": {
    pointerEvents: "auto",
  },
}));

/**
 * Modal that doesn't block interaction with other page elements
 * https://github.com/mui/material-ui/blob/v7.2.0/packages/mui-material/src/Modal/Modal.js
 */
export default function ModalNonBlocking(inProps: MenuPopperRootProps) {
  const props = useDefaultProps({ name: "MuiModal", props: inProps });
  const {
    BackdropComponent,
    BackdropProps,
    classes: classesProp,
    className,
    closeAfterTransition,
    children,
    container,
    component,
    components,
    componentsProps,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted = false,
    onClose,
    onKeyDown,
    onTransitionEnter,
    onTransitionExited,
    open,
    slotProps,
    slots,
    ...otherProps
  } = props;

  const [exited, setExited] = useState(!open);
  const oldChildProps = children.props as TransitionProps;

  function onClickAway(event: MouseEvent | TouchEvent): void {
    if (
      resolveAnchorEl(props.ownerState?.anchorEl)?.contains(
        event.target as HTMLElement,
      )
    ) {
      return;
    }

    props.onClose?.(event, "backdropClick");
  }

  function onEnter(node: HTMLElement, isAppearing: boolean) {
    setExited(false);
    onTransitionEnter?.();
    oldChildProps.onEnter?.(node, isAppearing);
  }

  function onExited(node: HTMLElement) {
    setExited(true);
    onTransitionExited?.();
    oldChildProps.onExit?.(node);
  }

  function onKeyDownRoot(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      event.key === "Escape" &&
      event.which !== 229 &&
      !disableEscapeKeyDown
    ) {
      event.stopPropagation();
      props.onClose?.(event, "escapeKeyDown");
    }

    onKeyDown?.(event);
  }

  const newChildProps: TransitionProps = {};
  if (oldChildProps.tabIndex === undefined) {
    newChildProps.tabIndex = -1;
  }

  const hasTransition = Object.prototype.hasOwnProperty.call(
    children.props,
    "in",
  );
  if (hasTransition) {
    newChildProps.onEnter = onEnter;
    newChildProps.onExited = onExited;
  }

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Portal container={props.container} disablePortal={props.disablePortal}>
      <RootContainer onKeyDown={onKeyDownRoot} {...otherProps}>
        <FocusTrap
          disableEnforceFocus={true}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          open={open}
        >
          <div>
            <ClickAwayListener onClickAway={onClickAway}>
              {cloneElement(children, newChildProps)}
            </ClickAwayListener>
          </div>
        </FocusTrap>
      </RootContainer>
    </Portal>
  );
}
