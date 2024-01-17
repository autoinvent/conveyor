// components/Search.tsx
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Page } from '../enums';

interface SearchResult {
  type: string;
  id: string;
  value: string;
  extra: any;
}

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      // Perform the search (fetch request or GraphQL query)

      const response = await fetch('http://127.0.0.1:5000/graphiql', {
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

      // Assuming searchResults is the result of the search
      const searchResultsData: SearchResult[] = []; // Replace with actual data

      setSearchResults(searchResultsData);
      Page.SEARCH; // Navigate to the results page
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
        id='search'
        type='text'
        placeholder='Search...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className='search-button'
        type='button'
        onClick={handleSearch}
        disabled={loading}
      >
        {<FaSearch />}
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

export default Search;
