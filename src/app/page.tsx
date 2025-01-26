"use client";

import CoinTable from "@/components/CoinTable";
import styles from "./page.module.css";
import { Col, Row } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

export default function Home() {
  const [searchCoin, setSearchCoin] = useState<string>("");

  return (
    <Row justify="center">
      <Col xs={24} md={12}>
        <Row align="top" gutter={[0, 20]}>
          <Col xs={{ span: 12, offset: 6 }}>
            <Search
              placeholder="Search coin by name"
              onSearch={(value) => setSearchCoin(value)}
            />
          </Col>
          <Col xs={24}>
            <CoinTable searchCoin={searchCoin} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
