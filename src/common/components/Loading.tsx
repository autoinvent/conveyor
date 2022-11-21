import { Container } from 'react-bootstrap';

export const LOADING_SCHEMA = 'Loading Schema...';

function Loading({
  children,
  isLoading,
  message,
}: {
  children: JSX.Element;
  isLoading: boolean;
  message: string;
}) {
  return isLoading ? (
    <Container>
      <h2>{message}</h2>
    </Container>
  ) : (
    children
  );
}

export default Loading;
