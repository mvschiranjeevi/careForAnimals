import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "./theme";

const Provider = (props) => {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
};

export default Provider;
