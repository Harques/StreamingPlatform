import React from "react";
import { runInThisContext } from "vm";
import { StreamService } from "../api/StreamService";
import { Context } from "../helpers/Context";
import Row from "antd/lib/grid/row";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";

type MyState = { url : string};
type MyProps = {};

const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='1'>Oyun</Menu.Item>
      <Menu.Item key='2'>Sohbet</Menu.Item>
      <Menu.Item key='3'>Eğitim</Menu.Item>
    </Menu>
  );

function handleMenuClick(e: any) {
    message.info("Category has been changed.");
    console.log("click", e);
}
class Dashboard extends React.Component<MyProps, MyState> {
    streamService: StreamService    

    constructor(props: any) {
        super(props)
        this.streamService = new StreamService()
        this.checkIfStreamOpened()
    }

    render() {
        return(
            <>
            <Row
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "20px"
              }}
            >
              <div id='components-dropdown-demo-dropdown-button'>
                <Dropdown overlay={menu}>
                  <Button size='large'>
                    Yayın Kategorisi
                    <ArrowDropDownOutlinedIcon />
                  </Button>
                </Dropdown>
              </div>
            </Row>
            </>
        )
    }

    checkIfStreamOpened() {        
        const autoSaveInterval = setInterval(async () => {
            var bool = await this.streamService.checkIfStreamOpened()
            console.log(bool)
            if (bool) {
                this.streamService.startStream('Gaming')
                clearInterval(autoSaveInterval)                
            }
        }, 1000);
    }
}

export default Dashboard;