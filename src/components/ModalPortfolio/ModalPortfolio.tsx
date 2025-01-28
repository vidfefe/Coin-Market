import { Modal, Button, InputNumber, Table, Typography } from "antd";
import { ReactNode } from "react";
import { CoinsData } from "@/types/coinsData";

const { Text } = Typography;

interface CustomModalProps {
  visible: boolean;
  title: string;
  onCancel: () => void;
  footer?: ReactNode;
  content: ReactNode;
}

export const ModalPortfolio = ({
  visible,
  title,
  onCancel,
  footer,
  content,
}: CustomModalProps) => {
  return (
    <Modal title={title} open={visible} onCancel={onCancel} footer={footer}>
      {content}
    </Modal>
  );
};
