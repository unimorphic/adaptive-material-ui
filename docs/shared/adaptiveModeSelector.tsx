import ExampleSelector from "./exampleSelector";

interface Props {
  adaptiveMode: string;
  onChange: (adaptiveMode: string) => void;
}

export default function AdaptiveModeSelector(props: Props) {
  return (
    <ExampleSelector
      onChange={props.onChange}
      options={[
        { label: "Adaptive", value: "" },
        { label: "iOS", value: "ios" },
        { label: "Android", value: "android" },
        { label: "Desktop", value: "desktop" },
      ]}
      value={props.adaptiveMode}
    />
  );
}
