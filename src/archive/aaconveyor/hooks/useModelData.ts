import { useContext } from 'react';

import { ModelDataContext } from '../contexts/ModelDataContext';

const useModelData = () => {
  const modelData = useContext(ModelDataContext);
  return modelData;
};

export default useModelData;
