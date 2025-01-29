import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";
import Header from "../components/Header/Header";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { Content } from "antd/es/layout/layout";
import "@ant-design/v5-patch-for-react-19";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coin Market",
  description: "Coin Market for test exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider theme={theme}>
      <PortfolioProvider>
        <html lang="en">
          <body className={`${geistSans.variable} `}>
            <Header />
            <Content style={{ marginRight: "10px", marginLeft: "10px" }}>
              {children}
            </Content>
          </body>
        </html>
      </PortfolioProvider>
    </ConfigProvider>
  );
}
