import { createTheme } from "@mui/material/styles";
import { switchClasses } from "@mui/material/Switch";

const iosColorsTheme = createTheme({
  components: {
    AdaptiveSwitch: {
      styleOverrides: {
        ios: {
          [`& .${switchClasses.switchBase}:before, & .${switchClasses.track}`]:
            {
              backgroundColor: "#1C1C1F",
            },
          [`& .${switchClasses.switchBase}.${switchClasses.checked}`]: {
            [`&:before, & + .${switchClasses.track}`]: {
              backgroundColor: "rgba(52, 199, 89, 1)",
            },
          },

          variants: [
            {
              props: (props) => props.theme.palette.mode === "dark",
              style: {
                [`& .${switchClasses.switchBase}:before, & .${switchClasses.track}`]:
                  {
                    backgroundColor: "#515155",
                  },
                [`& .${switchClasses.switchBase}.${switchClasses.checked}`]: {
                  [`&:before, & + .${switchClasses.track}`]: {
                    backgroundColor: "rgba(48, 209, 88, 1)",
                  },
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
