import { message } from "antd";
import React from "react";

type MessageType = "success" | "error" | "info" | "warning";

interface useMessageHandler {
  showMessage: (type: MessageType, content: string) => void;
  contextHolder: React.ReactNode;
}

export const useMessageHandler = (): useMessageHandler => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (type: MessageType, content: string) => {
    messageApi.open({
      type,
      content,
    });
  };
  console.log(messageApi);

  return { showMessage, contextHolder };
};
