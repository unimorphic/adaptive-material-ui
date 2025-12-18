import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CloudIcon from "@mui/icons-material/Cloud";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import NoSsr from "@mui/material/NoSsr";
import Portal from "@mui/material/Portal";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";
import { useAdaptiveMode } from "adaptive-material-ui/adaptiveMode";
import { AdaptiveAutocomplete } from "adaptive-material-ui/components/autocomplete";
import { AdaptiveButton } from "adaptive-material-ui/components/button";
import {
  AdaptiveButtonStack,
  adaptiveButtonStackClasses,
} from "adaptive-material-ui/components/buttonStack";
import { AdaptiveCheckbox } from "adaptive-material-ui/components/checkbox";
import { AdaptiveCircularProgress } from "adaptive-material-ui/components/circularProgress";
import {
  AdaptiveDialog,
  AdaptiveDialogActions,
} from "adaptive-material-ui/components/dialog";
import { AdaptiveFab } from "adaptive-material-ui/components/fab";
import { AdaptiveIconButton } from "adaptive-material-ui/components/iconButton";
import { AdaptiveLinearProgress } from "adaptive-material-ui/components/linearProgress";
import { AdaptiveMenu } from "adaptive-material-ui/components/menu";
import { AdaptiveRadio } from "adaptive-material-ui/components/radio";
import {
  AdaptiveSelect,
  AdaptiveSelectItem,
} from "adaptive-material-ui/components/select";
import { AdaptiveSlider } from "adaptive-material-ui/components/slider";
import { AdaptiveSnackbar } from "adaptive-material-ui/components/snackbar";
import { AdaptiveSwitch } from "adaptive-material-ui/components/switch";
import { AdaptiveTextField } from "adaptive-material-ui/components/textField";
import type {} from "adaptive-material-ui/theme/themeAugmentation";
import { useEffect, useState } from "react";
import AdaptiveModeDemo from "./adaptiveModeDemo";
import { allCountries } from "./countries";
import { DemoList, DemoListItem } from "./demoList";
import ExampleShortDialogContent from "./placeholders/exampleShortDialogContent";

const StyledDemoList = styled(DemoList)({
  "& a[class*='inline-link']": {
    display: "block",
    padding: `10px 0`,
    width: "100%",

    "&:hover": {
      borderBottom: "none",
      textDecoration: "underline",
    },
  },
});

