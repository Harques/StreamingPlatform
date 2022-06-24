import { Col, Row, Tabs } from "antd";
import React from "react";
import { StreamService } from "../api/StreamService";
import { Stream } from "../models/Stream";
import NavMenu from "./NavMenu";
import { photos } from "./photos";
import { photos2 } from "./photos2";
import { photos3 } from "./photos3";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

function printStreams(yayınlar: Array<Stream>, kategori: String) {
  var yayınListe = Array<Stream>();
  var fotoListe: { src: string | undefined }[] = [];
  if (kategori == "oyun") {
    yayınListe = yayınlar.filter((Stream) => Stream.category == "Oyun");
    fotoListe = photos;
  } else if (kategori == "sohbet") {
    yayınListe = yayınlar.filter((Stream) => Stream.category == "Sohbet");
    fotoListe = photos2;
  } else if (kategori == "eğitim") {
    yayınListe = yayınlar.filter((Stream) => Stream.category == "Eğitim");
    fotoListe = photos3;
  }

  var rows = [];
  for (let i = 0; i < yayınListe.length; i++) {
    var linkString = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/stream/";
    var yayinLink = linkString + yayınListe[i].streamer.username;

    rows.push(
      <Col style={{ alignContent: "center", padding: "2px" }}>
        <a href={yayinLink}>
          <img
            style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
            src={fotoListe[i].src}
            width='550.5px'
            height='367px'
          ></img>
        </a>        
        <p
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}
        >
          {yayınListe[i].streamer.username}
        </p>
      </Col>
    );
  }
  return rows;
}

type MyState = {yayınListesi: Array<Stream>}

class Browse extends React.Component<{}, MyState> {

  streamService: StreamService;

  constructor(props: any) {
    super(props);
    this.streamService = new StreamService();
    this.getAllStreams = this.getAllStreams.bind(this);
    this.getAllStreams();
    this.state = {
      yayınListesi: Array<Stream>()
    }
  }

  render() {
    let tumYayınlar: Array<Stream> = [
      // { id: 1, url: "gokce", category: "oyun", streamerId: 1 },
      // { id: 2, url: "erdem", category: "sohbet", streamerId: 2 },
      // { id: 3, url: "egecan", category: "eğitim", streamerId: 3 },
      // { id: 4, url: "yasin", category: "oyun", streamerId: 4 },
    ];

    return (
      <>
        <NavMenu />
        <Tabs
          defaultActiveKey='1'
          onChange={callback}
          centered
          size='large'
          type='card'
        >
          <TabPane tab='Oyun' key='1'>
            <h2 style={{ textAlign: "center" }}>Oyun</h2>
            <Row>{printStreams(this.state.yayınListesi, "oyun")}</Row>
          </TabPane>
          <TabPane tab='Sohbet' key='3'>
            <h2 style={{ textAlign: "center" }}>Sohbet</h2>
            <Row>{printStreams(this.state.yayınListesi, "sohbet")}</Row>
          </TabPane>
          <TabPane tab='Eğitim' key='2'>
            <h2 style={{ textAlign: "center" }}>Eğitim</h2>
            <Row>{printStreams(this.state.yayınListesi, "eğitim")}</Row>
          </TabPane>
        </Tabs>
      </>
    );
  }

  async getAllStreams() {
    const res = await this.streamService.getStreams();
    this.setState({
      yayınListesi: res
    })
    console.log(this.state.yayınListesi[0])

    // let yayınlar: Array<Stream> = [
    //   { id: 1, url: "gokce", category: "oyun", streamerId: 1 },
    //   { id: 2, url: "erdem", category: "oyun", streamerId: 2 },
    //   { id: 3, url: "egecan", category: "oyun", streamerId: 3 },
    //   { id: 4, url: "yasin", category: "oyun", streamerId: 4 },
    // ];

    // const response = yayınlar;
  }
}

export default Browse;
