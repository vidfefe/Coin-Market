"use client";

import CoinTable from "@/components/CoinTable/CoinTable";
import styles from "./page.module.css";
import { Col, Row } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Home() {
  const [searchCoin, setSearchCoin] = useState<string>("");

  return (
    <Row justify="center">
      <Col xs={24} md={24}>
        <Row align="top" justify="center" gutter={[0, 20]}>
          <Col xs={{ span: 18 }} md={{ span: 8 }}>
            <SearchBar onSearch={setSearchCoin} />
          </Col>
          <Col xs={24} md={18}>
            <CoinTable searchCoin={searchCoin} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
