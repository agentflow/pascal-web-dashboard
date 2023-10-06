import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#274C77",
      200: "#274C77",
      300: "#274C77",
      400: "#274C77",
      500: "#274C77",
      600: "#274C77",
      700: "#274C77",
      800: "#274C77",
      900: "#274C77",
    },
    brandScheme: {
      100: "#274C77",
      200: "#274C77",
      300: "#274C77",
      400: "#274C77",
      500: "#274C77",
      600: "#274C77",
      700: "#274C77",
      800: "#274C77",
      900: "#274C77",
    },
    brandTabs: {
      100: "#274C77",
      200: "#274C77",
      300: "#274C77",
      400: "#274C77",
      500: "#274C77",
      600: "#274C77",
      700: "#274C77",
      800: "#274C77",
      900: "#274C77",
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
      50: "#274C77",
      500: "#274C77",
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
      50: "#274C77",
      100: "#274C77",
      200: "#274C77",
      300: "#274C77",
      400: "#274C77",
      500: "#274C77",
      600: "#274C77",
      700: "#274C77",
      800: "#274C77",
      900: "#274C77",
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
