import { message } from "antd";
import React, { useState, useEffect } from "react";

type MessageType = "success" | "error" | "info" | "warning";

interface useMessageHandler {
  showMessage: (type: MessageType, content: string) => void;
  contextHolder: React.ReactNode;
}

export const useMessageHandler = (): useMessageHandler => {
  const [messageApi, contextHolder] = message.useMessage();
  const [messageState, setMessageState] = useState<{
    type: MessageType;
    content: string;
  } | null>(null);

  useEffect(() => {
    if (messageState) {
      const { type, content } = messageState;

      messageApi.open({
        type,
        content,
        duration: 2,
      });

      const timeoutId = setTimeout(() => {
        setMessageState(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [messageState, messageApi]);

  const showMessage = (type: MessageType, content: string) => {
    if (!messageState) {
      setMessageState({ type, content });
    }
  };

  return { showMessage, contextHolder };
};