function Content() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const adaptiveMode = useAdaptiveMode();

  return (
    <StyledDemoList>
      <DemoListItem
        title="Adaptive Autocomplete"
        titleHref="/docs/components/AdaptiveAutocomplete"
      >
        <AdaptiveAutocomplete
          options={allCountries}
          renderInput={(params) => (
            <AdaptiveTextField {...params} label="Country" />
          )}
          sx={{ minWidth: 200 }}
        />
      </DemoListItem>
      <DemoListItem
        title="Adaptive Button"
        titleHref="/docs/components/adaptiveButton"
      >
        <AdaptiveButton variant="contained">Button</AdaptiveButton>
        <AdaptiveButton round variant="outlined">
          Round
        </AdaptiveButton>
        <AdaptiveIconButton size="small">
          <AddIcon />
        </AdaptiveIconButton>
      </DemoListItem>
      <DemoListItem
        title="Adaptive Button Stack"
        titleHref="/docs/components/adaptiveButtonStack"
      >
        <AdaptiveButtonStack>
          <AdaptiveButton
            className={adaptiveButtonStackClasses.alignStart}
            variant="contained"
          >
            Button
          </AdaptiveButton>
          <AdaptiveButton variant="contained">Stack</AdaptiveButton>
        </AdaptiveButtonStack>
      </DemoListItem>
      <DemoListItem
        title="Adaptive Checkbox"
        titleHref="/docs/components/adaptiveCheckbox"
      >
        <AdaptiveCheckbox defaultChecked />
      </DemoListItem>
      <DemoListItem
        title="Adaptive Dialog"
        titleHref="/docs/components/adaptiveDialog"
      >
        <AdaptiveButton onClick={() => setOpen(1)} variant="contained">
          Open
        </AdaptiveButton>
        <AdaptiveDialog
          open={open === 1}
          onClose={() => setOpen(0)}
          variant="short"
        >
          <ExampleShortDialogContent />
          <AdaptiveDialogActions>
            <AdaptiveButton
              color={adaptiveMode === "ios" ? "inherit" : undefined}
              onClick={() => setOpen(0)}
            >
              Disagree
            </AdaptiveButton>
            <AdaptiveButton onClick={() => setOpen(0)}>Agree</AdaptiveButton>
          </AdaptiveDialogActions>
        </AdaptiveDialog>
      </DemoListItem>
      <DemoListItem
        title="Adaptive FAB"
        titleHref="/docs/components/adaptiveFab"
      >
        <AdaptiveFab aria-label="add">
          <AddIcon />
        </AdaptiveFab>
      </DemoListItem>
      <DemoListItem
        title="Adaptive Menu"
        titleHref="/docs/components/adaptiveMenu"
      >
        <AdaptiveButton
          onClick={(e) => setAnchorEl((v) => (v ? null : e.currentTarget))}
          variant="contained"
        >
          Open
        </AdaptiveButton>
        <AdaptiveMenu
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          open={anchorEl !== null}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <ContentCutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <ContentCopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <ContentPasteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <CloudIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </AdaptiveMenu>
      </DemoListItem>
      <DemoListItem
        title="Adaptive Progress"
        titleHref="/docs/components/adaptiveProgress"
      >
        <AdaptiveCircularProgress />
        <AdaptiveLinearProgress />
      </DemoListItem>
      <DemoListItem
        title="Adaptive Radio"
        titleHref="/docs/components/adaptiveRadio"
      >
        <RadioGroup defaultValue="1" row>
          <FormControlLabel control={<AdaptiveRadio />} label="One" value="1" />
          <FormControlLabel control={<AdaptiveRadio />} label="Two" value="2" />
        </RadioGroup>
      </DemoListItem>
      <DemoListItem
        title="Adaptive Select"
        titleHref="/docs/components/adaptiveSelect"
      >
        <AdaptiveSelect defaultValue={1}>
          <AdaptiveSelectItem value={1}>One</AdaptiveSelectItem>
          <AdaptiveSelectItem value={2}>Two</AdaptiveSelectItem>
        </AdaptiveSelect>
      </DemoListItem>
      <DemoListItem
        title="Adaptive Slider"
        titleHref="/docs/components/adaptiveSlider"
      >
        <AdaptiveSlider defaultValue={30} />
      </DemoListItem>
      <DemoListItem
        title="Adaptive Snackbar"
        titleHref="/docs/components/adaptiveSnackbar"
      >
        <AdaptiveButton onClick={() => setOpen(2)} variant="contained">
          Open
        </AdaptiveButton>
        <Portal>
          <AdaptiveSnackbar
            action={
              <AdaptiveIconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpen(0)}
              >
                <CloseIcon fontSize="small" />
              </AdaptiveIconButton>
            }
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            autoHideDuration={6000}
            message="Note archived"
            onClose={() => setOpen(0)}
            open={open === 2}
          />
        </Portal>
      </DemoListItem>
      <DemoListItem
        title="Adaptive Switch"
        titleHref="/docs/components/adaptiveSwitch"
      >
        <AdaptiveSwitch defaultChecked />
      </DemoListItem>
      <DemoListItem
        title="Adaptive Text Field"
        titleHref="/docs/components/adaptiveTextField"
      >
        <AdaptiveTextField label="Text field" variant="standard" />
      </DemoListItem>
    </StyledDemoList>
  );
}

export default function () {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <NoSsr>
      <AdaptiveModeDemo>
        <Divider />
        <br />
        <Content />
        <br />
        <Divider />
      </AdaptiveModeDemo>
    </NoSsr>
  );
}
