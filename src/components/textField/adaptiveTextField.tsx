import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import TextField, {
  textFieldClasses,
  TextFieldClasses,
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import { mergeSlotProps } from "@mui/material/utils";
import {
  AdaptiveModeContext,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { AdaptiveSelect } from "../select/adaptiveSelect";
import {
  AdaptiveFilledInput,
  AdaptiveFilledInputProps,
  AdaptiveInput,
  AdaptiveInputProps,
  AdaptiveOutlinedInput,
  AdaptiveOutlinedInputProps,
} from "./adaptiveInput";

export type AdaptiveTextFieldProps<
  Variant extends TextFieldVariants = TextFieldVariants,
> = Omit<TextFieldProps<Variant>, "classes" | "slotProps" | "variant"> &
  StyledComponentProps<keyof AdaptiveTextFieldClasses> &
  AdaptiveModeProp & {
    slotProps?: Omit<TextFieldProps<Variant>["slotProps"], "input"> & {
      input?: Variant extends "filled"
        ? AdaptiveFilledInputProps
        : Variant extends "outlined"
          ? AdaptiveOutlinedInputProps
          : AdaptiveInputProps;
    };
    variant?: Variant;
  };

export interface AdaptiveTextFieldClasses extends TextFieldClasses {}

export const adaptiveTextFieldClasses = textFieldClasses;

const variantComponent = {
  standard: AdaptiveInput,
  filled: AdaptiveFilledInput,
  outlined: AdaptiveOutlinedInput,
};

export function AdaptiveTextField<
  Variant extends TextFieldVariants = "outlined",
>(inProps: AdaptiveTextFieldProps<Variant>) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveTextField" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);
  const { slotProps, slots, ...textFieldProps } = otherProps;

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
