import { useContext } from "react";
import { Button } from "react-bootstrap";

import { Page } from "../ConveyorAdmin/ConveyorAdmin";
import { ConveyorContext } from "../../contexts/ConveyorContext";
import { BaseProps } from "../../types";

interface ModelCreateButtonProps extends BaseProps {
  modelName: string;
  editable?: boolean;
}

const ModelCreateButton = ({
  id,
  className = "float-right",
  modelName,
  editable = true,
}: ModelCreateButtonProps) => {
  const { navigate } = useContext(ConveyorContext);
  return editable ? (
    <Button
      id={id}
      className={className}
      variant="outline-success"
      onClick={() => navigate({ modelName, id: Page.CREATE })}
    >
      Create
    </Button>
  ) : null;
};

export default ModelCreateButton;
