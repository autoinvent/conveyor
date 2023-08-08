import { useContext } from "react";
import { Container, Row, ListGroup } from "react-bootstrap";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { PACKAGE_ABBR } from "../../package";

interface ConveyorAdminHomeProps {
  modelNames: string[];
}

const ConveyorAdminHome = ({ modelNames }: ConveyorAdminHomeProps) => {
  const { navigate } = useContext(ConveyorContext);
  const sortedModelNames = modelNames.sort();
  return (
    <Container>
      <Row>
        <h2>{sortedModelNames.length > 0 ? "Models" : "No Models Found"}</h2>
      </Row>
      <Row>
        {sortedModelNames.map((modelName) => (
          <ListGroup key={`${PACKAGE_ABBR}-Home-${modelName}`}>
            <ListGroup.Item>
              <a
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  navigate({ modelName });
                }}
              >
                {modelName}
              </a>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Row>
    </Container>
  );
};

export default ConveyorAdminHome;
