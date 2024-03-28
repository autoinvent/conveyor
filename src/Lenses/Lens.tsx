import { useStore } from '@tanstack/react-store';

import { WrapperProp } from '@/types';

import { LensType } from './LensesStoreContext';
import { useLensesStore } from './useLensesStore';

export interface LensProps extends WrapperProp {
  lens: LensType;
}

export const Lens = ({ lens, children }: LensProps) => {
  const lensesStore = useLensesStore();
  const activeLens = useStore(lensesStore, (state) => state.activeLens);
  if (activeLens === undefined)
    throw new Error('Lens must be used within Lenses');
  if (lens !== activeLens) {
    return null;
  }
  return <>{children}</>;
};
