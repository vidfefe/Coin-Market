import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#8450ca",
    colorText: "#ffffff",
    colorPrimaryBg: "trasparent",
    colorBgBase: "transparent",
    colorFillSecondary: "#8450ca",
    colorTextBase: "rgb(110, 68, 170)",

    colorBorderSecondary: "#8450ca",
    colorBgContainer: "transparent",
    colorBorder: "#8450ca",
    colorTextDisabled: "rgba(255,255,255,0.3)",
    colorIcon: "rgba(255,255,255,0.3)",
    colorTextPlaceholder: "rgba(255,255,255,0.3)",
    colorTextQuaternary: "rgba(255,255,255,0.3)",
  },
  components: {
    Table: {
      borderColor: "#3F3D50",
      colorBgContainer: "transparent",
      headerBg: "transparent",
      headerSplitColor: "transparent",
      rowHoverBg: "#3F3D50",
      bodySortBg: "rgba(255,255,255,0.05)",
      colorTextDisabled: "white",
    },
    Button: {
      fontWeight: 500,
      primaryShadow: "0 2px 0 rgb(94 3 231 / 30%)",
    },

    Pagination: {
      itemBg: "transparent",
      itemActiveBg: "transparent",
      itemActiveBgDisabled: "transparent",
    },
    Select: {
      colorBgElevated: "#8450ca",
    },
    Message: {
      contentBg: " rgba(38,23,59,1) ",
    },
  },
};

export default theme;
