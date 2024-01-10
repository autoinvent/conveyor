import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

import DefaultDisplayValue from '../__components__/DefaultDisplayValue';
import DefaultDisplayInput from '../__components__/DefaultDisplayInput';
import { getFieldName } from '../__utils__';
import { ModelFieldsContext } from './ModelFieldsContext';

export const ModelFieldDisplaysContext = createContext<
  Record<string, ReactNode>
>({});
export const SetModelFieldDisplaysContext = createContext<
  Dispatch<SetStateAction<Record<string, ReactNode>>>
>(() => {
  throw new Error(
    'SetTableCellsContext must be used within TableCellsProvider',
  );
});

interface ModelFieldDisplaysProviderProps {
  children: ReactNode;
}

export const ModelFieldDisplaysProvider = ({
  children,
}: ModelFieldDisplaysProviderProps) => {
  const fields = useContext(ModelFieldsContext);
  const initialValue: Record<string, ReactNode> = Object.fromEntries(
    fields.map((field) => [
      getFieldName(field),
      <>
        <DefaultDisplayValue field={field} />
        <DefaultDisplayInput field={field} />
      </>,
    ]),
  );
  const [tableCells, setTableCells] = useState(initialValue);

  return (
    <SetModelFieldDisplaysContext.Provider value={setTableCells}>
      <ModelFieldDisplaysContext.Provider value={tableCells}>
        {children}
      </ModelFieldDisplaysContext.Provider>
    </SetModelFieldDisplaysContext.Provider>
  );
};
