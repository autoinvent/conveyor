import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as R from 'ramda';

function Models({ modelTitles }: { modelTitles: string[] }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Models</Card.Title>
        {R.map(
          (modelTitle) => (
            <ListGroup key={`conveyor-content-models-${modelTitle}`}>
              <ListGroup.Item>
                <Link to={`/Conveyor/${modelTitle}`}>{modelTitle}</Link>
              </ListGroup.Item>
            </ListGroup>
          ),
          modelTitles,
        )}
      </Card.Body>
    </Card>
  );
}

export default Models;
