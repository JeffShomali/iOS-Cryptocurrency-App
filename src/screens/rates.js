import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail,
  Image,
  Button,
  Spinner
} from "native-base";

import { Font } from "expo";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../selection.json";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "FontName");
const iconColors = require("../assets/Js/colors.json");
import _ from "lodash";

class Rates extends Component {
  state = {
    isLoading: true,
    coinsData: null,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      FontName: require("../assets/fonts/CoinsIcons.ttf")
    });
    this.setState({ fontLoaded: true });

    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=200")
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

  iconColor(symbol) {
    const value = _.filter(iconColors, { symbol: symbol });
    if (value.length > 0) {
      return <Icon name={value[0].symbol} size={30} color={value[0].color} />;
    } else {
      return <Icon name={"BTC"} size={30} color="gray" />;
    }
  }

  renderList() {
    let items = this.state.coinsData;
    return items.map((item, i) => {
      const { symbol, price_usd, percent_change_24h, market_cap_usd } = item;
      return (
        <List>
          <ListItem avatar key={symbol}>
            <Left>
              {this.iconColor(symbol)}
              <Text>{symbol}</Text>
            </Left>
            <Body>
              <Text note>${price_usd}</Text>
              <Text note>24hr {percent_change_24h}</Text>
            </Body>
            <Right>
              <Text note>${price_usd}</Text>
              <Text>${market_cap_usd}</Text>
            </Right>
          </ListItem>
        </List>
      );
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }

    return (
      <Container>
        <ScrollView>{this.renderList()}</ScrollView>
      </Container>
    );
  }
}

export default Rates;
