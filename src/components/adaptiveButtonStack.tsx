import Stack, { StackProps } from "@mui/material/Stack";
import {
  Breakpoint,
  styled,
  StyledComponentProps,
  useThemeProps,
} from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { AdaptiveButtonStackSpacerContext } from "./adaptiveButtonStackSpacer";
import inclusiveToExclusiveBreakpoint, {
  ValidInclusiveBreakpoint,
} from "./shared/inclusiveToExclusiveBreakpoint";
import RemoveComponentFromTheme from "./shared/removeComponentFromTheme";

export interface AdaptiveButtonStackProps
  extends Omit<StackProps, "classes" | "direction" | "useFlexGap">,
    StyledComponentProps<AdaptiveButtonStackKey> {
  /**
   * Breakpoint or screen width in px and below at which the children will be stretched
   * This behavior can be disabled by setting it to false
   * @default xs
   */
  stretchBreakpoint?: ValidInclusiveBreakpoint | number | false;
}

export interface AdaptiveButtonStackClasses {
  /** Styles applied to the root element */
  root: string;
}

export type AdaptiveButtonStackKey = keyof AdaptiveButtonStackClasses;

const StyledStack = styled(Stack, {
  name: "AdaptiveButtonStack",
  slot: "root",
})<{
  ownerState: { stretchBreakpointExclusive: Breakpoint | number } & Omit<
    AdaptiveButtonStackProps,
    "stretchBreakpoint"
  >;
}>(({ theme, ownerState }) => ({
  flexDirection: "row",

  [theme.breakpoints.down(ownerState.stretchBreakpointExclusive)]: {
    // Required for below emotion-disable comments to work
    "&": {
      alignItems: "stretch",
      flexDirection: "column-reverse",

      // Emotion has issues with nth-child in SSR https://github.com/emotion-js/emotion/issues/1105
      "&:has(> :last-child:nth-child(1 of :not(style))) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
        {
          alignItems: "center",
          flexDirection: "row",

          "& > *": {
            minWidth: "50%",
          },
        },
      "&:has(> :last-child:nth-child(2 of :not(style))) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
        {
          alignItems: "center",
          flexDirection: "row",

          "& > *": {
            flex: 1,
          },
        },
    },
  },
}));

export default function AdaptiveButtonStack(inProps: AdaptiveButtonStackProps) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveButtonStack",
  });
  const {
    classes,
    className,
    justifyContent = "flex-end",
    spacing = 2,
    stretchBreakpoint = "xs",
    ...otherProps
  } = props;

  const composedClasses = composeClasses(
    { root: ["root"] },
    (s) => generateUtilityClass("AdaptiveButtonStack", s),
    classes,
  );

  const stretchBreakpointExclusive =
    inclusiveToExclusiveBreakpoint(stretchBreakpoint);

  return (
    // Only use AdaptiveButtonStack styles
    <RemoveComponentFromTheme componentName="MuiStack">
      <AdaptiveButtonStackSpacerContext.Provider
        value={stretchBreakpointExclusive}
      >
        <StyledStack
          className={clsx(composedClasses.root, className)}
          justifyContent={justifyContent}
          ownerState={{
            ...props,
            stretchBreakpointExclusive: stretchBreakpointExclusive,
          }}
          spacing={spacing}
          useFlexGap
          {...otherProps}
        />
      </AdaptiveButtonStackSpacerContext.Provider>
    </RemoveComponentFromTheme>
  );
}
