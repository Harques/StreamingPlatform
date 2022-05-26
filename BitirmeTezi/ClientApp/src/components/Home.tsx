import * as React from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import FileSaver, { saveAs } from 'file-saver';

type MyState = {videoFile: File}
type MyProps = {}

class Home extends React.Component<MyProps, MyState> {
  playerRef: React.RefObject<HTMLVideoElement> = React.createRef();  

  constructor(props: any) {
    super(props)
    this.extractAudio = this.extractAudio.bind(this)    
  }

  render() {
    return (
      <div>
        <head>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="origin-trial" content="AtLtVZGc0GyPpERp+fbJoKTPrzA0JUfyRIa5d0W4aINRdEEOhEfON2f5l+MDf6TKV0WXf6oxcyzc9whibCzWXQQAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NjYxMzc1OTl9"></meta>
          <title>Live Stream</title>
        </head>
        <body>
          <h2>Live Stream</h2>
          <ReactHlsPlayer src="http://20.54.150.204:8080/hls/test.m3u8" autoPlay={true} playerRef={this.playerRef} width="%100" height="auto" controls={true} />
          <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>           
          { /* <!-- Or if you want a more recent alpha version --> */ }
          { /*<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@alpha"></script> --> */ }              
          <Button onClick={this.extractAudio}>Extract Audio</Button>   
        </body>
    </div>
    )
  }

  async extractAudio() { 
    const ffmpeg = createFFmpeg({corePath:"https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js", log:true})
    await ffmpeg.load()    
    ffmpeg.FS('writeFile', 'input.ts', await fetchFile("http://20.54.150.204:8080/hls/test-8.ts"))
    await ffmpeg.run("-i", "input.ts", "-vn", "-acodec", "copy", "output-audio.aac")    
    const data = ffmpeg.FS('readFile', 'output-audio.aac')
    const element = document.createElement("a");
    const file = new Blob([data.buffer]);
    element.href = URL.createObjectURL(file);
    element.download = "output-audio.aac";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click()    
  }
}  

export default connect()(Home);
