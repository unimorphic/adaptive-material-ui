import Stack from "@mui/material/Stack";
import { createTheme, PaletteOptions } from "@mui/material/styles";
import { AdaptiveButton } from "adaptive-material-ui/components/button";
import { AdaptiveButtonStack } from "adaptive-material-ui/components/buttonStack";
import { AdaptiveTextField } from "adaptive-material-ui/components/textField";
import { addMissingColorsToPalette } from "adaptive-material-ui/theme/adaptiveThemeProvider";
import { AdaptiveTheme } from "adaptive-material-ui/theme/adaptiveThemeProviderMin";
import JSON5 from "json5";
import { useState } from "react";

const requiredProps: PaletteOptions = {
  background: {
    container: { lowest: "", low: "", main: "", high: "", highest: "" },
  },
  dividerSecondary: "",
  inverse: { background: "", contrastText: "" },
  primary: { container: "", containerContrastText: "", main: "" },
  secondary: { container: "", containerContrastText: "", main: "" },
  error: { container: "", containerContrastText: "", main: "" },
  warning: { container: "", containerContrastText: "", main: "" },
  info: { container: "", containerContrastText: "", main: "" },
  success: { container: "", containerContrastText: "", main: "" },
};

function getPaletteProps(
  originalObject: Record<string, unknown> | undefined,
  convertedObject: Record<string, unknown>,
  requiredPropsObject: Record<string, unknown> | undefined,
) {
  originalObject ??= {};
  requiredPropsObject ??= {};

  const newObject: Record<string, unknown> = {};

  const allKeys = Object.keys(originalObject).concat(
    Object.keys(requiredPropsObject),
  );

  for (const key of allKeys) {
    const convertedValue = convertedObject[key];

    newObject[key] =
      convertedValue && typeof convertedValue === "object"
        ? getPaletteProps(
            originalObject[key] as Record<string, unknown>,
            convertedValue as Record<string, unknown>,
            requiredPropsObject[key] as Record<string, unknown>,
          )
        : convertedValue;
  }
  return newObject;
}

function convertJson(palette: Partial<PaletteOptions>) {
  const theme = createTheme({ palette: palette }) as AdaptiveTheme;

  addMissingColorsToPalette(theme.palette, theme);

  const newPalette = getPaletteProps(
    palette,
    theme.palette as unknown as Record<string, unknown>,
    requiredProps as Record<string, unknown>,
  );

  return JSON5.stringify(newPalette, undefined, 2);
}

function validateJson(json: string) {
  try {
    const parsed = JSON5.parse<Partial<PaletteOptions> | undefined>(json);

    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
}

export default function ThemeGenerator() {
  const [themeJson, setThemeJson] = useState("");
  const [themePalette, setThemePalette] = useState("");
  const [error, setError] = useState("");

  function onClickConvert() {
    const result = validateJson(themeJson);

    if (!result) {
      setError(
        "Unable to parse the provided palette. Please ensure it's in the format { primary: { main: string } }",
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
        label="Theme Palette"
        multiline
        onChange={(e) => setThemeJson(e.target.value)}
        rows={6}
        value={themeJson}
      />
      <AdaptiveButtonStack>
        <AdaptiveButton onClick={onClickConvert} variant="contained">
          Generate
        </AdaptiveButton>
      </AdaptiveButtonStack>
      {themePalette ? (
        <AdaptiveTextField
          fullWidth
          label="Updated Theme Palette"
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
