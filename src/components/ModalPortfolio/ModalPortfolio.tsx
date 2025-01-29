import { Modal } from "antd";
import { ReactNode } from "react";

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
