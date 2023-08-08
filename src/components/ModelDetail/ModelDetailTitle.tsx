import { useContext } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { BaseProps } from "../../types";
import { humanizeText } from "../../utils/common";

interface ModelDetailTitleProps extends BaseProps {
  modelName: string;
  modelLabel: string;
  title?: JSX.Element | string;
}

const ModelDetailTitle = ({
  id,
  className = "d-inline",
  modelName,
  modelLabel,
  title,
}: ModelDetailTitleProps) => {
  const { navigate } = useContext(ConveyorContext);
  return (
    <h2 id={id} className={className}>
      {title || (
        <>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              navigate({ modelName });
            }}
          >
            {humanizeText(modelName)}
          </a>
          :
        </>
      )}
    </h2>
  );
};

export default ModelDetailTitle;
