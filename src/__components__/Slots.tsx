import { ReactNode, useContext, useEffect } from 'react';

import { SetSlotsContext } from '../__contexts__/SlotsContext';
import { ModelField } from '../__types';
import { getFieldName } from '../__utils__';

interface SlotsProps {
  field: ModelField;
  children?: ReactNode;
}

const Slots = ({ field, children }: SlotsProps) => {
  const setSlots = useContext(SetSlotsContext);
  useEffect(() => {
    setSlots((slots) => ({
      ...slots,
      [getFieldName(field)]: children,
    }));
  }, [field, children]);
  return null;
};

export default Slots;
