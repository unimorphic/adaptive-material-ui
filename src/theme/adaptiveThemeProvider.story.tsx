import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { createTheme } from "@mui/material/styles";
import { AdaptiveAutocomplete } from "../components/autocomplete/adaptiveAutocomplete";
import { AdaptiveButton } from "../components/button";
import { AdaptiveButtonStack } from "../components/buttonStack";
import { AdaptiveCheckbox } from "../components/checkbox";
import { AdaptiveCircularProgress } from "../components/circularProgress";
import { AdaptiveDialog, AdaptiveDialogActions } from "../components/dialog";
import { AdaptiveFab } from "../components/fab";
import { AdaptiveIconButton } from "../components/iconButton";
import { AdaptiveLinearProgress } from "../components/linearProgress";
import { AdaptiveMenu } from "../components/menu";
import { AdaptiveRadio } from "../components/radio";
import { AdaptiveSelect, AdaptiveSelectItem } from "../components/select";
import { AdaptiveSlider } from "../components/slider";
import { AdaptiveSnackbar } from "../components/snackbar";
import { AdaptiveSwitch } from "../components/switch";
import { AdaptiveTextField } from "../components/textField";
import { AdaptiveThemeProvider } from "./adaptiveThemeProvider";

function AllComponents() {
  return (
    <Stack spacing={2}>
      <AdaptiveAutocomplete
        options={["one", "two"]}
        renderInput={(params) => (
          <AdaptiveTextField {...params} label="Country" />
        )}
      />

      <AdaptiveButton variant="outlined">Button</AdaptiveButton>

      <AdaptiveButtonStack>
        <AdaptiveButton>Button</AdaptiveButton>
        <AdaptiveButton>Stack</AdaptiveButton>
      </AdaptiveButtonStack>

      <AdaptiveCheckbox />

      <AdaptiveCircularProgress />
      <AdaptiveCircularProgress value={40} variant="determinate" />

      <AdaptiveDialog open={true} variant="short">
        <DialogTitle>text</DialogTitle>
        <DialogContent>
          <DialogContentText>text</DialogContentText>
        </DialogContent>
        <AdaptiveDialogActions>
          <AdaptiveButton>Button</AdaptiveButton>
        </AdaptiveDialogActions>
      </AdaptiveDialog>

      <AdaptiveFab>button</AdaptiveFab>

      <AdaptiveIconButton>button</AdaptiveIconButton>
      <AdaptiveIconButton variant="contained">button</AdaptiveIconButton>

      <AdaptiveLinearProgress />

      <AdaptiveMenu open={true}>
        <MenuItem>MenuItem 1</MenuItem>
        <MenuItem>MenuItem 2</MenuItem>
      </AdaptiveMenu>

      <RadioGroup row>
        <AdaptiveRadio value={1} />
        <AdaptiveRadio value={2} />
      </RadioGroup>

      <AdaptiveSelect defaultValue={1}>
        <AdaptiveSelectItem value={1}>One</AdaptiveSelectItem>
        <AdaptiveSelectItem value={2}>Two</AdaptiveSelectItem>
      </AdaptiveSelect>

      <AdaptiveSlider defaultValue={30} />

      <AdaptiveSnackbar message="Note archived" open={true} />

      <AdaptiveSwitch defaultChecked />

      <AdaptiveTextField variant="standard" />
      <AdaptiveTextField variant="outlined" />
      <AdaptiveTextField variant="filled" />
    </Stack>
  );
}

export function CssVariablesTest() {
  const theme = createTheme({ cssVariables: true });

  return (
    <AdaptiveThemeProvider theme={theme}>
      <AllComponents />
    </AdaptiveThemeProvider>
  );
}
