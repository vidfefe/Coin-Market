import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";

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
      <html lang="en">
        <body className={`${geistSans.variable} `}>{children}</body>
      </html>
    </ConfigProvider>
  );
}
