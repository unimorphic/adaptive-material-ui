import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AdaptiveButton,
  adaptiveButtonClasses,
} from "adaptive-material-ui/components/button/adaptiveButton";
import {
  AdaptiveButtonStack,
  adaptiveButtonStackClasses,
} from "adaptive-material-ui/components/buttonStack/adaptiveButtonStack";
import { AdaptiveCheckbox } from "adaptive-material-ui/components/checkbox/adaptiveCheckbox";
import {
  AdaptiveDialog,
  AdaptiveDialogActions,
  adaptiveDialogClasses,
} from "adaptive-material-ui/components/dialog/adaptiveDialog";
import {
  AdaptiveMenu,
  adaptiveMenuClasses,
} from "adaptive-material-ui/components/menu/adaptiveMenu";
import { AdaptiveRadio } from "adaptive-material-ui/components/radio/adaptiveRadio";
import {
  AdaptiveSelect,
  AdaptiveSelectItem,
} from "adaptive-material-ui/components/select/adaptiveSelect";
import { AdaptiveSlider } from "adaptive-material-ui/components/slider/adaptiveSlider";
import {
  AdaptiveSwitch,
  adaptiveSwitchClasses,
} from "adaptive-material-ui/components/switch/adaptiveSwitch";
import { AdaptiveTextField } from "adaptive-material-ui/components/textField/adaptiveTextField";
import type {} from "adaptive-material-ui/theme/themeAugmentation";
import { useState } from "react";

const theme = createTheme({
  colorSchemes: { dark: true },
  components: {
    AdaptiveButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          alignSelf: "flex-start",
        },
      },
    },
    AdaptiveButtonStack: {
      defaultProps: {
        divider: <div>a</div>,
        spacing: 0.5,
      },
      styleOverrides: {
        root: {
          backgroundColor: "grey",

          [`&.${adaptiveButtonStackClasses.root}`]: {
            marginLeft: 10,
          },
          [`& .${adaptiveButtonClasses.ios}`]: {
            marginTop: 10,
          },
        },
      },
    },
    AdaptiveCheckbox: {
      defaultProps: {
        defaultChecked: true,
      },
      styleOverrides: {
        ios: {
          backgroundColor: "purple",
        },
        root: {
          backgroundColor: "blue",
        },
      },
    },
    AdaptiveDialog: {
      defaultProps: {
        hideBackdrop: true,
      },
      styleOverrides: {
        ios: {
          [`& .${adaptiveDialogClasses.paper}`]: {
            background: "grey",
          },
        },
        root: {
          [`& .${adaptiveDialogClasses.paper}`]: {
            background: "blue",
          },
        },
      },
    },
    AdaptiveDialogActions: {
      defaultProps: {
        buttonDefaultProps: { variant: "outlined" },
        disableSpacing: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: "black",

          [`.${adaptiveDialogClasses.ios} &`]: {
            background: "blue",
          },
        },
      },
    },
    AdaptiveFilledInput: {
      defaultProps: {
        startAdornment: <span>a</span>,
      },
      styleOverrides: {
        ios: {
          outline: "1px solid blue",
        },
      },
    },
    AdaptiveInput: {
      defaultProps: {
        startAdornment: <span>b</span>,
      },
      styleOverrides: {
        ios: {
          outline: "1px solid blue",
        },
      },
    },
    AdaptiveOutlinedInput: {
      defaultProps: {
        startAdornment: <span>c</span>,
      },
      styleOverrides: {
        ios: {
          outline: "1px solid blue",
        },
      },
    },
    AdaptiveMenu: {
      defaultProps: {
        slotProps: { list: { disablePadding: true } },
      },
      styleOverrides: {
        ios: {
          [`& .${adaptiveMenuClasses.paper}`]: {
            backgroundColor: "grey",
          },
        },
        paper: {
          backgroundColor: "blue",
        },
      },
    },
    AdaptiveRadio: {
      defaultProps: {
        checked: true,
      },
      styleOverrides: {
        ios: {
          backgroundColor: "blue",
        },
        root: {
          backgroundColor: "purple",
        },
      },
    },
    AdaptiveSelect: {
      defaultProps: {
        MenuProps: {
          slotProps: {
            list: { disablePadding: true },
          },
        },
      },
      styleOverrides: {
        root: {
          alignSelf: "flex-start",
        },
      },
    },
    AdaptiveSelectItem: {
      defaultProps: {
        dense: true,
      },
      styleOverrides: {
        dense: {
          backgroundColor: "blue",
        },
      },
    },
    AdaptiveSlider: {
      defaultProps: {
        marks: true,
      },
      styleOverrides: {
        ios: {
          backgroundColor: "grey",
        },
        thumb: {
          backgroundColor: "blue",
        },
      },
    },
    AdaptiveSwitch: {
      defaultProps: {
        defaultChecked: true,
      },
      styleOverrides: {
        root: {
          [`& .${adaptiveSwitchClasses.switchBase}.${adaptiveSwitchClasses.checked} .${adaptiveSwitchClasses.thumb}`]:
            {
              backgroundColor: "red",
            },
        },
      },
    },
    AdaptiveTextField: {
      defaultProps: {
        helperText: "hi",
      },
      styleOverrides: {
        root: {
          borderBottom: "1px dashed blue",
        },
      },
    },
  },
});

