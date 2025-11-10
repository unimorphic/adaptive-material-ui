import Stack, {
  stackClasses,
  StackClasses,
  StackProps,
} from "@mui/material/Stack";
import {
  Breakpoint,
  CSSObject,
  styled,
  StyledComponentProps,
  Theme,
  useThemeProps,
} from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { clsx } from "clsx";
import {
  inclusiveToExclusiveBreakpoint,
  ValidInclusiveBreakpoint,
} from "../../shared/inclusiveToExclusiveBreakpoint";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export interface AdaptiveButtonStackProps
  extends Omit<StackProps, "classes" | "direction" | "useFlexGap">,
    StyledComponentProps<keyof AdaptiveButtonStackClasses> {
  /**
   * Breakpoint or screen width in px and below at which the children will be stretched.
   * This behavior can be disabled by setting it to false
   * @default xs
   */
  stretchBreakpoint?: ValidInclusiveBreakpoint | number | false;
}

export interface AdaptiveButtonStackClasses extends StackClasses {}

export const adaptiveButtonStackClasses = {
  ...stackClasses,
  ...generateUtilityClasses("AdaptiveButtonStack", ["alignStart"]),
};

export function createAdaptiveButtonStackStyles(
  theme: Theme,
  stretchBreakpointExclusive: Breakpoint | number,
  alignStartClass: string,
  additionalStyles?: CSSObject,
): CSSObject {
  return {
    [theme.breakpoints.down(stretchBreakpointExclusive)]: {
      // The & wrapper is required for emotion-disable comments to work
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
        ...additionalStyles,
      },
    },

    [theme.breakpoints.up(stretchBreakpointExclusive)]: {
      [`& .${alignStartClass}`]: {
        marginRight: "auto",
      },
    },
  };
}

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
  ...createAdaptiveButtonStackStyles(
    theme,
    ownerState.stretchBreakpointExclusive,
    adaptiveButtonStackClasses.alignStart,
  ),

  ...(ownerState.divider && {
    [`& .${adaptiveButtonStackClasses.alignStart} + *`]: {
      [theme.breakpoints.up(ownerState.stretchBreakpointExclusive)]: {
        display: "none",
      },
    },
  }),
}));

export function AdaptiveButtonStack(inProps: AdaptiveButtonStackProps) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveButtonStack",
  });
  const {
    className,
    justifyContent = "flex-end",
    spacing = 2,
    stretchBreakpoint = "xs",
    ...otherProps
  } = props;

  const composedClasses = composeClasses(
    { root: ["root"] },
    (s) => generateUtilityClass("AdaptiveButtonStack", s),
    props.classes,
  );

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveButtonStack"
      targetComponentName="MuiStack"
    >
      <StyledStack
        className={clsx(composedClasses.root, className)}
        justifyContent={justifyContent}
        ownerState={{
          ...props,
          stretchBreakpointExclusive:
            inclusiveToExclusiveBreakpoint(stretchBreakpoint),
        }}
        spacing={spacing}
        useFlexGap
        {...otherProps}
      />
    </ReplaceComponentInTheme>
  );
}
