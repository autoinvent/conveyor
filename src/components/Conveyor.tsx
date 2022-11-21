import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from './Navbar';
import HomeIndex from './HomeIndex';
import ModelListIndex from './ModelListIndex';
import ModelDetailIndex from './ModelDetailIndex';
import ErrorToast, { ERR_FETCH_SCHEMA } from '../common/components/ErrorToast';
import Loading, { LOADING_SCHEMA } from '../common/components/Loading';
import withQueryClient from '../common/components/withQueryClient';
import { SchemaFetcher, GraphQLFetcher } from '../common/types';
import { Schema } from '../schema';

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
            element={<ModelDetailIndex schema={schema} gqlFetcher={gqlFetcher} />}
          />
        </Routes>
      </Loading>
    </>
  );
}

export default withQueryClient(Conveyor);
