import Stack from "@mui/material/Stack";
import { PaletteOptions } from "@mui/material/styles";
import { AdaptiveButton } from "adaptive-material-ui/components/button";
import { AdaptiveButtonStack } from "adaptive-material-ui/components/buttonStack";
import { AdaptiveTextField } from "adaptive-material-ui/components/textField";
import { useState } from "react";

interface MaterialTheme {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  surface: string;
  onSurface: string;
  onSurfaceVariant: string;

  outline: string;
  outlineVariant: string;

  inverseSurface: string;
  inverseOnSurface: string;

  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

function convertColor(
  theme: MaterialTheme,
  color: "Error" | "Primary" | "Secondary",
) {
  const colorLowercase = color.toLowerCase() as Lowercase<typeof color>;

  return {
    container: theme[`${colorLowercase}Container`],
    containerContrastText: theme[`on${color}Container`],
    contrastText: theme[`on${color}`],
    main: theme[colorLowercase],
  };
}

// https://m3.material.io/styles/color/roles
// https://m3.material.io/styles/color/static/baseline
function convertJson(theme: MaterialTheme) {
  const palette: PaletteOptions = {
    background: {
      container: {
        lowest: theme.surfaceContainerLowest,
        low: theme.surfaceContainerLow,
        main: theme.surfaceContainer,
        high: theme.surfaceContainerHigh,
        highest: theme.surfaceContainerHighest,
      },
      default: theme.surface,
      paper: theme.surfaceContainerHighest,
    },
    divider: theme.outlineVariant,
    dividerSecondary: theme.outline,
    error: convertColor(theme, "Error"),
    inverse: {
      background: theme.inverseSurface,
      contrastText: theme.inverseOnSurface,
    },
    primary: convertColor(theme, "Primary"),
    secondary: convertColor(theme, "Secondary"),
    text: {
      primary: theme.onSurface,
      secondary: theme.onSurfaceVariant,
    },
  };

  return JSON.stringify(palette, undefined, 2);
}

function validateJson(json: string) {
  try {
    const parsed = JSON.parse(json) as MaterialTheme | undefined;

    if (parsed && typeof parsed === "object" && parsed.primary) {
      return parsed;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
}

export default function ThemeConverter() {
  const [themeJson, setThemeJson] = useState("");
  const [themePalette, setThemePalette] = useState("");
  const [error, setError] = useState("");

  function onClickConvert() {
    const result = validateJson(themeJson);

    if (!result) {
      setError(
        'Unable to parse the provided JSON. Please ensure it\'s in the format { "primary": string; }',
      );
      setThemePalette("");
      return;
    }

    setError("");
    setThemePalette(convertJson(result));
  }

  return (
    <Stack spacing={1} sx={{ marginTop: 3 }}>
      <AdaptiveTextField
        error={error.length > 0}
        fullWidth
        helperText={error}
        label="Theme JSON"
        multiline
        onChange={(e) => setThemeJson(e.target.value)}
        rows={6}
        value={themeJson}
      />
      <AdaptiveButtonStack>
        <AdaptiveButton onClick={onClickConvert} variant="contained">
          Convert
        </AdaptiveButton>
      </AdaptiveButtonStack>
      {themePalette ? (
        <AdaptiveTextField
          fullWidth
          label="Theme Palette"
          multiline
          rows={6}
          slotProps={{
            input: { readOnly: true },
            inputLabel: { shrink: true },
          }}
          value={themePalette}
        />
      ) : null}
    </Stack>
  );
}
