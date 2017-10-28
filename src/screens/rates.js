import React, { Component } from "react";
import { ScrollView } from "react-native";
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
  Icon,
  Spinner
} from "native-base";

const getCoinsData = () => {
  return axios
    .get("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100")
    .then(response => response.text())
    .then(responseText => {
      return responseText;
    })
    .catch(err => {
      return err;
    });
};

class Rates extends Component {
  state = {
    isLoading: true,
    coinsData: null
  };

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100")
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

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }
    let items = this.state.coinsData;
    console.log(items);
    return (
      <Container>
        <ScrollView>
          <List>
            {items.map((item, i) => (
              <ListItem avatar key={i}>
                <Left>
                  <Text>{item.symbol}</Text>
                </Left>
                <Body>
                  <Text> ${item.price_usd}</Text>
                  <Text note>24hr {item.percent_change_24h}</Text>
                </Body>
                <Right>
                  <Text note>${item.price_usd}</Text>
                  <Text>${item.market_cap_usd}</Text>
                </Right>
              </ListItem>
            ))}
          </List>
        </ScrollView>
      </Container>
    );
  }
}

export default Rates;
