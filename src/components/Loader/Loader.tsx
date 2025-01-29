import { Row, Col, Spin } from "antd";
import React from "react";

export default function Loader() {
  return (
    <Row align="middle" justify="center" style={{ minHeight: "100vh" }}>
      <Col>
        <Spin />
      </Col>
    </Row>
  );
}
