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
  const [currentFilter, setCurrentFilter] = useState({
    field: fields[0] || '',
    operator: '==', // Default operator, adjust as needed
    value: '',
  });

  useEffect(() => {
    // Dispatch INIT_FILTERS action when the component mounts
    dispatch({
      type: TableViewsAction.INIT,
      payload: { modelName, filters },
    });
  }, []);

  const addFilter = () => {
    // Dispatch ADD_FILTER action when a new filter is added
    dispatch({
      type: TableViewsAction.ADD_FILTER,
      payload: {
        modelName,
        fieldName: currentFilter.field,
        operator: currentFilter.operator,
        value: currentFilter.value,
      },
    });
    setFilters([...filters, { ...currentFilter, modelName }]);
    setCurrentFilter({
      field: fields[0] || '',
      operator: '==',
      value: '',
    });
  };

  const removeFilters = (fieldName: any) => {
    // Dispatch REMOVE_FILTER action when a filter is removed
    dispatch({
      type: TableViewsAction.REMOVE_FILTER,
      payload: { modelName, fieldName },
    });
    setFilters([]);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='conv-filters'>
      <Button
        title='Filter'
        variant='primary'
        onClick={() => setShowModal(true)}
      >
        {filters.map((filter, index) => (
          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index}>
            {filter.field}
            {filter.operator}
            {filter.value}
          </div>
        ))}
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

          {/*
        <label>
          Not
          <input
            id='Not'
            type='checkbox'
            className='not-checkbox'
            checked={currentFilter.not}
            onChange={() =>
              setCurrentFilter({ ...currentFilter, not: !currentFilter.not })
            }
          />
        </label>
        */}
          <select
            value={currentFilter.operator}
            onChange={(e) =>
              setCurrentFilter({ ...currentFilter, operator: e.target.value })
            }
          >
            {/* Add your list of operators here */}
            <option value='=='>Equals</option>
            <option value='!='>Not Equals</option>

            {/* Add more operators as needed */}
          </select>

          <input
            type='text'
            className='filter-bar'
            value={currentFilter.value}
            onChange={(e) =>
              setCurrentFilter({ ...currentFilter, value: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          {/* "Add Filter" and "Reset Filters" buttons here */}
          <Button type='button' onClick={addFilter}>
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
