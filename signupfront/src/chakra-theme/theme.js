import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        inverse: {
          bg: "black",
          color: "green.300",
        },
      },
      defaultProps: {
        colorScheme: "green", // default is gray
      },
    },
  },
});

export default theme;
