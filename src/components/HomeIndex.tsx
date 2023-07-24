import { Container, Row, ListGroup } from 'react-bootstrap';

import { Schema, getAllModelNames } from '../schema';
import { ERR_NO_MODELS } from '../common/components/ErrorToast';
import { useConveyorStore } from '../store';

function HomeIndex({ schema }: { schema: Schema | undefined }) {
  const modelNames = getAllModelNames(schema);

  const { navigate } = useConveyorStore();

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
                <button type='button' onClick={() => navigate(modelName)}>
                  {modelName}
                </button>
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
