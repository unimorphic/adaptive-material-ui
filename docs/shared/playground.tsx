import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { snackbarContentClasses } from "@mui/material/SnackbarContent";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AdaptiveButton,
  adaptiveButtonClasses,
} from "adaptive-material-ui/components/button";
import {
  AdaptiveButtonStack,
  adaptiveButtonStackClasses,
} from "adaptive-material-ui/components/buttonStack";
import { AdaptiveCheckbox } from "adaptive-material-ui/components/checkbox";
import { AdaptiveCircularProgress } from "adaptive-material-ui/components/circularProgress";
import {
  AdaptiveDialog,
  AdaptiveDialogActions,
  adaptiveDialogClasses,
} from "adaptive-material-ui/components/dialog";
import { AdaptiveFab } from "adaptive-material-ui/components/fab";
import { AdaptiveIconButton } from "adaptive-material-ui/components/iconButton";
import { AdaptiveLinearProgress } from "adaptive-material-ui/components/linearProgress";
import {
  AdaptiveMenu,
  adaptiveMenuClasses,
} from "adaptive-material-ui/components/menu";
import { AdaptiveRadio } from "adaptive-material-ui/components/radio";
import {
  AdaptiveSelect,
  AdaptiveSelectItem,
  AdaptiveSelectItemGroup,
} from "adaptive-material-ui/components/select";
import { AdaptiveSlider } from "adaptive-material-ui/components/slider";
import { AdaptiveSnackbar } from "adaptive-material-ui/components/snackbar";
import {
  AdaptiveSwitch,
  adaptiveSwitchClasses,
} from "adaptive-material-ui/components/switch";
import { AdaptiveTextField } from "adaptive-material-ui/components/textField";
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
      variants: [
        {
          props: (p) => p.variant === "contained",
          style: {
            backgroundColor: "blue",
          },
        },
      ],
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
      variants: [
        {
          props: (p) => p.spacing === 1,
          style: {
            backgroundColor: "lightgrey",
          },
        },
      ],
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
    AdaptiveCircularProgress: {
      defaultProps: {
        size: 50,
      },
      styleOverrides: {
        ios: {
          color: "pink",
        },
        root: {
          color: "orange",
        },
      },
      variants: [
        {
          props: (p) => p.size === 50,
          style: {
            backgroundColor: "blue",
          },
        },
      ],
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
    AdaptiveFab: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        ios: {
          color: "blue",
        },
        root: {
          color: "purple",
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
    AdaptiveIconButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        ios: {
          color: "blue",
        },
        root: {
          color: "red",
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
    AdaptiveLinearProgress: {
      defaultProps: {
        value: 75,
        variant: "determinate",
      },
      styleOverrides: {
        ios: {
          backgroundColor: "blue",
        },
        root: {
          backgroundColor: "red",
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
      variants: [
        {
          props: (p) => p.dense === true,
          style: {
            border: "1px solid green",
          },
        },
      ],
    },
    AdaptiveSelectItemGroup: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          backgroundColor: "grey",
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
    AdaptiveSnackbar: {
      defaultProps: {
        transitionDuration: 1000,
      },
      styleOverrides: {
        ios: {
          [`& .${snackbarContentClasses.root}`]: {
            color: "red",
          },
        },
        root: {
          [`& .${snackbarContentClasses.root}`]: {
            color: "purple",
          },
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
        variant: "filled",
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
        <AdaptiveButton variant="outlined">Button</AdaptiveButton>

        <AdaptiveButtonStack>
          <AdaptiveButton>Button</AdaptiveButton>
          <AdaptiveButton
            adaptiveMode="ios"
            className={adaptiveButtonStackClasses.alignStart}
          >
            Stack
          </AdaptiveButton>
          <AdaptiveButton>Button</AdaptiveButton>
          <AdaptiveButton>Stack</AdaptiveButton>
        </AdaptiveButtonStack>
        <AdaptiveButtonStack spacing={1}>
          <AdaptiveButton>Button</AdaptiveButton>
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

        <Stack direction="row" spacing={2}>
          <AdaptiveSelect defaultValue={1}>
            <AdaptiveSelectItem value={1}>One</AdaptiveSelectItem>
            <AdaptiveSelectItem value={2}>Two</AdaptiveSelectItem>
          </AdaptiveSelect>
          <AdaptiveSelect defaultValue={1}>
            <AdaptiveSelectItem value={1}>One</AdaptiveSelectItem>
            <AdaptiveSelectItemGroup label="Group">
              <AdaptiveSelectItem value={2}>Two</AdaptiveSelectItem>
              <AdaptiveSelectItem value={3}>Three</AdaptiveSelectItem>
            </AdaptiveSelectItemGroup>
          </AdaptiveSelect>
          <AdaptiveSelect adaptiveMode="ios" defaultValue={1}>
            <AdaptiveSelectItem value={1}>One</AdaptiveSelectItem>
            <AdaptiveSelectItemGroup label="Group">
              <AdaptiveSelectItem value={2}>Two</AdaptiveSelectItem>
              <AdaptiveSelectItem value={3}>Three</AdaptiveSelectItem>
            </AdaptiveSelectItemGroup>
          </AdaptiveSelect>
        </Stack>

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
        <Stack direction="row" spacing={2}>
          <AdaptiveFab>
            <AddIcon />
          </AdaptiveFab>
          <AdaptiveFab adaptiveMode="ios">
            <AddIcon />
          </AdaptiveFab>
        </Stack>

        <Stack direction="row" spacing={2}>
          <AdaptiveButton onClick={() => setOpen(3)}>Snackbar 1</AdaptiveButton>
          <AdaptiveSnackbar
            action={
              <AdaptiveIconButton
                size="small"
                color="inherit"
                onClick={() => setOpen(0)}
              >
                <CloseIcon fontSize="small" />
              </AdaptiveIconButton>
            }
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            message="Note archived"
            onClose={() => setOpen(0)}
            open={open === 3}
          />

          <AdaptiveButton onClick={() => setOpen(4)}>Snackbar 2</AdaptiveButton>
          <AdaptiveSnackbar
            action={
              <AdaptiveIconButton
                size="small"
                color="inherit"
                onClick={() => setOpen(0)}
              >
                <CloseIcon fontSize="small" />
              </AdaptiveIconButton>
            }
            adaptiveMode="ios"
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            message="Note archived"
            onClose={() => setOpen(0)}
            open={open === 4}
          />
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <AdaptiveIconButton>
            <PlayArrowIcon />
          </AdaptiveIconButton>
          <AdaptiveIconButton adaptiveMode="ios">
            <PlayArrowIcon />
          </AdaptiveIconButton>
          <AdaptiveIconButton variant="contained">
            <PlayArrowIcon />
          </AdaptiveIconButton>
          <AdaptiveIconButton adaptiveMode="ios" variant="contained">
            <PlayArrowIcon />
          </AdaptiveIconButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <AdaptiveCircularProgress />
          <AdaptiveCircularProgress adaptiveMode="ios" />
          <AdaptiveCircularProgress
            adaptiveMode="ios"
            value={50}
            variant="determinate"
          />
        </Stack>
        <Stack spacing={2}>
          <AdaptiveLinearProgress />
          <AdaptiveLinearProgress adaptiveMode="ios" />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
