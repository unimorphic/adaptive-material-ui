import Stack, { StackProps } from "@mui/material/Stack";
import AutoHeightSuspenseSkeleton from "./autoHeightSuspenseSkeleton";
import DemoSelector from "./demoSelector";

interface Props extends Omit<StackProps, "onChange"> {
  adaptiveMode: string;
  onChange: (adaptiveMode: string) => void;
}

export default function AdaptiveModeDemo(props: Props) {
  const { adaptiveMode, children, onChange, ...otherProps } = props;

  return (
    <Stack alignItems="flex-start" spacing={3} {...otherProps}>
      <DemoSelector
        onChange={onChange}
        options={[
          { label: "Adaptive", value: "" },
          { label: "iOS", value: "ios" },
          { label: "Android", value: "android" },
          { label: "Desktop", value: "desktop" },
        ]}
        value={adaptiveMode}
      />
      <AutoHeightSuspenseSkeleton>{children}</AutoHeightSuspenseSkeleton>
    </Stack>
  );
}
