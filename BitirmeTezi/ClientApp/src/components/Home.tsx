import React, { useState} from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { connect } from "react-redux";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Row from "antd/lib/grid/row";
import { Content, Header } from "antd/lib/layout/layout";
import Button from "antd/lib/button";
import * as $ from "jquery";
import { TextArea } from "semantic-ui-react";

type MyState = { videoFile: File };
type MyProps = {};

class Home extends React.Component<MyProps, MyState> {
  playerRef: React.RefObject<HTMLVideoElement> = React.createRef();
  constructor(props: any) {
    super(props);
    this.extractAudio = this.extractAudio.bind(this);
    setInterval(() => this.extractAudio(),1000);

  }

  render() {
    return (
      <div>
        <Header style={{ backgroundColor: "white" }}>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            http-equiv="origin-trial"
            content="AtLtVZGc0GyPpERp+fbJoKTPrzA0JUfyRIa5d0W4aINRdEEOhEfON2f5l+MDf6TKV0WXf6oxcyzc9whibCzWXQQAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NjYxMzc1OTl9"
          ></meta>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <h1 style={{ color: "#1890ff" }}>Live Stream</h1>
          </Row>
        </Header>

        <Content>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <ReactHlsPlayer style={{width: "200%"}}
              src="http://20.54.150.204:8080/hls/test.m3u8"
              autoPlay={true}
              playerRef={this.playerRef}
              width="%100"
              height="auto"
              controls={true}
            />
          </Row>
          <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
          <Row style={{ width: "100%", justifyContent: "center", marginTop:"10px"}}>
              <p></p>
          </Row>
        </Content>
      </div>
    );
  }

  extractAudio() {
    var request = $.ajax({
      type: "GET",
      url: "https://localhost:44306/api/subtitle/getSubtitle"
    });
    request.done(function(res){
      // textArea?.innerText = res
      console.log(res);
    });
    request.fail(function(jqXHR){
      console.error(jqXHR)
    })
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
}

export default connect()(Home);
