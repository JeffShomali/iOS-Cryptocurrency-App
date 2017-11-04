import React, { Component } from "react";
import { Picker } from "react-native";
import {
  Container,
  Header,
  Content,
  ScrollView,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Card,
  CardItem,
  Segment,
  Title,
  Spinner
} from "native-base";

export default class Alerts extends Component {
  state = {
    isLoading: true,
    coinsData: null,
    segmentActive: "Bitcoin",
    bitcoinsAlerts: [6500],
    ethereumAlerts: [400],
    litcoinAlerts: [100]
  };

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          coinsData: responseJson
        });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  renderBitcoin() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }
    return this.state.coinsData.map(item => {
      return <Text note>{item.name}</Text>;
    });
  }

  renderCard(card = this.state.segmentActive) {
    switch (card) {
      case "Ethereum":
        this.renderEthereum();
        break;
      case "Litcoin":
        this.renderLitcoin();
        break;
      default:
        this.renderBitcoin();
        break;
    }
  }

  renderEthereum() {
    console.log(this.state.ethereumAlerts);
  }

  renderLitcoin() {
    console.log(this.state.litcoinAlerts);
  }

  segmentAction(tab) {
    switch (tab) {
      case "Litcoin":
        this.setState({ segmentActive: "Litcoin" });
        break;
      case "Ethereum":
        this.setState({ segmentActive: "Ethereum" });
        break;
      default:
        this.setState({ segmentActive: "Bitcoin" });
        break;
    }
  }

  render() {
    return (
      <Container>
        <Segment>
          <Button
            first
            active={this.state.segmentActive === "Bitcoin" ? true : false}
            onPress={() => this.segmentAction("Bitcoin")}
          >
            <Text>Bitcoin</Text>
          </Button>
          <Button
            active={this.state.segmentActive === "Ethereum" ? true : false}
            onPress={() => this.segmentAction("Ethereum")}
          >
            <Text>Ethereum</Text>
          </Button>
          <Button
            active={this.state.segmentActive === "Litcoin" ? true : false}
            onPress={() => this.segmentAction("Litcoin")}
          >
            <Text>Litcoin</Text>
          </Button>
        </Segment>

        <Content padder>{this.renderCard()}</Content>
      </Container>
    );
  }
}
