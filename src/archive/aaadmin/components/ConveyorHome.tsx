import { Container, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ConveyorHomeProps {
  modelNames: string[];
}

const ConveyorHome = ({ modelNames }: ConveyorHomeProps) => {
  const sortedModelNames = modelNames.sort();
  return (
    <Container>
      <Row>
        <h2>{sortedModelNames.length > 0 ? 'Models' : 'No Models Found'}</h2>
      </Row>
      <Row>
        {sortedModelNames.map((modelName) => (
          <ListGroup key={modelName}>
            <ListGroup.Item>
              <Link to={modelName}>{modelName}</Link>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Row>
    </Container>
  );
};

export default ConveyorHome;
