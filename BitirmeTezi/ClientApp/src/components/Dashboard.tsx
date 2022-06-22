import React from "react";
import { runInThisContext } from "vm";
import { StreamService } from "../api/StreamService";
import { Context } from "../helpers/Context";
import Row from "antd/lib/grid/row";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";

type MyProps = {};



class Dashboard extends React.Component<MyProps> {
    streamService: StreamService    

    constructor(props: any) {
        super(props)
        this.streamService = new StreamService()
        this.checkIfStreamOpened()
        this.state = {category : "Yayın Kategorisi"}
        this.handleMenuClick = this.handleMenuClick.bind(this)
      }
      handleMenuClick = (e : any) => {
        this.setState({category: this.menu.props.children[e.key-1].props.children})
      }
      menu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key='1'>Oyun</Menu.Item>
          <Menu.Item key='2'>Sohbet</Menu.Item>
          <Menu.Item key='3'>Eğitim</Menu.Item>
        </Menu>
      );


    render() {
        return(
            <>
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <h2
              >Yayın Kontrol Paneli</h2>
            </Row>
            <Row
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "20px"
              }}
            >
              <div id='components-dropdown-demo-dropdown-button'>
                <Dropdown overlay={this.menu}>
                  <Button size='large'>
                    {this.state.category}
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
                this.streamService.startStream(this.state.category)
                clearInterval(autoSaveInterval)                
            }
        }, 1000);
    }
}

export default Dashboard;