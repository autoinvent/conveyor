import { ComponentType, ReactNode } from 'react';

import { Home } from '../Home';
import { ModelCreatePage } from '../ModelCreatePage';
import { ModelDetailPage } from '../ModelDetailPage';
import { ModelIndexPage } from '../ModelIndexPage';

import { Route, Routes } from '../Routes';

import { Dashboard } from './Dashboard';

export interface AdminProps {
  RootComponent?: ComponentType;
  children?: ReactNode;
}

export const Admin = ({ RootComponent = Dashboard, children }: AdminProps) => {
  return (
    <Routes RootComponent={RootComponent}>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/$model">
        <ModelIndexPage />
      </Route>
      <Route path="/$model/create">
        <ModelCreatePage />
      </Route>
      <Route path="/$model/$id">
        <ModelDetailPage />
      </Route>
      {children}
    </Routes>
  );
};
