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
  IdValue,
  type InputRenderFn,
  NumberInput,
  StringInput,
  StringValue,
  type ValueRenderFn,
} from '@/Form';
import { ScalarTypes } from '@/types';

export const DEFAULT_TYPE = 'DEFAULT_TYPE';

export interface ConveyorState {
  inputOptions: Record<ScalarTypes | string, InputRenderFn>;
  valueOptions: Record<ScalarTypes | string, ValueRenderFn>;
}

export const DEFAULT_CONVEYOR_STATE: ConveyorState = {
  inputOptions: {
    [ScalarTypes.STRING]: StringInput,
    [ScalarTypes.INT]: NumberInput,
    [ScalarTypes.FLOAT]: NumberInput,
    [ScalarTypes.DATETIME]: DatetimeInput,
    [ScalarTypes.BOOLEAN]: BooleanInput,
    [DEFAULT_TYPE]: ({ inputProps: { value } }) => <>{JSON.stringify(value)}</>,
  },
  valueOptions: {
    [ScalarTypes.ID]: IdValue,
    [ScalarTypes.STRING]: StringValue,
    [ScalarTypes.INT]: StringValue,
    [ScalarTypes.FLOAT]: StringValue,
    [ScalarTypes.DATETIME]: DatetimeValue,
    [ScalarTypes.BOOLEAN]: BooleanValue,
    [DEFAULT_TYPE]: ({ value }) => <>{JSON.stringify(value)}</>,
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
      produce(conveyorState, (draftState) => {
        draftState.inputOptions ??= {};
        draftState.inputOptions = Object.assign(
          {},
          DEFAULT_CONVEYOR_STATE.inputOptions,
          draftState.inputOptions,
        );
        draftState.valueOptions ??= {};
        draftState.valueOptions = Object.assign(
          {},
          DEFAULT_CONVEYOR_STATE.valueOptions,
          draftState.valueOptions,
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
