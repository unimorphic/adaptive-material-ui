import DialogActions, {
  dialogActionsClasses,
  DialogActionsClasses,
  DialogActionsProps,
} from "@mui/material/DialogActions";
import {
  Breakpoint,
  styled,
  StyledComponentProps,
  useThemeProps,
} from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { clsx } from "clsx";
import { createContext } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import {
  inclusiveToExclusiveBreakpoint,
  ValidInclusiveBreakpoint,
} from "../../shared/inclusiveToExclusiveBreakpoint";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { slotShouldForwardProp } from "../../shared/slotShouldForwardProp";
import { AdaptiveButtonProps } from "../button/adaptiveButton";
import { createAdaptiveButtonStackStyles } from "../buttonStack/adaptiveButtonStack";

export type AdaptiveDialogActionsProps = DialogActionsProps &
  StyledComponentProps<keyof AdaptiveDialogActionsClasses> & {
    /** Props passed to child AdaptiveButton components */
    buttonDefaultProps?: AdaptiveButtonProps;

    /**
     * Breakpoint or screen width in px and below at which the children will be stretched.
     * This behavior can be disabled by setting it to false
     * @default xs
     */
    stretchBreakpoint?: ValidInclusiveBreakpoint | number | false;
  };

export interface AdaptiveDialogActionsClasses extends DialogActionsClasses {}

export const adaptiveDialogActionsClasses = {
  ...dialogActionsClasses,
  ...generateUtilityClasses("AdaptiveDialogActions", ["alignStart"]),
};

/** Context used to pass buttonDefaultProps */
export const AdaptiveDialogActionsContext = createContext<
  AdaptiveButtonProps | undefined
>(undefined);

const StyledDialogActions = styled(DialogActions, {
  name: "AdaptiveDialogActions",
  slot: "root",
  shouldForwardProp: slotShouldForwardProp,
})<{
  ownerState: { stretchBreakpointExclusive: Breakpoint | number };
}>(({ theme, ownerState }) => ({
  ...createAdaptiveButtonStackStyles(
    theme,
    ownerState.stretchBreakpointExclusive,
    adaptiveDialogActionsClasses.alignStart,
    {
      [`&.${dialogActionsClasses.spacing}`]: {
        gap: theme.spacing(1),
      },
      "& > *:not(style)~:not(style)": {
        margin: 0,
      },
    },
  ),
}));

export function AdaptiveDialogActions(inProps: AdaptiveDialogActionsProps) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveDialogActions",
  });
  const adaptiveMode = useAdaptiveMode();

  const {
    buttonDefaultProps = adaptiveMode === "ios"
      ? {
          disableElevation: true,
          round: true,
          size: "large",
          variant: "contained",
        }
      : undefined,
    className,
    stretchBreakpoint = "xs",
    ...otherProps
  } = props;

  const composedClasses = composeClasses(
    { root: ["root"] },
    (s) => generateUtilityClass("AdaptiveDialogActions", s),
    props.classes,
  );

  return (
    <AdaptiveDialogActionsContext value={buttonDefaultProps}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveDialogActions"
        targetComponentName="MuiDialogActions"
      >
        <StyledDialogActions
          className={clsx(composedClasses.root, className)}
          ownerState={{
            ...props,
            stretchBreakpointExclusive:
              inclusiveToExclusiveBreakpoint(stretchBreakpoint),
          }}
          {...otherProps}
        />
      </ReplaceComponentInTheme>
    </AdaptiveDialogActionsContext>
  );
}
