import { Row } from "antd/lib/grid";
import React from "react";
import { Link } from "react-router-dom";
class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <Row style={{ justifyContent: "center", width: "100%" }}>
          <img
            src={
              "https://tepeseo.com/wp-content/uploads/2019/05/404notfound.png"
            }
            style={{ width: "500px" }}
          />
        </Row>
        <Row style={{ justifyContent: "center", width: "100%" }}>
          <p style={{ textAlign: "center", fontSize:"16px"}}>
            <Link to='/'>Go to Home </Link>
          </p>
        </Row>
      </>
    );
  }
}
export default NotFoundPage;
