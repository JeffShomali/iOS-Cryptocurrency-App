import React from "react";
import { StyleSheet, View } from "react-native";
import { Container } from "native-base";
import Home from "./src/screens/home";

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Home />
      </Container>
    );
  }
}
