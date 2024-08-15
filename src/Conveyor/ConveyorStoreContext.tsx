import { produce } from 'immer';
import {
  type ComponentType,
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
  BooleanDisplay,
  DatetimeDisplay,
  ModelItemDisplay,
  RawDisplay,
} from '@/BasicDisplays';
import {
  BooleanInput,
  DatetimeInput,
  ModelItemInput,
  NumberInput,
  StringInput,
} from '@/BasicInputs';
import type { FormControlChildProps, FormDisplayChildProps } from '@/Form';
import { FieldType } from '@/types';
import { deepObjectMerge } from '@/utils';

export interface ConveyorState {
  typeOptions?: {
    [type: string]: {
      DisplayComponent?: ComponentType<FormDisplayChildProps>;
      InputComponent?: ComponentType<FormControlChildProps>;
    };
  };
}

export const DEFAULT_CONVEYOR_STATE: ConveyorState = {
  typeOptions: {
    [FieldType.ID]: {
      DisplayComponent: RawDisplay,
    },
    [FieldType.STRING]: {
      DisplayComponent: RawDisplay,
      InputComponent: StringInput,
    },
    [FieldType.INT]: {
      DisplayComponent: RawDisplay,
      InputComponent: NumberInput,
    },
    [FieldType.FLOAT]: {
      DisplayComponent: RawDisplay,
      InputComponent: NumberInput,
    },
    [FieldType.DATETIME]: {
      DisplayComponent: DatetimeDisplay,
      InputComponent: DatetimeInput,
    },
    [FieldType.BOOLEAN]: {
      DisplayComponent: BooleanDisplay,
      InputComponent: BooleanInput,
    },
    [FieldType.MODEL_ITEM]: {
      DisplayComponent: ModelItemDisplay,
      InputComponent: ModelItemInput,
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
