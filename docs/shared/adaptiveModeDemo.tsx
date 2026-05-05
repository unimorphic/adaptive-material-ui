import Stack, { StackProps } from "@mui/material/Stack";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import { AdaptiveMode } from "adaptive-material-ui/adaptiveMode";
import { AdaptiveThemeProvider } from "adaptive-material-ui/theme/adaptiveThemeProvider";
import { useState } from "react";
import AutoHeightSuspenseSkeleton from "./autoHeightSuspenseSkeleton";
import DemoSelector from "./demoSelector";

interface Props extends Omit<StackProps, "onChange"> {
  adaptiveMode?: AdaptiveMode;
}

const StyledStack = styled(Stack)(() => ({
  alignItems: "flex-start",
}));

export default function AdaptiveModeDemo(props: Props) {
  const { adaptiveMode, children, ...otherProps } = props;
  const [selectedAdaptiveMode, setSelectedAdaptiveMode] =
    useState(adaptiveMode);
  const theme = useTheme();

  const adaptiveTheme = createTheme({
    colorSchemes: { dark: theme.palette.mode === "dark" },
    components: theme.components,
    direction: theme.direction,
  });

  function onChange(value: AdaptiveMode | "") {
    setSelectedAdaptiveMode(value !== "" ? value : undefined);
  }

  return (
    <StyledStack spacing={3} {...otherProps}>
      {!adaptiveMode ? (
        <DemoSelector
          onChange={onChange}
          options={[
            { label: "Adaptive", value: "" },
            { label: "iOS", value: "ios" },
            { label: "Android", value: "android" },
            { label: "Desktop", value: "desktop" },
          ]}
          value={selectedAdaptiveMode ?? ""}
        />
      ) : null}
      <AutoHeightSuspenseSkeleton>
        <AdaptiveThemeProvider
          adaptiveModeInfo={{ mode: selectedAdaptiveMode }}
          theme={adaptiveTheme}
        >
          {children}
        </AdaptiveThemeProvider>
      </AutoHeightSuspenseSkeleton>
    </StyledStack>
  );
}
