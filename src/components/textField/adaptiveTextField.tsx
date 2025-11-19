import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import TextField, {
  textFieldClasses,
  TextFieldClasses,
  TextFieldOwnerState,
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import { mergeSlotProps, SlotProps } from "@mui/material/utils";
import {
  AdaptiveModeContext,
  useAdaptiveMode,
} from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import {
  AdaptiveFilledInput,
  AdaptiveFilledInputProps,
  AdaptiveInput,
  AdaptiveInputProps,
  AdaptiveOutlinedInput,
  AdaptiveOutlinedInputProps,
} from "../input/adaptiveInput";
import { AdaptiveSelect } from "../select/adaptiveSelect";

interface InputSlotProps<Props> {
  slotProps?: {
    input?: SlotProps<React.ElementType<Props>, {}, TextFieldOwnerState>;
  };
}

export type AdaptiveTextFieldProps<
  Variant extends TextFieldVariants = TextFieldVariants,
> = TextFieldProps<Variant> &
  StyledComponentProps<keyof AdaptiveTextFieldClasses> &
  (Variant extends "filled"
    ? InputSlotProps<AdaptiveFilledInputProps>
    : Variant extends "outlined"
      ? InputSlotProps<AdaptiveOutlinedInputProps>
      : InputSlotProps<AdaptiveInputProps>);

export interface AdaptiveTextFieldClasses extends TextFieldClasses {}

export const adaptiveTextFieldClasses = textFieldClasses;

const variantComponent = {
  standard: AdaptiveInput,
  filled: AdaptiveFilledInput,
  outlined: AdaptiveOutlinedInput,
};

export function AdaptiveTextField(
  inProps: {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: TextFieldVariants;
  } & Omit<AdaptiveTextFieldProps, "variant">,
) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveTextField" });
  const adaptiveMode = useAdaptiveMode();
  const { slotProps, slots, ...textFieldProps } = props;

  return (
    <AdaptiveModeContext.Provider value={{ mode: adaptiveMode }}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveTextField"
        targetComponentName="MuiTextField"
      >
        <TextField
          {...textFieldProps}
          slotProps={{
            ...slotProps,
            inputLabel: mergeSlotProps(slotProps?.inputLabel, {
              focused: adaptiveMode === "ios" ? false : undefined,
            }),
          }}
          slots={{
            input: variantComponent[textFieldProps.variant ?? "outlined"],
            select: AdaptiveSelect,
            ...slots,
          }}
        />
      </ReplaceComponentInTheme>
    </AdaptiveModeContext.Provider>
  );
}
