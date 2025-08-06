import { Breakpoint } from "@mui/material/styles";

export type ValidInclusiveBreakpoint = Exclude<Breakpoint, "xl">;

/**
 * Used to transform breakpoints since the down method is exclusive
 */
export default function inclusiveToExclusiveBreakpoint(
  breakpoint: ValidInclusiveBreakpoint | number | false,
) {
  const breakpointMap: Record<ValidInclusiveBreakpoint, Breakpoint> = {
    lg: "xl",
    md: "lg",
    sm: "md",
    xs: "sm",
  };

  return breakpoint === false
    ? 0
    : typeof breakpoint === "string"
      ? breakpointMap[breakpoint]
      : breakpoint + 1;
}
