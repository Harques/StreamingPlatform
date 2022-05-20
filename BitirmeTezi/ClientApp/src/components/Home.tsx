import * as React from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { connect } from 'react-redux';

type MyState = {}
type MyProps = {}

class Home extends React.Component<MyProps, MyState> {
  playerRef: React.RefObject<HTMLVideoElement> = React.createRef();

  render() {
    return (
      <div>
        <head>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Live Stream</title>
        </head>
        <body>
          <h2>Live Stream</h2>
          <ReactHlsPlayer src="http://20.54.150.204:8080/hls/test.m3u8" autoPlay={true} playerRef={this.playerRef} width="%100" height="auto" controls={true} />
          <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script> 
          { /* <!-- Or if you want a more recent alpha version --> */ }
          { /*<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@alpha"></script> --> */ }          
        </body>
    </div>
    )
  }
}  

export default connect()(Home);
