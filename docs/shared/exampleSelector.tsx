import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

interface Props {
  onChange: (adaptiveMode: string) => void;
  options: { label: string; value: string }[];
  value: string;
}

export default function ExampleSelector(props: Props) {
  return (
    <RadioGroup row value={props.value} onChange={(e, v) => props.onChange(v)}>
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
