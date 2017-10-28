import React, { Component } from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text
} from "native-base";

const fontAwesome = {
  iconFamily: "FontAwesome"
};

import Alerts from "./alerts";
import News from "./news";
import Rates from "./rates";

class Home extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-trending-up-outline" />
                <Text>Rates</Text>
              </TabHeading>
            }
          >
            <Rates />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-notifications-outline" />
                <Text>Alerts</Text>
              </TabHeading>
            }
          >
            <Alerts />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="logo-rss" />
                <Text>News</Text>
              </TabHeading>
            }
          >
            <News />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Home;
