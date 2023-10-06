import { mode } from "@chakra-ui/theme-tools";
export const sliderStyles = {
  components: {
    RangeSlider: {
      // baseStyle: {
      //   thumb: {
      //     fontWeight: 400,
      //   },
      //   track: {
      //     display: "flex",
      //   },
      // },

      variants: {
        main: (props) => ({
          thumb: {
            bg: mode("#274C77", "brand.400")(props),
          },
        }),
      },
    },
  },
};
