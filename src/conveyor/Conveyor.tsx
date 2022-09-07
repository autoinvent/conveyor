import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from './components/Navbar';
import HomeIndex from './components/index/HomeIndex';
import ModelListIndex from './components/index/ModelListIndex';
import ModelDetail from './components/ModelDetailIndex';
import ErrorToast, { ERR_FETCH_SCHEMA } from './commons/components/ErrorToast';
import Loading, { LOADING_SCHEMA } from './commons/components/Loading';
import withQueryClient from './commons/components/withQueryClient';
import { SchemaFetcher, GraphQLFetcher } from './commons/types';
import { Schema } from './schema';

interface ConveyorProps {
  schemaFetcher: SchemaFetcher;
  gqlFetcher: GraphQLFetcher;
}

function Conveyor({ schemaFetcher, gqlFetcher }: ConveyorProps) {
  // Fetches Schema
  const {
    isLoading: schemaLoading,
    error: schemaFetchErr,
    data: schema,
  } = useQuery<Schema, Error>(['schema'], schemaFetcher);

  return (
    <>
      <Navbar schema={schema} />
      <ErrorToast error={schemaFetchErr} errorTitle={ERR_FETCH_SCHEMA} />
      <Loading isLoading={schemaLoading} message={LOADING_SCHEMA}>
        <Routes>
          <Route path="/" element={<HomeIndex schema={schema} />} />
          <Route
            path=":modelName"
            element={<ModelListIndex schema={schema} gqlFetcher={gqlFetcher} />}
          />
          <Route
            path=":modelName/:modelId"
            element={<ModelDetail schema={schema} gqlFetcher={gqlFetcher} />}
          />
        </Routes>
      </Loading>
    </>
  );
}

export default withQueryClient(Conveyor);
