import CircularProgress from "@mui/material/CircularProgress";
import { AdaptiveCircularProgressProps } from "./circularProgressProps";

export function CircularProgressDesktop(props: AdaptiveCircularProgressProps) {
  return (
    <CircularProgress
      {...props}
      variant={
        props.variant === "indeterminate-alt" ? "indeterminate" : props.variant
      }
    />
  );
}
