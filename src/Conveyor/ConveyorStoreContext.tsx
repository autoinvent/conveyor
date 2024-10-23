import {
  type ComponentType,
  type ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { produce } from 'immer';
import { type StoreApi, createStore } from 'zustand';

import {
  BooleanDisplay,
  DatetimeDisplay,
  ModelDisplay,
  RawDisplay,
} from '@/BasicDisplays';
import {
  BooleanInput,
  DatetimeInput,
  ModelInput,
  NumberInput,
  StringInput,
} from '@/BasicInputs';
import type { FormControlChildProps, FormDisplayChildProps } from '@/Form';
import { FieldType } from '@/types';
import { deepObjectMerge } from '@/utils';

export interface ConveyorState<
  DisplayComponentProps extends FormDisplayChildProps = any,
  InputComponentProps extends FormControlChildProps = any,
> {
  typeOptions?: {
    [type: string]: {
      DisplayComponent?: ComponentType<DisplayComponentProps>;
      InputComponent?: ComponentType<InputComponentProps>;
    };
  };
}

export const DEFAULT_CONVEYOR_STATE = {
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
    [FieldType.MODEL]: {
      DisplayComponent: ModelDisplay,
      InputComponent: ModelInput,
    },
  },
};

export const ConveyorStoreContext = createContext<StoreApi<ConveyorState>>(
  createStore(() => DEFAULT_CONVEYOR_STATE),
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

  const [store] = useState(() => createStore(() => storeState));

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) store.setState(storeState);
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
