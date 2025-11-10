import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FormatTextDirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton, { iconButtonClasses } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled, ThemeOptions, useColorScheme } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { AdaptiveThemeProvider } from "adaptive-material-ui/theme/adaptiveThemeProvider";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, useDark } from "rspress/runtime";
import Theme from "rspress/theme";
import { prefixer } from "stylis";

function DarkModeMonitor() {
  const dark = useDark();
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(dark ? "dark" : "light");
  }, [dark, setMode]);

  return null;
}

const StyledStack = styled(Stack)(() => ({
  [`& .${iconButtonClasses.root}`]: {
    color: "var(--rp-c-text-2)",
  },
}));

const ltrCache = createCache({
  key: "ltr",
});
const rtlCache = createCache({
  key: "rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const sharedTheme: ThemeOptions = {
  colorSchemes: { dark: true },
  components: {
    AdaptiveDialog: {
      defaultProps: {
        container: document.getElementById("dialog-container"),
      },
    },
  },
};
const ltrTheme: ThemeOptions = {
  ...sharedTheme,
  direction: "ltr",
};
const rtlTheme: ThemeOptions = {
  ...sharedTheme,
  direction: "rtl",
};

function Layout() {
  const [isRtl, setIsRtl] = useState(false);
  const {
    theme,
    setTheme = () => {
      // Default to do nothing
    },
  } = useContext(ThemeContext);

  useEffect(() => {
    const direction = isRtl ? "rtl" : "ltr";

    const root = document.getElementById("root");
    if (root) {
      root.setAttribute("dir", direction);
    }
    const dialogContainer = document.getElementById("dialog-container");
    if (dialogContainer) {
      dialogContainer.setAttribute("dir", direction);
    }
  }, [isRtl]);

  return (
    <CacheProvider value={isRtl ? rtlCache : ltrCache}>
      <AdaptiveThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
        <DarkModeMonitor />
        <Theme.Layout
          afterNavMenu={
            <StyledStack direction="row" spacing={1}>
              <IconButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                title={theme === "light" ? "Toggle dark" : "Toggle light"}
              >
                {theme === "light" ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </IconButton>
              <IconButton
                onClick={() => setIsRtl((prevValue) => !prevValue)}
                title={isRtl ? "Toggle left to right" : "Toggle right to left"}
              >
                <FormatTextDirectionLToRIcon />
              </IconButton>
              <IconButton
                href="https://github.com/unimorphic/adaptive-material-ui"
                target="_blank"
                title="Github"
              >
                <GitHubIcon />
              </IconButton>
            </StyledStack>
          }
        />
      </AdaptiveThemeProvider>
    </CacheProvider>
  );
}

export default {
  ...Theme,
  Layout,
};

export * from "rspress/theme";
