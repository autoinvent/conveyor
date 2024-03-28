import { WrapperProp } from '@/types';

export interface MQLResponse {
  [operationName: string]: Record<string, any>;
}

export interface MQLFetcherParams {
  document: string;
  variables?: Record<string, any>;
  operationName?: string;
}

export type MQLFetcher = (params: MQLFetcherParams) => Promise<MQLResponse>;

export interface ConveyorProps extends WrapperProp {
  fetcher: MQLFetcher;
}

export const Conveyor = ({ fetcher, children }: ConveyorProps) => {
  return null;
};
