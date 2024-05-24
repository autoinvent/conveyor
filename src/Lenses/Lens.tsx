import type { ReactNode } from 'react';

import type { LensType } from './LensesStoreContext';
import { useLenses } from './useLenses';

export interface LensProps {
  lens: LensType;
  children?: ReactNode;
}

export const Lens = ({ lens, children }: LensProps) => {
  const { activeLens } = useLenses();
  if (activeLens === undefined)
    throw new Error('Either activeLens or initialLens must be set in Lenses!');
  if (lens !== activeLens) {
    return null;
  }
  return <>{children}</>;
};
