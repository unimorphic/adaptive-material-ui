import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

interface Props<T extends string> {
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
  value: T;
}

export default function DemoSelector<T extends string>(props: Props<T>) {
  return (
    <RadioGroup
      row
      value={props.value}
      onChange={(e, v) => props.onChange(v as T)}
    >
      {props.options.map((option) => (
        <FormControlLabel
          control={<Radio />}
          key={option.label}
          label={option.label}
          value={option.value}
        />
      ))}
    </RadioGroup>
  );
}
