import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  autocompleteClasses,
  AutocompleteClasses,
  AutocompleteCloseReason,
  AutocompletePopperSlotPropsOverrides,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteValue,
} from "@mui/material/Autocomplete";
import { ChipTypeMap } from "@mui/material/Chip";
import DialogContent from "@mui/material/DialogContent";
import { PopperProps } from "@mui/material/Popper";
import { styled, useTheme, useThemeProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CreateSlotsAndSlotProps,
  SlotProps,
  useControlled,
} from "@mui/material/utils";
import { useRef } from "react";
import {
  inclusiveToExclusiveBreakpoint,
  ValidInclusiveBreakpoint,
} from "../../shared/inclusiveToExclusiveBreakpoint";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { useSlot } from "../../shared/useSlot";
import { AdaptiveButton } from "../button/adaptiveButton";
import { AdaptiveDialog, AdaptiveDialogProps } from "../dialog/adaptiveDialog";
import { AdaptiveDialogActions } from "../dialog/adaptiveDialogActions";

interface Slots {
  /**
   * The component used to render the dialog.
   * @default AdaptiveDialog
   */
  dialog: React.JSXElementConstructor<AdaptiveDialogProps>;
}

type SlotsAndSlotProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
> = CreateSlotsAndSlotProps<
  Slots,
  {
    dialog: SlotProps<
      React.ElementType<Partial<AdaptiveDialogProps>>,
      {},
      AdaptiveAutocompleteProps<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
      >
    >;
  }
>;

export type AdaptiveAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
> = AutocompleteProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
> &
  SlotsAndSlotProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > & {
    /**
     * Breakpoint or screen width in px and below at which a dialog will open.
     * This behavior can be disabled by setting it to false
     * @default xs
     */
    dialogBreakpoint?: ValidInclusiveBreakpoint | number | false;
  };

export interface AdaptiveAutocompleteClasses extends AutocompleteClasses {}

export const adaptiveAutocompleteClasses = autocompleteClasses;

function OptionsContainer(
  props: PopperProps & AutocompletePopperSlotPropsOverrides,
) {
  return typeof props.children === "function"
    ? props.children({
        placement: props.placement ?? "bottom",
        TransitionProps: undefined,
      })
    : props.children;
}

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  [`& .${autocompleteClasses.paper}`]: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginTop: theme.spacing(1),
    minHeight: 0,

    [`& .${autocompleteClasses.listbox}`]: {
      flex: 1,
      maxHeight: "none",
    },
  },
}));

export function AdaptiveAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
>(
  inProps: AdaptiveAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >,
) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveAutocomplete" });
  const {
    dialogBreakpoint = "xs",
    onChange,
    onClose,
    onOpen,
    open,
    readOnly,
    renderInput,
    value,
    ...otherProps
  } = props;
  const dialogElement = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isDialog = useMediaQuery(
    theme.breakpoints.down(inclusiveToExclusiveBreakpoint(dialogBreakpoint)),
  );

  const [openDerived, setOpenState] = useControlled({
    controlled: open,
    default: false,
    name: "AdaptiveAutocomplete",
  });
  const [valueDerived, setValueState] = useControlled({
    controlled: value,
    default:
      props.defaultValue ??
      ((props.multiple ? [] : null) as AutocompleteValue<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo
      >),
    name: "AdaptiveAutocomplete",
  });
  const [DialogSlot, dialogProps] = useSlot("dialog", {
    className: "",
    elementType: AdaptiveDialog,
    externalForwardedProps: { slots: props.slots, slotProps: props.slotProps },
    ownerState: props,
  });

  function onCloseAutocomplete(
    event: React.SyntheticEvent,
    reason: AutocompleteCloseReason,
  ) {
    if (!isDialog || reason !== "blur") {
      setOpenState(false);
      onClose?.(event, reason);
    }
  }

  function onCloseDialog(event: React.SyntheticEvent) {
    setOpenState(false);
    onClose?.(event, "escape");
  }

  function onChangeAutocomplete(
    event: React.SyntheticEvent,
    value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Value>,
  ) {
    setValueState(value);
    onChange?.(event, value, reason, details);
  }

  function onOpenAutocomplete(event: React.SyntheticEvent) {
    if (
      !("relatedTarget" in event) ||
      !event.relatedTarget ||
      !dialogElement.current?.contains(event.relatedTarget as Node)
    ) {
      if (!readOnly) {
        setOpenState(true);
      }
      onOpen?.(event);
    }
  }

  function renderInputAutocomplete(params: AutocompleteRenderInputParams) {
    return renderInput({
      ...params,
      autoFocus: true,
    } as AutocompleteRenderInputParams);
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveAutocomplete"
      targetComponentName="MuiAutocomplete"
    >
      <Autocomplete
        {...otherProps}
        readOnly={isDialog || readOnly}
        onChange={onChangeAutocomplete}
        onClose={onCloseAutocomplete}
        onOpen={onOpenAutocomplete}
        open={!isDialog && openDerived}
        renderInput={renderInput}
        value={valueDerived}
      />
      {isDialog ? (
        <DialogSlot
          {...dialogProps}
          onClose={onCloseDialog}
          open={openDerived}
          ref={dialogElement}
        >
          <StyledDialogContent>
            <Autocomplete
              {...otherProps}
              forcePopupIcon={false}
              onChange={onChangeAutocomplete}
              onClose={onCloseAutocomplete}
              open={true}
              renderInput={renderInputAutocomplete}
              slots={{ ...otherProps.slots, popper: OptionsContainer }}
              value={valueDerived}
            />
          </StyledDialogContent>
          <AdaptiveDialogActions>
            <AdaptiveButton onClick={onCloseDialog}>
              {props.closeText ?? "Close"}
            </AdaptiveButton>
          </AdaptiveDialogActions>
        </DialogSlot>
      ) : null}
    </ReplaceComponentInTheme>
  );
}
