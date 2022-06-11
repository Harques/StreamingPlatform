import React from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { connect } from "react-redux";
import Row from "antd/lib/grid/row";
import { Content, Header } from "antd/lib/layout/layout";
import Col from "antd/lib/grid/col";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { Subtitles } from "@material-ui/icons";
import NavMenu from "./NavMenu";
import { Context } from "../helpers/Context";

type MyState = { videoFile: File };
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
    span.textContent = subtitle;
  } else {
    span.textContent = " ";
  }
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='1'>Gaming</Menu.Item>
    <Menu.Item key='2'>Chat</Menu.Item>
    <Menu.Item key='3'>Education</Menu.Item>
  </Menu>
);

class Home extends React.Component<MyProps, MyState> {
  playerRef: React.RefObject<HTMLVideoElement> = React.createRef();
  socket!: WebSocket;
  context: Context;
  constructor(props: any) {
    super(props);
    this.extractAudio = this.extractAudio.bind(this);
    this.prepareWebSocket = this.prepareWebSocket.bind(this);
    this.prepareWebSocket();
    setInterval(() => this.extractAudio(), 1000);
    this.context = Context.getInstance()
    if (this.context.getCurrentUser() !== undefined)
      console.log(this.context.getCurrentUser().email)
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
                src='http://20.101.175.16:8080/hls/test.m3u8'
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

  extractAudio() {
    /*var request = $.ajax({
      type: "GET",
      url: "http://20.101.164.72/api/subtitle/getSubtitle"
    });
    request.done(function (res) {
      // textArea?.innerText = res
      console.log(res);
    });
    request.fail(function(jqXHR){
      console.error(jqXHR)
    })*/
    if (!this.socket || this.socket.readyState != WebSocket.OPEN) return;
    this.socket.send("hey");
    //   const ffmpeg = createFFmpeg({
    //     corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    //     log: true,
    //   });
    //   await ffmpeg.load();
    //   ffmpeg.FS(
    //     "writeFile",
    //     "input.ts",
    //     await fetchFile("http://20.54.150.204:8080/hls/test-8.ts")
    //   );
    //   await ffmpeg.run(
    //     "-i",
    //     "input.ts",
    //     "-vn",
    //     "-acodec",
    //     "copy",
    //     "output-audio.aac"
    //   );
    //   const data = ffmpeg.FS("readFile", "output-audio.aac");
    //   const element = document.createElement("a");
    //   const file = new Blob([data.buffer]);
    //   element.href = URL.createObjectURL(file);
    //   element.download = "output-audio.aac";
    //   document.body.appendChild(element); // Required for this to work in FireFox
    //   element.click();
  }

  prepareWebSocket() {
    //this.socket = new WebSocket("ws://20.50.189.17/subtitle");
    this.socket = new WebSocket("ws://localhost:5000/subtitle");
    this.socket.onopen = (e) => {
      console.log("connected", e);
    };
    this.socket.onclose = (e) => {
      console.log("Disonnected", e);
    };
    this.socket.onerror = (e) => {
      console.log(e);
    };
    this.socket.onmessage = (e) => {
      console.log(e.data);
      getSubtitleText(e.data);
    };
  }
}

export default connect()(Home);
