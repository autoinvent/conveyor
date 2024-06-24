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
  DatetimeValue,
  DefaultValue,
  type InputRenderFn,
  NumberInput,
  RawValue,
  StringInput,
  type ValueRenderFn,
} from '@/Form';
import { ScalarTypes } from '@/types';
import { deepObjectMerge } from '@/utils';

export const DEFAULT_TYPE = 'DEFAULT_TYPE';

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
    [ScalarTypes.ID]: {
      valueRenderFn: RawValue,
    },
    [ScalarTypes.STRING]: {
      valueRenderFn: RawValue,
      inputRenderFn: StringInput,
    },
    [ScalarTypes.INT]: {
      valueRenderFn: RawValue,
      inputRenderFn: NumberInput,
    },
    [ScalarTypes.FLOAT]: {
      valueRenderFn: RawValue,
      inputRenderFn: NumberInput,
    },
    [ScalarTypes.DATETIME]: {
      valueRenderFn: DatetimeValue,
      inputRenderFn: DatetimeInput,
    },
    [ScalarTypes.BOOLEAN]: {
      valueRenderFn: BooleanValue,
      inputRenderFn: BooleanInput,
    },
    [DEFAULT_TYPE]: {
      valueRenderFn: DefaultValue,
      inputRenderFn: ({ inputProps: { value, name } }) => (
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
