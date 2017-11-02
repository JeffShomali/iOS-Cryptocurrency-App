var DOMParser = require("xmldom").DOMParser;
var REQUEST_URL = "https://feeds.feedburner.com/CoinDesk";
var moment = require("moment");

import React, { Component } from "react";
import { ScrollView, Linking, Button } from "react-native";
import { Router, Scene } from "react-native-router-flux";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Spinner,
  ListItem,
  List,
  Left,
  Right,
  Icon
} from "native-base";

var parseString = require("react-native-xml2js").parseString;

export default class News extends Component {
  state = {
    isLoading: true,
    feeds: null,
    dataSource: null
  };

  componentDidMount() {
    this.fetchData();
  }

  extractData(text) {
    var doc = new DOMParser().parseFromString(text, "text/xml");
    var items_array = [];
    var items = doc.getElementsByTagName("item");

    for (var i = 0; i < items.length; i++) {
      items_array.push({
        title: items[i].getElementsByTagName("title")[0].lastChild.data,
        link: items[i].getElementsByTagName("link")[0].lastChild.data,
        date: items[i].getElementsByTagName("pubDate")[0].lastChild.data,
        description: items[i].getElementsByTagName("description")[0].lastChild
          .data
      });
    }

    return items_array;
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.text())
      .then(responseData => {
        this.setState({
          dataSource: this.extractData(responseData),
          isLoading: false
        });
      })
      .done();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }
    let items = this.state.dataSource;

    return (
      <Container>
        <Content>
          {items.map((item, i) => (
            <Card key={i}>
              <CardItem header>
                <Text>{item.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text note>{item.description}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Left>
                  <Text note onPress={() => Linking.openURL(item.link)}>
                    more...
                  </Text>
                </Left>
                <Right>
                  <Text note>{moment(item.date).fromNow()} </Text>
                </Right>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}
