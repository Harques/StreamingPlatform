import React from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { connect } from "react-redux";
import Row from "antd/lib/grid/row";
import { Content, Header } from "antd/lib/layout/layout";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { Subtitles } from "@material-ui/icons";
import NavMenu from "./NavMenu";
import { Context } from "../helpers/Context";
import { AuthService } from '../api/AuthService';
import { StreamService } from "../api/StreamService";
import { copyFile } from "fs";

type MyState = {url: string, streamId: string};
type MyProps = {};

function handleMenuClick(e: any) {
  message.info("Category has been changed.");
  console.log("click", e);
}

function displaySubtitles() {
  var subtitle = document.getElementById("subtitle")!;
  if (subtitle.style.opacity === "1") {
    subtitle.style.opacity = "0";
  } else {
    subtitle.style.opacity = "1";
  }
}

function getSubtitleText(textData: string | null) {
  let span = document.getElementById("subtitle")!;
  if (textData != null) {
    var strArray = textData.split(" ");
    while (strArray.length > 8) {
      strArray.splice(0, 1);
    }
    var subtitle = strArray.join(" ");
    if (subtitle.length > 0)
      span.textContent = subtitle;
  } else {
    span.textContent = " ";
  }
}


const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='1'>Oyun</Menu.Item>
    <Menu.Item key='2'>Sohbet</Menu.Item>
    <Menu.Item key='3'>Eğitim</Menu.Item>
  </Menu>
);

class Home extends React.Component<MyProps, MyState> {
  streamService: StreamService; 
  playerRef: React.RefObject<HTMLVideoElement> = React.createRef();
  socket!: WebSocket;
  context: Context;

  constructor(props: any) {
    super(props);
    this.getUrl = this.getUrl.bind(this);
    this.prepareWebSocket = this.prepareWebSocket.bind(this);
    this.sendRequest = this.sendRequest.bind(this) 
    this.streamService = new StreamService();
    this.context = Context.getInstance()
    if (this.context.getCurrentUser() !== undefined)
      console.log(this.context.getCurrentUser().email)
      this.setState({
        url : ''
      })
 
  }

  async componentWillMount(){
    await this.getUrl()
  }
  

render() { 
    return (
      <React.Fragment>
        <NavMenu />
        <Header style={{ backgroundColor: "white" }}>
          <meta charSet='UTF-8' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta
            http-equiv='origin-trial'
            content='AtLtVZGc0GyPpERp+fbJoKTPrzA0JUfyRIa5d0W4aINRdEEOhEfON2f5l+MDf6TKV0WXf6oxcyzc9whibCzWXQQAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NjYxMzc1OTl9'
          ></meta>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <h1 style={{ color: "#1890ff" }}>Canlı Yayın</h1>
          </Row>
        </Header>

        <Content>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <ReactHlsPlayer
                id="player"
                src={this.state ? "http://20.56.240.145:8080/hls/" + this.state.url + ".m3u8" : "http://20.56.240.145:8080/hls/test.m3u8"}
                autoPlay={true}
                playerRef={this.playerRef}
                width='1500px'
                height='auto'
                controls={true}
                style={{
                  position: "relative",
                }}
              />
            </div>
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
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <p
                style={{
                  position: "relative",
                  top: "-9.5rem",
                  backgroundColor: "rgba(0,0,0,.75)",
                  color: "rgba(255,255,255,1)",
                  fontSize: "xx-large",
                  paddingRight: "0.5rem",
                  paddingLeft: "0.5rem",
                  display: "block",
                  opacity: "1"
                }}
                id='subtitle'
              ></p>
            </Row>
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Tooltip placement='left' title='Altyazı'>
                <Subtitles
                  style={{
                    position: "relative",
                    top: "-28rem",
                    right: "-36.2rem",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,.4)",
                  }}
                  onClick={displaySubtitles}
                />
              </Tooltip>
            </Row>
          </Row>
          <script src='https://cdn.jsdelivr.net/npm/hls.js@latest'></script>
        </Content>
      </React.Fragment>
    );
  }

  async getUrl() {
    const location = window.location.pathname;
    var path = location.split("/").pop()
    if(typeof path === 'string'){
      var response = await this.streamService.getStreamKey(path)
      if(response.length > 0) {
        this.setState({url : response[0], streamId: response[1]})
        this.prepareWebSocket()
      }
    }
  }

  prepareWebSocket() {        
    this.socket = new WebSocket("wss://localhost:44306/subtitle");
    this.socket.onopen = (e) => {
      console.log("connected", e);
    };
    this.socket.onclose = (e) => {
      console.log("Disconnected", e);
    };
    this.socket.onerror = (e) => {
      console.log("Error", e);
    };
    this.socket.onmessage = (e) => {
      console.log(e.data);
      getSubtitleText(e.data);
    };    
    setInterval(() => this.sendRequest(), 1000);
  }

  sendRequest() {
    if (!this.socket || this.socket.readyState != WebSocket.OPEN) return
    this.socket.send(this.state.streamId)
  }
}

export default connect()(Home);
