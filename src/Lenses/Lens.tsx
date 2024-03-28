import { WrapperProp } from '@/types';

import { LensType } from './LensesStoreContext';
import { useLenses } from './useLenses';

export interface LensProps extends WrapperProp {
  lens: LensType;
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
