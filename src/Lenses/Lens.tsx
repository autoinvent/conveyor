import { ReactNode } from 'react';

import { LensType } from './LensesStoreContext';
import { useLenses } from './useLenses';

export interface LensProps {
  lens: LensType;
  children?: ReactNode
}

export const Lens = ({ lens, children }: LensProps) => {
  const { activeLens } = useLenses();
  if (activeLens === undefined)
    throw new Error('Lens must be used within Lenses');
  if (lens !== activeLens) {
    return null;
  }
  return <>{children}</>;
};
