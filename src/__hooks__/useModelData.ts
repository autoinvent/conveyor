import { useContext } from 'react';

import { ModelDataContext } from '../__contexts__/ModelDataContext';

const useModelData = () => {
  const modelData = useContext(ModelDataContext);
  return JSON.parse(modelData);
};

export default useModelData;
