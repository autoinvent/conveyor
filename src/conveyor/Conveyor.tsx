import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as R from 'ramda';

import Navbar from './components/Navbar';
import Models from './components/Models';
import Model from './components/Model';
import { GraphQLFetcher } from './commons/types';
import { Schema, getModels, getModelPluralTitle } from './schema/schema';

function Conveyor({ schema, fetcher }: { schema: Schema; fetcher: GraphQLFetcher }) {
  const queryClient = new QueryClient();
  const modelPluralTitles = R.map(
    (model) => getModelPluralTitle(model),
    getModels(schema),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar modelTitles={modelPluralTitles} />
      <Routes>
        <Route path="/" element={<Models modelTitles={modelPluralTitles} />} />
        <Route
          path=":modelTitle"
          element={<Model schema={schema} fetcher={fetcher} />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default Conveyor;
