import { produce } from 'immer';
import {
  type ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  BooleanInput,
  BooleanValue,
  DatetimeInput,
  DefaultValue,
  type InputRenderFn,
  ModelItemInput,
  NumberInput,
  RawValue,
  StringInput,
  type ValueRenderFn,
} from '@/Form';
import { FieldTypes } from '@/types';
import { deepObjectMerge } from '@/utils';

export interface ConveyorState {
  typeOptions?: {
    [type: string]: {
      inputRenderFn?: InputRenderFn;
      valueRenderFn?: ValueRenderFn;
    };
  };
}

export const DEFAULT_CONVEYOR_STATE: ConveyorState = {
  typeOptions: {
    [FieldTypes.ID]: {
      valueRenderFn: (props) => <RawValue className="min-w-fit" {...props} />,
    },
    [FieldTypes.STRING]: {
      valueRenderFn: RawValue,
      inputRenderFn: StringInput,
    },
    [FieldTypes.INT]: {
      valueRenderFn: RawValue,
      inputRenderFn: NumberInput,
    },
    [FieldTypes.FLOAT]: {
      valueRenderFn: RawValue,
      inputRenderFn: NumberInput,
    },
    [FieldTypes.DATETIME]: {
      valueRenderFn: ({ name, value }) => (
        <RawValue
          name={name}
          value={value ? new Date(value).toLocaleString() : 'N/A'}
        />
      ),
      inputRenderFn: DatetimeInput,
    },
    [FieldTypes.BOOLEAN]: {
      valueRenderFn: BooleanValue,
      inputRenderFn: BooleanInput,
    },
    [FieldTypes.MODEL_ITEM]: {
      valueRenderFn: ({ name, value }) => (
        <RawValue
          name={name}
          value={value?.id ?? 'None'}
          className="min-w-fit"
        />
      ),
      inputRenderFn: ModelItemInput,
    },
    [FieldTypes.DEFAULT]: {
      valueRenderFn: DefaultValue,
      inputRenderFn: ({ inputProps: { name, value } }) => (
        <DefaultValue name={name} value={value} />
      ),
    },
  },
};

export const ConveyorStoreContext = createContext<StoreApi<ConveyorState>>(
  createStore(immer<ConveyorState>(() => DEFAULT_CONVEYOR_STATE)),
);

export interface ConveyorStoreProviderProps extends Partial<ConveyorState> {
  children?: ReactNode;
}
export const ConveyorStoreProvider = ({
  children,
  ...conveyorState
}: ConveyorStoreProviderProps) => {
  /*
    biome-ignore lint/correctness/useExhaustiveDependencies: 
       The reference to conveyorState does not matter, only the contents.
  */
  const storeState = useMemo(
    () =>
      produce(DEFAULT_CONVEYOR_STATE, (draftState) => {
        deepObjectMerge(
          draftState.typeOptions ?? {},
          conveyorState.typeOptions ?? {},
        );
      }) as ConveyorState,
    Object.values(conveyorState),
  );

  const [store] = useState(() =>
    createStore(immer<ConveyorState>(() => storeState)),
  );

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) store.setState(() => storeState);
  }, [storeState, store]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <ConveyorStoreContext.Provider value={store}>
      {children}
    </ConveyorStoreContext.Provider>
  );
};
