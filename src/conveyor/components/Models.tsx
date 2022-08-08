import { Container, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Models({ modelTitles }: { modelTitles: string[] }) {
  return (
    <Container>
      <Row>
        <h2>Models</h2>
      </Row>
      <Row>
        {modelTitles.length > 0 ? (
          modelTitles.map((modelTitle) => (
            <ListGroup key={`conveyor-content-models-${modelTitle}`}>
              <ListGroup.Item>
                <Link to={`/Conveyor/${modelTitle}`}>{modelTitle}</Link>
              </ListGroup.Item>
            </ListGroup>
          ))
        ) : (
          <h3>No Models Found</h3>
        )}
      </Row>
    </Container>
  );
}

export default Models;
