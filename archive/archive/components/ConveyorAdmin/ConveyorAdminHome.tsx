import { Container, Row, ListGroup, Card } from 'react-bootstrap';

import { PACKAGE_ABBR } from '../../package';
import ModelNav from '../ModelNav';

interface ConveyorAdminHomeProps {
  modelNames: string[];
}

const ConveyorAdminHome = ({ modelNames }: ConveyorAdminHomeProps) => {
  const sortedModelNames = modelNames.sort();
  return (
    <Container>
      <Row>
        <h2>{sortedModelNames.length > 0 ? 'Models' : 'No Models Found'}</h2>
      </Row>
      <Row>
        {sortedModelNames.map((modelName) => (
          <ListGroup key={`${PACKAGE_ABBR}-Home-${modelName}`}>
            <ModelNav modelName={modelName}>
              <ListGroup.Item>
                <Card.Link>{modelName}</Card.Link>
              </ListGroup.Item>
            </ModelNav>
          </ListGroup>
        ))}
      </Row>
    </Container>
  );
};

export default ConveyorAdminHome;
