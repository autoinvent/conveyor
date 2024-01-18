// components/Search.tsx
import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
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

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: SearchDocument,
          variables: { value: searchValue },
        }),
      });

      const data = await response.json();
      setSearchResults(data.data.search);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown className='ms-2' id='conveyor-navbar-search'>
      <input
        className='search-bar'
        type='search'
        placeholder='Search...'
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        onClick={handleSearch}
      />
      <button className='search-button' type='submit' onClick={handleSearch}>
        <FaSearch />
      </button>

      {loading && <p>Loading...</p>}

      {searchResults && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.value}>
              <ModelNav modelName={result.type} modelId={result.id}>
                <Card.Link>
                  {result.type} {result.id}
                </Card.Link>
              </ModelNav>
            </li>
          ))}
        </ul>
      )}
    </Dropdown>
  );
};

export default SearchComponent;
