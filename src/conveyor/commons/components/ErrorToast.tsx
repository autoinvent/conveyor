import { useEffect, useState } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap/';

export const ERR_NO_MODELS = 'No Models Found';
export const ERR_FETCH_SCHEMA = 'Schema could not be fetched.';

function ErrorToast({
  error,
  errorTitle,
}: {
  error: Error | null;
  errorTitle: string;
}) {
  const [showToast, setShowToast] = useState(Boolean(error));
  useEffect(() => {
    setShowToast(Boolean(error));
  }, [error]);

  return (
    <ToastContainer position="top-center">
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header>
          <strong className="me-auto">{errorTitle}</strong>
        </Toast.Header>
        <Toast.Body>{error?.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ErrorToast;
