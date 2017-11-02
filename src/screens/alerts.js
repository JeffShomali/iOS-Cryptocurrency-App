import React, { Component } from "react";
import { Picker } from "react-native";
import {
  Container,
  Header,
  Content,
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
  CardItem
} from "native-base";
export default class Alerts extends Component {
  state = {
    language: null
  };

  render() {
    return (
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>//Your text here</Text>
            </Body>
            <Body>
              <Picker
                selectedValue={this.state.language}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
