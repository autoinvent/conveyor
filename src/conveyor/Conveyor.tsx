import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import QueryClientHOF from './components/ConveyorQueryClientHOF';
import Navbar from './components/Navbar';
import Models from './components/Models';
import Model from './components/Model';
import { SchemaFetcher, GraphQLFetcher } from './commons/types';
import { Schema, getModels, getModelPluralTitle } from './schema';

function Conveyor({
  schemaFetcher,
  gqlFetcher,
}: {
  schemaFetcher: SchemaFetcher;
  gqlFetcher: GraphQLFetcher;
}) {
  // Fetches Schema
  const {
    error: schemaFetchErr,
    data: schema,
  }: {
    error: Error | null;
    data: Schema | undefined;
  } = useQuery(['schema'], schemaFetcher);

  if (schemaFetchErr) throw new Error(schemaFetchErr.message);
  const modelPluralTitles = schema
    ? getModels(schema).map((model) => getModelPluralTitle(model))
    : [];
  return (
    <>
      <Navbar modelTitles={modelPluralTitles} />
      <Routes>
        <Route path="/" element={<Models modelTitles={modelPluralTitles} />} />
        {schema && (
          <Route
            path=":modelTitle"
            element={<Model schema={schema} fetcher={gqlFetcher} />}
          />
        )}
      </Routes>
    </>
  );
}

export default QueryClientHOF(Conveyor);
