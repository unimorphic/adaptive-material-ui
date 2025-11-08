import Stack, { StackProps } from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { AdaptiveMode } from "adaptive-material-ui/adaptiveMode";
import { AdaptiveThemeProvider } from "adaptive-material-ui/theme/adaptiveThemeProvider";
import { useState } from "react";
import AutoHeightSuspenseSkeleton from "./autoHeightSuspenseSkeleton";
import DemoSelector from "./demoSelector";

interface Props extends Omit<StackProps, "onChange"> {
  adaptiveMode?: AdaptiveMode;
}

export default function AdaptiveModeDemo(props: Props) {
  const { adaptiveMode, children, ...otherProps } = props;
  const [selectedAdaptiveMode, setSelectedAdaptiveMode] =
    useState(adaptiveMode);
  const theme = useTheme();

  function onChange(value: AdaptiveMode | "") {
    setSelectedAdaptiveMode(value !== "" ? value : undefined);
  }

  return (
    <AdaptiveThemeProvider
      adaptiveModeInfo={{ mode: selectedAdaptiveMode }}
      theme={{
        colorSchemes: { dark: theme.palette.mode === "dark" },
        direction: theme.direction,
      }}
    >
      <Stack alignItems="flex-start" spacing={3} {...otherProps}>
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
        <AutoHeightSuspenseSkeleton>{children}</AutoHeightSuspenseSkeleton>
      </Stack>
    </AdaptiveThemeProvider>
  );
}
