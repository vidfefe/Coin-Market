"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button, Flex, Row } from "antd";

export default function NotFound() {
  const navigate = useRouter();

  return (
    <Row align="middle" justify="center">
      <Flex vertical={true}>
        <h1>Page Not Found</h1>
        <Button size="large" onClick={() => navigate.push("/")}>
          Go to Home page
        </Button>
      </Flex>
    </Row>
  );
}
