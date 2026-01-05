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
import {
  createTheme,
  styled,
  ThemeOptions,
  useColorScheme,
} from "@mui/material/styles";
// eslint-disable-next-line no-restricted-imports
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { AdaptiveThemeProvider } from "adaptive-material-ui/theme/adaptiveThemeProvider";
import type {} from "adaptive-material-ui/theme/themeAugmentation";
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
};
const ltrTheme = createTheme({
  ...sharedTheme,
  direction: "ltr",
});
const rtlTheme = createTheme({
  ...sharedTheme,
  direction: "rtl",
});

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

    const root = window.document.getElementById("root");
    if (root) {
      root.setAttribute("dir", direction);
    }
    window.document.body.style.direction = direction;
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
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeIcon />
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
