import { ReactNode, useContext } from 'react';

import { ActiveLensContext } from './Lenses';

export interface LensProps {
  lens: string | number | boolean;
  children?: ReactNode;
}

export const Lens = ({ lens, children }: LensProps) => {
  const activeLens = useContext(ActiveLensContext);
  if (lens === activeLens) {
    return <>{children}</>;
  }
  return null;
};
