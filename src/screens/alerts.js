import React, { Component } from "react";
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
  Button
} from "native-base";
export default class Alerts extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Icon name="ios-notifications" />
              </Left>
              <Body>
                <Text>Bitcoin at 1200</Text>
              </Body>
              <Right>
                <Button danger>
                  <Icon name="trash" />
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
