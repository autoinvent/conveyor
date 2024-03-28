import { useContext } from 'react';

import { AlertContext } from './AlertContext';

export const useAlert = () => {
  const alert = useContext(AlertContext);
  return alert;
};
