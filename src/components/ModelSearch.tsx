// components/Search.tsx
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
interface SearchResult {
  type: string;
  id: string;
  value: string;
  extra?: Record<string, any> | null;
}

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
          query: `
            query Search($value: String!) {
              search(value: $value) {
                type
                id
                value
                extra
              }
            }
          `,
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
    <Form className='ms-5'>
      <input
        className='search-bar'
        type='search'
        placeholder='Search...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className='search-button' type='submit' onClick={handleSearch}>
        <FaSearch />
      </button>

      {loading && <p>Loading...</p>}

      {searchResults && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.value}</li>
          ))}
        </ul>
      )}
    </Form>
  );
};

export default SearchComponent;
