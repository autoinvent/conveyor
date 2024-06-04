import { type ReactNode, createContext, useMemo } from 'react';
import dayjs from 'dayjs';
import { produce } from 'immer';
import { type StoreApi, createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { InputRenderFn, ValueRenderFn } from '@/Form';
import { type ID, DefaultTypes, ScalarTypes } from '@/types';

export interface ConveyorState {
  inputOptions: Record<ScalarTypes | string, InputRenderFn>;
  valueOptions: Record<ScalarTypes | string, ValueRenderFn>;
}

// CAUTION: Be sure to use `structuredClone(DEFAULT_CONVEYOR_STATE)`
// when using default objects
export const DEFAULT_CONVEYOR_STATE: ConveyorState = {
  inputOptions: {
    [ScalarTypes.STRING]: (props) => (
      <input
        className="h-full w-full bg-[--bg-accent] px-3"
        type="text"
        {...props.field}
      />
    ),
    [ScalarTypes.INT]: (props) => (
      <input
        className="h-full w-full bg-[--bg-accent] px-3"
        type="number"
        {...props.field}
      />
    ),
    [ScalarTypes.FLOAT]: (props) => (
      <input
        className="h-full w-full bg-[--bg-accent] px-3"
        type="number"
        {...props.field}
      />
    ),
    [ScalarTypes.DATETIME]: ({ field: { value, ...rest } }) => (
      <input
        className="h-full w-full bg-[--bg-accent] px-3"
        type="datetime-local"
        value={value ? dayjs(value).format('YYYY-MM-DDTHH:mm:ss') : undefined}
        {...rest}
      />
    ),
    [ScalarTypes.BOOLEAN]: (props) => (
      <div className="h-full w-full bg-[--bg-accent] text-center">
        <input className="align-middle" type="checkbox" {...props.field} />
      </div>
    ),
    [DefaultTypes.MODEL]: (props) => (
      <div className="text-center">{JSON.stringify(props.field.value)}</div>
    ),
  },
  valueOptions: {
    [ScalarTypes.ID]: (value: ID) => (
      <div className="h-full w-full p-1.5 text-center align-baseline text-cyan-600">
        {value}
      </div>
    ),
    [ScalarTypes.STRING]: (value: string) => (
      <div className="h-full w-full p-1.5 text-start align-baseline">
        {value}
      </div>
    ),
    [ScalarTypes.INT]: (value) => (
      <div className="h-full w-full p-1.5 text-start align-baseline">
        {value}
      </div>
    ),
    [ScalarTypes.FLOAT]: (value) => (
      <div className="h-full w-full p-1.5 text-start align-baseline">
        {value}
      </div>
    ),
    [ScalarTypes.DATETIME]: (value) => (
      <div className="h-full w-full p-1.5 text-start align-baseline">
        {value
          ? new Intl.DateTimeFormat('en-us', {
              dateStyle: 'short',
              timeStyle: 'short',
            }).format(new Date(value))
          : 'none'}
      </div>
    ),
    [ScalarTypes.BOOLEAN]: (value) => (
      <input
        className="w-full"
        disabled={true}
        type="checkbox"
        checked={!!value}
      />
    ),
    [DefaultTypes.MODEL]: (value) => (
      <div className="h-full w-full p-1.5 text-center align-baseline">
        {value?.id ? value.id : 'none'}
      </div>
    ),
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
  // biome-ignore lint/correctness/useExhaustiveDependencies: entire states are used
  const store = useMemo(
    () =>
      createStore(
        immer<ConveyorState>(() => {
          return produce(conveyorState, (draftState) => {
            draftState.inputOptions ??= {};
            draftState.inputOptions = Object.assign(
              { ...DEFAULT_CONVEYOR_STATE.inputOptions },
              draftState.inputOptions,
            );
            draftState.valueOptions ??= {};
            draftState.valueOptions = Object.assign(
              { ...DEFAULT_CONVEYOR_STATE.valueOptions },
              draftState.valueOptions,
            );
          }) as ConveyorState;
        }),
      ),
    Object.values(conveyorState),
  );
  return (
    <ConveyorStoreContext.Provider value={store}>
      {children}
    </ConveyorStoreContext.Provider>
  );
};
