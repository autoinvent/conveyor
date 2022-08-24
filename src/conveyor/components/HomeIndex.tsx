import { Container, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Schema, getAllModelNames } from '../schema';
import { ERR_NO_MODELS } from '../commons/components/ErrorToast';

function HomeIndex({ schema }: { schema: Schema | undefined }) {
  const modelNames = getAllModelNames(schema);

  return (
    <Container>
      <Row>
        <h2>Models</h2>
      </Row>
      <Row>
        {modelNames.length ? (
          modelNames.map((modelName) => (
            <ListGroup key={`conveyor-content-models-${modelName}`}>
              <ListGroup.Item>
                <Link to={`/Conveyor/${modelName}`}>{modelName}</Link>
              </ListGroup.Item>
            </ListGroup>
          ))
        ) : (
          <h3>{ERR_NO_MODELS}</h3>
        )}
      </Row>
    </Container>
  );
}

export default HomeIndex;
