import { useEffect, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { useConveyor } from '@/Conveyor';
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CircleCard,
  Deck,
  CardField,
} from '../Deck';
import { Lens, Lenses } from '@/Lenses';
import { SearchBar } from '@/Search';
import { SearchResult } from '@/types';

import { useSearchQuery } from '../hooks/useSearchQuery';

export const Home = () => {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const { selected: models } = useConveyor((state) => state.models);
  const [searchValue, setSearchValue] = useState('');
  const { data, error, isLoading, isSuccess, isError, operationName } =
    useSearchQuery({ searchValue });
  const [searchedModels, setSearchedModels] = useState<
    Record<string, SearchResult[]>
  >({});

  useEffect(() => {
    if (isLoading === false) {
      if (isSuccess) {
        const newSearchedModels: Record<string, SearchResult[]> = {};
        data?.[operationName]?.forEach((searchItem: SearchResult) => {
          const modelName = searchItem.type;
          if (!newSearchedModels[modelName]) {
            newSearchedModels[modelName] = [];
          }
          newSearchedModels[modelName].push(searchItem);
        });
        setSearchedModels(newSearchedModels);
      } else if (isError) {
        addAlert({
          content: `Failed to search for ${searchValue}: ${error}`,
          className: 'danger',
        });
      }
    }
  }, [data, isLoading, isSuccess, isError]);
  return (
    <>
      <h2 className="mx-auto w-[500px]">
        <SearchBar onSearch={(value) => setSearchValue(value)} />
      </h2>
      <Lenses activeLens={Object.keys(searchedModels).length > 0}>
        <Lens lens={true}>
          <Deck>
            {Object.keys(models).map((modelName) => {
              return (
                <CircleCard
                  key={modelName}
                  onDoubleClick={() => navigate({ to: `/${modelName}` })}
                >
                  <CardHeader>
                    <CardTitle>{modelName}</CardTitle>
                    <CardDescription>
                      {`items: ${searchedModels?.[modelName]?.length ?? 0}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardField>
                      <ul>
                        {Object.keys(models[modelName].fields).map((field) => {
                          return <li key={field}>{field}</li>;
                        })}
                      </ul>
                    </CardField>
                    <CardField>
                      <ul>
                        {searchedModels?.[modelName]?.map((searchItem) => {
                          return (
                            <li key={searchItem.value}>
                              <Link to={`/${modelName}/${searchItem.id}`}>
                                {searchItem.value}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </CardField>
                  </CardContent>
                </CircleCard>
              );
            })}
          </Deck>
        </Lens>
        <Lens lens={false}>
          <div> No models found.</div>
        </Lens>
      </Lenses>
    </>
  );
};
