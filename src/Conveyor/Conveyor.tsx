import type { ReactNode } from 'react';

import {
  type ConveyorState,
  ConveyorStoreProvider,
} from './ConveyorStoreContext';

export interface ConveyorProps extends Partial<ConveyorState> {
  children?: ReactNode;
}

export const Conveyor = ({ children, ...conveyorState }: ConveyorProps) => {
  return (
    <ConveyorStoreProvider {...conveyorState}>{children}</ConveyorStoreProvider>
  );
};
