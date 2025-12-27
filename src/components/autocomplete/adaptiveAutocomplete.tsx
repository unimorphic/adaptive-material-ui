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
  mergeSlotProps,
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

type SlotsAndSlotProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
> = CreateSlotsAndSlotProps<
  {
    /**
     * The component used to render the dialog.
     * @default AdaptiveDialog
     */
    dialog: React.JSXElementConstructor<AdaptiveDialogProps>;

    /**
     * The component used to render the autocomplete inside the dialog.
     * @default AdaptiveDialog
     */
    dialogAutocomplete: React.JSXElementConstructor<
      AutocompleteProps<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
      >
    >;
  },
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
    dialogAutocomplete: SlotProps<
      React.ElementType<
        Partial<
          AutocompleteProps<
            Value,
            Multiple,
            DisableClearable,
            FreeSolo,
            ChipComponent
          >
        >
      >,
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
     * This behavior can be enabled/disabled always by setting it to true/false
     * @default xs
     */
    dialogBreakpoint?: ValidInclusiveBreakpoint | number | boolean;
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

interface OwnerState {
  isDialog: boolean;
  multiple: boolean;
  renderValue: unknown;
  valueDerived: unknown;
}

const StyledAutocomplete = styled(Autocomplete)<{ ownerState: OwnerState }>(
  () => ({
    variants: [
      {
        props: (props) =>
          (props.multiple || props.renderValue !== undefined) &&
          props.isDialog &&
          props.valueDerived !== null &&
          props.valueDerived !== undefined &&
          (!Array.isArray(props.valueDerived) || props.valueDerived.length > 0),
        style: {
          [`& .${autocompleteClasses.inputRoot} .${autocompleteClasses.input}`]:
            {
              bottom: 0,
              height: "auto",
              left: 0,
              position: "absolute",
              right: 0,
              top: 0,
              width: "auto",
            },
        },
      },
    ],
  }),
) as unknown as <
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
>(
  props: AdaptiveAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > & { ownerState: OwnerState },
) => React.JSX.Element;

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
    ref,
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
  const [DialogAutocompleteSlot, { ownerState, ...dialogAutocompleteProps }] =
    useSlot("dialogAutocomplete", {
      additionalProps: otherProps,
      className: "",
      elementType: Autocomplete,
      externalForwardedProps: {
        slots: props.slots,
        slotProps: props.slotProps,
      },
      ownerState: otherProps,
    });

  function onCloseAutocomplete(
    event: React.SyntheticEvent,
    reason: AutocompleteCloseReason,
  ) {
    if (!isDialog || !["blur", "toggleInput"].includes(reason)) {
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

  function renderInputDialogAutocomplete(
    params: AutocompleteRenderInputParams,
  ) {
    return dialogAutocompleteProps.renderInput({
      ...params,
      autoFocus: true,
    } as AutocompleteRenderInputParams);
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveAutocomplete"
      targetComponentName="MuiAutocomplete"
    >
      <StyledAutocomplete
        {...otherProps}
        readOnly={isDialog || readOnly}
        onChange={onChangeAutocomplete}
        onClose={onCloseAutocomplete}
        onOpen={onOpenAutocomplete}
        open={!isDialog && openDerived}
        ownerState={{
          isDialog: isDialog,
          multiple: props.multiple ?? false,
          renderValue: props.renderValue,
          valueDerived: valueDerived,
        }}
        ref={ref}
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
            <DialogAutocompleteSlot
              {...dialogAutocompleteProps}
              forcePopupIcon={false}
              onChange={onChangeAutocomplete}
              onClose={onCloseAutocomplete}
              open={true}
              renderInput={renderInputDialogAutocomplete}
              slotProps={{
                ...dialogAutocompleteProps.slotProps,
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                listbox: mergeSlotProps(
                  dialogAutocompleteProps.slotProps?.listbox,
                  { tabIndex: -1 },
                ) as never,
              }}
              slots={{
                ...dialogAutocompleteProps.slots,
                popper: OptionsContainer,
              }}
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
