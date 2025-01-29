import { Button } from "antd";
import React from "react";

export default function ModalFooter({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <Button key="back" onClick={onCancel}>
        Cancel
      </Button>
      <Button key="submit" type="primary" onClick={onSubmit}>
        Add to Portfolio
      </Button>
    </>
  );
}
