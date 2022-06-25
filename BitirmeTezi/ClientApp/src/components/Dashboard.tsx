import React from "react";
import { StreamService } from "../api/StreamService";
import Row from "antd/lib/grid/row";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";

type MyProps = {};
type MyState = {category: string, stream: boolean};

class Dashboard extends React.Component<MyProps, MyState> {
    streamService: StreamService    

    constructor(props: any) {
        super(props)
        this.streamService = new StreamService()

        var bool = localStorage.getItem('streamOpened') === 'true'
        if (bool)
          this.checkIfStreamClosed()
        else
          this.checkIfStreamOpened()
          
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.state = {
          category: 'Oyun',
          stream: bool
        }
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
              <h1>Yayın Kontrol Paneli</h1>
            </Row>
            <br/>
            <br/>
            <br/>
            <Row  style={{ width: "100%", justifyContent: "center" }} >
              {this.state.stream ? (<h3>Yayınınız açık</h3>) : (<h3>Yayınınız kapalı</h3>)}
            </Row>
            <br/>
            <br/>
            <Row  style={{ width: "100%", justifyContent: "center" }} >
                {this.state.stream ? <h5>OBS'ten yayınınızı durdurduktan sonra bu sayfanın güncellenmesi biraz zaman alacaktır.</h5>:<h3>Yayın Anahtarınız: {localStorage.getItem("key")}</h3>} 
            </Row>
            <Row  style={{ width: "100%", justifyContent: "center" }} >
                {this.state.stream ? <h5>Lütfen sayfayı kapatmayınız.</h5>:""} 
            </Row>
            <br/>
            <Row  style={{ width: "100%", justifyContent: "center" }} >
                {this.state.stream ? <h3></h3>:<h5>Bu yayın anahtarını kullanarak OBS üzerinden yayın yapabilirsiniz.</h5>} 
            </Row>
            <br/>
            <br/>
            <br/>
            <Row  style={{ width: "100%", justifyContent: "center" }} >
              {this.state.stream ? (<h3></h3>) : (<h3>Yayınızın kategorisi:</h3>)}
            </Row>
            <Row
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "20px"
              }}
            >
              {this.state.stream ? (<div></div>) : (<div id='components-dropdown-demo-dropdown-button'>
                <Dropdown overlay={this.menu}>
                  <Button size='large'>
                    {this.state.category}
                    <ArrowDropDownOutlinedIcon />
                  </Button>
                </Dropdown>
              </div>)}              
            </Row>
            <br/>
            <br/>
            <br/>
            <br/>
            </>
        )
    }

    checkIfStreamOpened() {        
        const interval = setInterval(async () => {
            if (await this.streamService.checkIfStreamOpened()) {
                this.streamService.startStream(this.state.category)
                this.setState({stream: true})
                this.checkIfStreamClosed()
                clearInterval(interval)                
            }
        }, 1000);
    }

    checkIfStreamClosed() {
      const interval = setInterval(async () => {
        if (await this.streamService.checkIfStreamClosed()) {
            var id = localStorage.getItem('streamId') as string
            this.streamService.endStream(+id)
            this.setState({stream: false})
            this.checkIfStreamOpened()
            clearInterval(interval)
        }
      }, 1000);
    }
}

export default Dashboard;