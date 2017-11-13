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
  Spinner,
  SwipeRow,
  View
} from "native-base";

export default class Alerts extends Component {
  state = {
    isLoading: true,
    coinsData: null,
    segmentActive: "Bitcoin",
    bitcoinsAlerts: [6500, 6600],
    ethereumAlerts: [400, 500],
    litcoinAlerts: [100, 200]
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

  renderAlertsListItems(symbol) {
    var items = symbol;
    console.log(items);
    return items.map(item => {
      <ListItem avatar>
        <Left>
          <Text>{item}</Text>
        </Left>
        <Body>
          <Text note>24hr {item}</Text>
        </Body>
        <Right>
          <Text note>${item}</Text>
        </Right>
      </ListItem>;
    });
  }

  renderCard() {
    let card = this.state.segmentActive;
    switch (card) {
      case "Ethereum":
        return this.renderAlertsListItems(this.state.ethereumAlerts);
        break;
      case "Litcoin":
        return this.renderAlertsListItems(this.state.litcoinAlerts);
        break;
      case "Bitcoin":
        return this.renderAlertsListItems(this.state.bitcoinsAlerts);
        break;
      default:
        console.log("Nothing clicked");
        return this.renderAlertsListItems(this.state.bitcoinsAlerts);
        break;
    }
  }

  segmentAction(tab) {
    switch (tab) {
      case "Bitcoin":
        this.setState({ segmentActive: "Bitcoin" });
        break;
      case "Ethereum":
        this.setState({ segmentActive: "Ethereum" });
        break;
      case "Litcoin":
        this.setState({ segmentActive: "Litcoin" });
        break;
      default:
        console.log("Default Bitcoin");
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
        <Content>
          {this.renderCard()}
          <Button block iconLeft info onPress={() => alert("Loading ...")}>
            <Icon name="add" />
            <Text>Create Alert</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
