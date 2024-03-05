// components/ModelSearch.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Dropdown,
  ListGroup,
  NavDropdown,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import ModelNav from './ModelNav';
import { Page } from '../enums';

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

interface SearchComponentProps {
  mode: 'navbar' | 'searchPage';
}

let searchStoredValue = '';

const SearchComponent: React.FC<SearchComponentProps> = ({ mode }) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(20);

  const handleButton = useCallback(() => {
    // Use setSearchValue to update searchValue when the button is clicked
    searchStoredValue = searchValue;
    setSearchValue('');
  }, [searchValue]);

  useEffect(() => {
    if (mode === 'searchPage' && searchStoredValue.length > 0) {
      setSearchValue(searchStoredValue);
      handleSearch();
    }
  }, [searchStoredValue, searchValue]);

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

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  if (mode === 'navbar') {
    const [showoutput, setShowoutput] = useState(false);
    useEffect(() => {
      if (searchValue.length > 0) {
        setShowoutput(true);
      } else {
        setShowoutput(false);
      }
      handleSearch();
    }, [showoutput, searchValue]);

    return (
      <>
        <NavDropdown
          className='navbar-title'
          id='navbar-search-box'
          align='end'
          show={showoutput}
          title={
            <input
              id='navbar-search-input'
              className='search-bar'
              type='text'
              placeholder='Search...'
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  const button = document.getElementById('myBtn');
                  button?.click();
                } else if (e.key === ' ') {
                  e.stopPropagation();
                }
              }}
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
        <ModelNav key={searchValue} modelId={Page.SEARCH}>
          <Button
            id='myBtn'
            type='submit'
            variant='primary'
            onClick={handleButton}
          >
            {<FaSearch />}
          </Button>
        </ModelNav>
      </>
    );
  } else if (mode === 'searchPage') {
    return (
      <Dropdown id='big-search-box'>
        <>
          <input
            className='search-bar-long'
            type='text'
            placeholder='Search...'
            onChange={(e) => {
              setSearchValue(e.target.value);
              searchStoredValue = '';
            }}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter') {
                handleSearch();
              } else if (e.key === ' ') {
                e.stopPropagation();
              }
            }}
            value={searchValue}
          />
          <Button
            className='button-search'
            variant='primary'
            onClick={handleSearch}
          >
            {<FaSearch />}
          </Button>
        </>
        {searchResults && (
          <>
            <ListGroup>
              {searchResults
                .slice(
                  (currentPage - 1) * resultsPerPage,
                  currentPage * resultsPerPage,
                )
                .map((result) => (
                  <ModelNav
                    key={result.value}
                    modelName={result.type}
                    modelId={result.id}
                  >
                    <ListGroup.Item>
                      <Card.Link>
                        {result.type} {result.id}
                      </Card.Link>
                    </ListGroup.Item>
                  </ModelNav>
                ))}
            </ListGroup>
            <div className='pagination'>
              {Array.from({
                length: Math.ceil(searchResults.length / resultsPerPage),
              }).map((_, index) => (
                <button
                  type='button'
                  key={index + 1}
                  onClick={() => handlePagination(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <span className='pagination-info'>
                {(currentPage - 1) * resultsPerPage + 1}-
                {Math.min(currentPage * resultsPerPage, searchResults.length)}{' '}
                of {searchResults.length}
              </span>
            </div>
          </>
        )}
      </Dropdown>
    );
  }
};

export default SearchComponent;
