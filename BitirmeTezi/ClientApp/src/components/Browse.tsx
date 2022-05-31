import { Tabs } from "antd";
import React from "react";
import Gallery from "react-photo-gallery";
import { photos } from "./photos";
import { photos2 } from "./photos2";
import { photos3 } from "./photos3";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

function columns(containerWidth: number) {
  let columns = 1;
  if (containerWidth >= 500) columns = 2;
  if (containerWidth >= 900) columns = 3;
  if (containerWidth >= 1500) columns = 4;
  return columns;
}

class Browse extends React.Component<{}> {
  render() {
    return (
      <Tabs
        defaultActiveKey='1'
        onChange={callback}
        centered
        size='large'
        type='card'
      >
        <TabPane tab='Gaming' key='1'>
          <h2 style={{ textAlign: "center" }}>Gaming Streams</h2>
          <div>
            <Gallery photos={photos} columns={columns} direction='column' />
          </div>
        </TabPane>
        <TabPane tab='Chat' key='3'>
          <h2 style={{ textAlign: "center" }}>Chat Streams</h2>
          <div>
            <Gallery photos={photos2} columns={columns} direction='column' />
          </div>
        </TabPane>
        <TabPane tab='Education' key='2'>
          <h2 style={{ textAlign: "center" }}>Education Streams</h2>
          <div>
            <Gallery photos={photos3} columns={columns} direction='column' />
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

export default Browse;
