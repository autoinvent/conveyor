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

const SearchComponent: React.FC<SearchComponentProps> = ({ mode }) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);

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
              className='search-bar'
              type='search'
              placeholder='Search...'
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={(e: any) => {
                if (e.key === ' ') {
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
        <ModelNav modelId={Page.SEARCH}>
          <Button variant='primary' onClick={handleSearch}>
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
            type='search'
            placeholder='Search...'
            onChange={(e) => {
              setSearchValue(e.target.value);
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
