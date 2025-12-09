import {
  CircularProgressClasses,
  CircularProgressProps,
  CircularProgressPropsVariantOverrides,
} from "@mui/material/CircularProgress";
import { StyledComponentProps } from "@mui/material/styles";
import { OverridableStringUnion } from "@mui/types";
import { AndroidClasses } from "../../shared/android/androidClasses";
import { IosClasses } from "../../shared/ios/iosClasses";

export type AdaptiveCircularProgressProps = Omit<
  CircularProgressProps,
  "variant"
> &
  StyledComponentProps<keyof AdaptiveCircularProgressClasses> & {
    /**
     * The variant to use.
     * Use indeterminate when there is no progress value.
     * `indeterminate-alt` renders a alternate animation [Android only]
     * @default 'indeterminate'
     */
    variant?: OverridableStringUnion<
      "determinate" | "indeterminate" | "indeterminate-alt",
      CircularProgressPropsVariantOverrides
    >;
  };

export interface AdaptiveCircularProgressClasses
  extends CircularProgressClasses,
    IosClasses,
    AndroidClasses {}