export default function () {
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <AdaptiveButton>Button</AdaptiveButton>

        <AdaptiveButtonStack>
          <AdaptiveButton>Button</AdaptiveButton>
          <AdaptiveButton
            adaptiveMode="ios"
            className={adaptiveButtonStackClasses.alignLeft}
          >
            Stack
          </AdaptiveButton>
          <AdaptiveButton>Button</AdaptiveButton>
          <AdaptiveButton>Stack</AdaptiveButton>
        </AdaptiveButtonStack>

        <Stack direction="row" spacing={2}>
          <AdaptiveButton onClick={() => setOpen(1)}>Dialog 1</AdaptiveButton>
          <AdaptiveDialog
            adaptiveMode="ios"
            open={open === 1}
            onClose={() => setOpen(0)}
            variant="short"
          >
            <DialogTitle>Use Google's location service?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <AdaptiveDialogActions
              buttonDefaultProps={{ variant: "contained" }}
            >
              <AdaptiveButton>Button 1</AdaptiveButton>
              <AdaptiveButton>Button 2</AdaptiveButton>
            </AdaptiveDialogActions>
          </AdaptiveDialog>

          <AdaptiveButton onClick={() => setOpen(2)}>Dialog 2</AdaptiveButton>
          <AdaptiveDialog
            open={open === 2}
            onClose={() => setOpen(0)}
            variant="short"
          >
            <DialogTitle>Use Google's location service?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <AdaptiveDialogActions>
              <AdaptiveButton>Button</AdaptiveButton>
            </AdaptiveDialogActions>
          </AdaptiveDialog>
        </Stack>

        <Stack direction="row" spacing={2}>
          <AdaptiveButton
            onClick={(e) => setAnchorEl1((v) => (v ? null : e.currentTarget))}
          >
            Menu 1
          </AdaptiveButton>
          <AdaptiveMenu
            anchorEl={anchorEl1}
            onClose={() => setAnchorEl1(null)}
            open={anchorEl1 !== null}
          >
            <MenuItem>MenuItem 1</MenuItem>
            <MenuItem>MenuItem 2</MenuItem>
          </AdaptiveMenu>

          <AdaptiveButton
            onClick={(e) => setAnchorEl2((v) => (v ? null : e.currentTarget))}
          >
            Menu 2
          </AdaptiveButton>
          <AdaptiveMenu
            adaptiveMode="ios"
            anchorEl={anchorEl2}
            onClose={() => setAnchorEl2(null)}
            open={anchorEl2 !== null}
          >
            <MenuItem>MenuItem 1</MenuItem>
            <MenuItem>MenuItem 2</MenuItem>
          </AdaptiveMenu>
        </Stack>

        <AdaptiveSelect defaultValue={1}>
          <AdaptiveSelectItem value={1}>One</AdaptiveSelectItem>
          <AdaptiveSelectItem value={2}>Two</AdaptiveSelectItem>
        </AdaptiveSelect>

        <AdaptiveSlider defaultValue={30} />
        <AdaptiveSlider adaptiveMode="ios" defaultValue={30} />

        <Stack direction="row" spacing={2}>
          <AdaptiveSwitch />
          <AdaptiveSwitch adaptiveMode="ios" />
        </Stack>

        <Stack direction="row" spacing={2}>
          <AdaptiveTextField label="Standard" variant="standard" />
          <AdaptiveTextField label="Outlined" variant="outlined" />
          <AdaptiveTextField label="Filled" variant="filled" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <AdaptiveTextField
            adaptiveMode="ios"
            label="Standard"
            variant="standard"
          />
          <AdaptiveTextField
            adaptiveMode="ios"
            label="Outlined"
            variant="outlined"
          />
          <AdaptiveTextField
            adaptiveMode="ios"
            label="Filled"
            variant="filled"
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <AdaptiveCheckbox />
          <AdaptiveCheckbox adaptiveMode="ios" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <AdaptiveRadio />
          <AdaptiveRadio adaptiveMode="ios" />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
