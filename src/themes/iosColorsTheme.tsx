import { sliderClasses } from "@mui/material/Slider";
import { createTheme } from "@mui/material/styles";
import { switchClasses } from "@mui/material/Switch";

const iosColorsTheme = createTheme({
  components: {
    AdaptiveSlider: {
      styleOverrides: {
        ios: {
          [`& .${sliderClasses.mark}`]: {
            backgroundColor: "rgba(60, 60, 67, 0.18)",
          },
          [`& .${sliderClasses.rail}`]: {
            backgroundColor: "rgba(120, 120, 120, 0.2)",
          },
          [`& .${sliderClasses.track}`]: {
            backgroundColor: "rgba(0, 136, 255, 1)",
          },
          variants: [
            {
              props: (props) => props.theme.palette.mode === "dark",
              style: {
                [`& .${sliderClasses.mark}`]: {
                  backgroundColor: "rgba(235, 235, 245, 0.16)",
                },
                [`& .${sliderClasses.rail}`]: {
                  backgroundColor: "rgba(120, 120, 128, 0.36)",
                },
                [`& .${sliderClasses.track}`]: {
                  backgroundColor: "rgba(0, 145, 255, 1)",
                },
              },
            },
          ],
        },
      },
    },
    AdaptiveSwitch: {
      styleOverrides: {
        ios: {
          [`& .${switchClasses.track}`]: {
            backgroundColor: "#28282C",
            opacity: 1,
          },
          [`& .${switchClasses.switchBase}.${switchClasses.checked}`]: {
            color: "rgba(52, 199, 89, 1)",

            [`& + .${switchClasses.track}`]: {
              backgroundColor: "rgba(52, 199, 89, 1)",
            },
          },
          variants: [
            {
              props: (props) => props.theme.palette.mode === "dark",
              style: {
                [`& .${switchClasses.track}`]: {
                  backgroundColor: "#5D5D62",
                },
                [`& .${switchClasses.switchBase}.${switchClasses.checked}`]: {
                  color: "rgba(48, 209, 88, 1)",

                  [`& + .${switchClasses.track}`]: {
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
