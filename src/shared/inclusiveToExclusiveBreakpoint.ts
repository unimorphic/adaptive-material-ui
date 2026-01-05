import { Breakpoint } from "@mui/material/styles";

export type ValidInclusiveBreakpoint = Exclude<Breakpoint, "xl">;

/**
 * Used to transform breakpoints since the down method is exclusive
 */
export function inclusiveToExclusiveBreakpoint(
  breakpoint: ValidInclusiveBreakpoint | number | boolean,
) {
  const breakpointMap: Record<ValidInclusiveBreakpoint, Breakpoint> = {
    lg: "xl",
    md: "lg",
    sm: "md",
    xs: "sm",
  };

  return breakpoint === false
    ? 0
    : breakpoint === true
      ? Number.MAX_SAFE_INTEGER
      : typeof breakpoint === "string"
        ? breakpointMap[breakpoint]
        : breakpoint + 1;
}
