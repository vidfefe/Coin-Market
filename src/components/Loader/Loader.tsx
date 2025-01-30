import { Row, Col, Spin } from "antd";
import React from "react";

export default function Loader() {
  return (
    <Row align="middle" justify="center" className="centered-position">
      <Col>
        <Spin />
      </Col>
    </Row>
  );
}
