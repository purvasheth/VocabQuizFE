import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, QuizProvider, BookmarkProvider } from "./contexts";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <ChakraProvider>
    <AuthProvider>
      <BookmarkProvider>
        <QuizProvider>
          <Router>
            <App />
          </Router>
        </QuizProvider>
      </BookmarkProvider>
    </AuthProvider>
  </ChakraProvider>,
  rootElement
);
