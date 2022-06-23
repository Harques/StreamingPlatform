import { Col, Row, Tabs } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { StreamService } from "../api/StreamService";
import { Stream } from "../models/Stream";
import NavMenu from "./NavMenu";
import { photos } from "./photos";
import { photos2 } from "./photos2";
import { photos3 } from "./photos3";

const { TabPane } = Tabs;
//const history = useHistory();

function callback(key: any) {
  console.log(key);
}

function printStreams(yayınlar: Array<Stream>, kategori: String) {
  var yayınListe: any[] = [];
  var fotoListe: { src: string | undefined }[] = [];
  if (kategori == "oyun") {
    yayınListe = yayınlar.filter((Stream) => Stream.category == "oyun");
    fotoListe = photos;
  } else if (kategori == "sohbet") {
    yayınListe = yayınlar.filter((Stream) => Stream.category == "sohbet");
    fotoListe = photos2;
  } else if (kategori == "eğitim") {
    yayınListe = yayınlar.filter((Stream) => Stream.category == "eğitim");
    fotoListe = photos3;
  }

  var rows = [];
  for (let i = 0; i < yayınListe.length; i++) {
    var linkString = "https://localhost:3000/streams/";
    var yayinLink = linkString + yayınListe[i].url;
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
          {yayınListe[i].url}
        </p>
      </Col>
    );
  }
  console.log(yayınListe);
  return rows;
}

interface MyState {
  value: Stream;
}
class Browse extends React.Component<MyState> {
  //history = useHistory();

  streamService: StreamService;

  constructor(props: any) {
    super(props);
    this.streamService = new StreamService();
    let yayınListesi = this.getAllStreams();
    this.state = yayınListesi;
  }

  render() {
    let tumYayınlar: Array<Stream> = [
      { id: 1, url: "gokce", category: "oyun", streamerId: 1 },
      { id: 2, url: "erdem", category: "sohbet", streamerId: 2 },
      { id: 3, url: "egecan", category: "eğitim", streamerId: 3 },
      { id: 4, url: "yasin", category: "oyun", streamerId: 4 },
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
          <TabPane tab='Gaming' key='1'>
            <h2 style={{ textAlign: "center" }}>Oyun</h2>
            <Row>{printStreams(tumYayınlar, "oyun")}</Row>
          </TabPane>
          <TabPane tab='Chat' key='3'>
            <h2 style={{ textAlign: "center" }}>Sohbet</h2>
            <Row>{printStreams(tumYayınlar, "sohbet")}</Row>
          </TabPane>
          <TabPane tab='Education' key='2'>
            <h2 style={{ textAlign: "center" }}>Eğitim</h2>
            <Row>{printStreams(tumYayınlar, "eğitim")}</Row>
          </TabPane>
        </Tabs>
      </>
    );
  }

  async getAllStreams() {
    //const response = await this.streamService.getStreams();

    let yayınlar: Array<Stream> = [
      { id: 1, url: "gokce", category: "oyun", streamerId: 1 },
      { id: 2, url: "erdem", category: "oyun", streamerId: 2 },
      { id: 3, url: "egecan", category: "oyun", streamerId: 3 },
      { id: 4, url: "yasin", category: "oyun", streamerId: 4 },
    ];

    const response = yayınlar;

    for (var index in response) {
      console.log(response[index]);
    }
  }

  //stream() {
  //  var streamlink = this.history.push('/streams')
  //  return streamlink;
  //}

}

export default Browse;
