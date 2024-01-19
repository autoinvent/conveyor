// components/Search.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import ModelNav from './ModelNav';
interface SearchResult {
  type: string;
  id: string;
  value: string;
  extra?: Record<string, any> | null;
}

const SearchDocument = `
  query Search($value: String!) {
    search(value: $value) {
      type
      id
      value
      extra
    }
  }

`;

const SearchComponent: React.FC = () => {
  const [showoutput, setShowoutput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

  useEffect(() => {
    if (searchValue.length > 0) {
      setShowoutput(true);
    } else {
      setShowoutput(false);
    }
    handleSearch();
  }, [showoutput, searchResults]);

  const handleSearch = useCallback(() => {
    setLoading(true);

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SearchDocument,
        variables: { value: searchValue },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.data.search);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, searchResults, searchValue]);

  return (
    <NavDropdown
      id='navbar-search-box'
      align='end'
      show={showoutput}
      title={
        <input
          className='search-bar'
          type='search'
          placeholder='Search...'
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              //TODO Search Page Link
            }
          }}
          onInput={handleSearch}
          value={searchValue}
        />
      }
    >
      {searchResults && (
        <div className='search-results-box'>
          {searchResults.map((result) => (
            <ModelNav
              key={result.value}
              modelName={result.type}
              modelId={result.id}
            >
              <NavDropdown.Item>
                {result.type} {result.id}
              </NavDropdown.Item>
            </ModelNav>
          ))}
        </div>
      )}
    </NavDropdown>
  );
};

export default SearchComponent;
