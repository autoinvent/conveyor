import { useEffect, useState } from 'react';
import { BaseProps } from '../../types';
import { Button, Modal } from 'react-bootstrap';
import { TableViewsAction } from '../../reducers/tableViewsReducer';

interface ModelIndexTableFilterProps extends BaseProps {
  modelName: string;
  fields: string[];
  filters: any[];
  setFilters: any;
  dispatch: any;
}

const ModelIndexTableFilter = ({
  modelName,
  fields,
  filters,
  setFilters,
  dispatch,
}: ModelIndexTableFilterProps) => {
  const blankFilter = {
    field: fields[0] || '',
    operator: '==', // Default operator, adjust as needed
    value: '',
    not: false,
  };
  const [currentFilter, setCurrentFilter] = useState({ ...blankFilter });
  const [orGroupFilters, setOrGroupFilters] = useState(
    Array(3).fill({ ...blankFilter }),
  );
  const handleOrFilterChange = (index: number, updatedFilter: any) => {
    setOrGroupFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index] = updatedFilter;
      return newFilters;
    });
  };

  useEffect(() => {
    // Dispatch INIT_FILTERS action when the component mounts
    dispatch({
      type: TableViewsAction.INIT,
      payload: { modelName, filters },
    });
  }, []);

  const addFilter = () => {
    const newFilter1 = { ...currentFilter };
    const newFilter2 = { ...orGroupFilters[0] };
    const newFilter3 = { ...orGroupFilters[1] };
    const newFilter4 = { ...orGroupFilters[2] };

    dispatch({
      type: TableViewsAction.ADD_FILTER,
      payload: {
        modelName,
        filter1: newFilter1,
        filter2: newFilter2,
        filter3: newFilter3,
        filter4: newFilter4,
      },
    });

    setFilters([
      ...filters,
      {
        filter1: newFilter1,
        filter2: newFilter2,
        filter3: newFilter3,
        filter4: newFilter4,
        modelName,
      },
    ]);
    setCurrentFilter({ ...blankFilter });
    setOrGroupFilters(Array(3).fill({ ...blankFilter }));

    setHideOR(true);
  };

  const removeFilters = () => {
    // Dispatch REMOVE_FILTER action when a filter is removed
    dispatch({
      type: TableViewsAction.REMOVE_FILTER,
      payload: { modelName },
    });
    setFilters([]);
    setHideOR(true);
  };

  const renderFilter = (filter: any) => {
    return (
      <>
        {filter.value && (
          <>
            {filter.field}
            {filter.not && <> {'NOT'} </>}
            {filter.operator}
            {filter.value}
          </>
        )}
      </>
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [hideOR, setHideOR] = useState(true);

  return (
    <div className='conv-filters'>
      <Button
        title='Filter'
        variant='primary'
        onClick={() => setShowModal(true)}
      >
        Filters
      </Button>
      {/* Button to open the modal */}
      {/* Modal component */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Filter: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*Filters*/}
          <select
            value={currentFilter.field}
            onChange={(e) =>
              setCurrentFilter({ ...currentFilter, field: e.target.value })
            }
          >
            {fields.map((field, index) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <option key={index} value={field}>
                {field}
              </option>
            ))}
          </select>
          <label>
            Not
            <input
              id='Not'
              type='checkbox'
              className='not-checkbox'
              checked={currentFilter.not}
              onChange={(e) =>
                setCurrentFilter({ ...currentFilter, not: e.target.checked })
              }
            />
          </label>
          <select
            value={currentFilter.operator}
            onChange={(e) =>
              setCurrentFilter({ ...currentFilter, operator: e.target.value })
            }
          >
            {/* Add your list of operators here */}
            <option value='=='>Equals</option>
            <option value='!='>Not Equal</option>
            <option value='>'>Greater Than</option>
            <option value='<'>Less Than</option>
            <option value=' contains '>Contains</option>

            {/* Add more operators as needed */}
          </select>
          <input
            type='input'
            className='filter-bar'
            value={currentFilter.value}
            onChange={(e) =>
              setCurrentFilter({ ...currentFilter, value: e.target.value })
            }
          />
        </Modal.Body>
        <span hidden={hideOR} className='ms-1'>
          {/*Filters*/}
          {orGroupFilters.map((orFilter, index) => (
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index}>
              OR
              <select
                value={orFilter.field}
                onChange={(e) =>
                  handleOrFilterChange(index, {
                    ...orFilter,
                    field: e.target.value,
                  })
                }
              >
                {fields.map((field, fieldIndex) => (
                  // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <option key={fieldIndex} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              <label>
                Not
                <input
                  id={`Not_${index}`}
                  type='checkbox'
                  className='not-checkbox'
                  checked={orFilter.not}
                  onChange={(e) =>
                    handleOrFilterChange(index, {
                      ...orFilter,
                      not: e.target.checked,
                    })
                  }
                />
              </label>
              <select
                value={orFilter.operator}
                onChange={(e) =>
                  handleOrFilterChange(index, {
                    ...orFilter,
                    operator: e.target.value,
                  })
                }
              >
                {/* Add your list of operators here */}
                <option value='=='>Equals</option>
                <option value='!='>Not Equal</option>
                <option value='>'>Greater Than</option>
                <option value='<'>Less Than</option>
                <option value=' contains '>Contains</option>
                {/* Add more operators as needed */}
              </select>
              <input
                type='input'
                className='filter-bar'
                value={orFilter.value}
                onChange={(e) =>
                  handleOrFilterChange(index, {
                    ...orFilter,
                    value: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </span>
        <Modal.Body>
          Active Filters:
          {/* List of active filters: */}
          {filters.map((filter, index) => (
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index}>
              {renderFilter(filter.filter1)}
              {filter.filter1.value.length > 0 &&
                filter.filter2.value.length > 0 &&
                ' OR '}
              {renderFilter(filter.filter2)}
              {(filter.filter1.value.length > 0 ||
                filter.filter2.value.length > 0) &&
                filter.filter3.value.length > 0 &&
                ' OR '}
              {renderFilter(filter.filter3)}
              {(filter.filter1.value.length > 0 ||
                filter.filter2.value.length > 0 ||
                filter.filter3.value.length > 0) &&
                filter.filter4.value.length > 0 &&
                ' OR '}
              {renderFilter(filter.filter4)}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          {/* "Add Filter" and "Reset Filters" buttons here */}
          <Button
            type='button'
            variant='primary'
            onClick={() => setHideOR(false)}
          >
            OR Group
          </Button>
          <Button type='button' variant='success' onClick={addFilter}>
            Add Filter
          </Button>
          <Button variant='warning' type='button' onClick={removeFilters}>
            Reset Filters
          </Button>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModelIndexTableFilter;
