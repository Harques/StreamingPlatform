import { Col, Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

class Browse extends React.Component<{}> {
  render() {
    return (
      <Tabs defaultActiveKey='1' onChange={callback} centered size='large'>
        <TabPane tab='Gaming' key='1'>
          <h2 style={{textAlign:'center'}}>Gaming Streams</h2>
        </TabPane>
        <TabPane tab='Chat' key='3'>
          <h2 style={{textAlign:'center'}}>Chat Streams</h2>
        </TabPane>
        <TabPane tab='Education' key='2'>
          <h2 style={{textAlign:'center'}}>Education Streams</h2>
        </TabPane>
      </Tabs>
    );
  }
}

export default Browse;
