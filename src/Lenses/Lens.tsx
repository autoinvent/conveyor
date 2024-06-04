import type { ReactNode } from 'react';

import type { LensType } from './LensesStoreContext';
import { useLensesStore } from './useLensesStore';

export interface LensProps {
  lens: LensType;
  children?: ReactNode;
}

export const Lens = ({ lens, children }: LensProps) => {
  const activeLens = useLensesStore((state) => state.activeLens);
  if (activeLens === undefined)
    throw new Error('Either activeLens or initialLens must be set in Lenses!');
  if (lens !== activeLens) {
    return null;
  }
  return <>{children}</>;
};
