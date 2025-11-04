import { Breakpoint, styled } from "@mui/material/styles";
import { createContext, useContext } from "react";

export const AdaptiveButtonStackSpacerContext = createContext<
  Breakpoint | number
>("sm");

const SpacerDiv = styled("div")<{
  ownerState: { stretchBreakpointExclusive: Breakpoint | number };
}>(({ theme, ownerState }) => ({
  marginLeft: "auto !important",

  [theme.breakpoints.down(ownerState.stretchBreakpointExclusive)]: {
    display: "none",
  },
}));

export function AdaptiveButtonStackSpacer() {
  const stretchBreakpointExclusive = useContext(
    AdaptiveButtonStackSpacerContext,
  );

  return (
    <SpacerDiv
      ownerState={{ stretchBreakpointExclusive: stretchBreakpointExclusive }}
    />
  );
}
