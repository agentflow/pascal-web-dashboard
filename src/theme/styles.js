import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#54739C",
      200: "#54739C",
      300: "#54739C",
      400: "#54739C",
      500: "#54739C",
      600: "#54739C",
      700: "#54739C",
      800: "#54739C",
      900: "#54739C",
    },
    brandScheme: {
      100: "#54739C",
      200: "#54739C",
      300: "#54739C",
      400: "#54739C",
      500: "#54739C",
      600: "#54739C",
      700: "#54739C",
      800: "#54739C",
      900: "#54739C",
    },
    brandTabs: {
      100: "#54739C",
      200: "#54739C",
      300: "#54739C",
      400: "#54739C",
      500: "#54739C",
      600: "#54739C",
      700: "#54739C",
      800: "#54739C",
      900: "#54739C",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#54739C",
      500: "#54739C",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#54739C",
      100: "#54739C",
      200: "#54739C",
      300: "#54739C",
      400: "#54739C",
      500: "#54739C",
      600: "#54739C",
      700: "#54739C",
      800: "#54739C",
      900: "#54739C",
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
