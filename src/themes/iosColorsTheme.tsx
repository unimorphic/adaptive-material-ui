import { createTheme } from "@mui/material/styles";
import { switchClasses } from "@mui/material/Switch";

const iosColorsTheme = createTheme({
  components: {
    AdaptiveSwitch: {
      styleOverrides: {
        ios: {
          [`& .${switchClasses.track}`]: {
            backgroundColor: "rgba(120, 120, 120, 0.2)",
            opacity: 1,
          },
          [`& .${switchClasses.switchBase}.${switchClasses.checked} + .${switchClasses.track}`]:
            {
              backgroundColor: "rgba(52, 199, 89, 1)",
            },

          variants: [
            {
              props: (props) => props.theme.palette.mode === "dark",
              style: {
                [`& .${switchClasses.track}`]: {
                  backgroundColor: "rgba(120, 120, 128, 0.36)",
                },
                [`& .${switchClasses.switchBase}.${switchClasses.checked} + .${switchClasses.track}`]:
                  {
                    backgroundColor: "rgba(48, 209, 88, 1)",
                  },
              },
            },
          ],
        },
      },
    },
  },
});

export default iosColorsTheme;
