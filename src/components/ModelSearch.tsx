// components/Search.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
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
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

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
  }, [searchResults, searchValue, loading]);

  return (
    <NavDropdown id='conveyor-navbar-search' title={<FaSearch />} align='end'>
      <input
        className='search-bar'
        type='search'
        placeholder='Search...'
        onChange={(e) => {
          e.persist();
          setSearchValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        value={searchValue}
      />
      <button type='submit' onClick={handleSearch}>
        <FaSearch />
      </button>

      {loading && <p>Loading...</p>}

      {searchResults && (
        <li>
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
        </li>
      )}
    </NavDropdown>
  );
};

export default SearchComponent;
