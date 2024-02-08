import { useEffect, useState } from 'react';
import { BaseProps } from '../../types';
import { Button, Modal, Tab, Table, Tabs } from 'react-bootstrap';
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
  const [andGroupFilters, setAndGroupFilters] = useState([{}]);
  const [showFilterGroupTab, setShowFilterGroupTab] = useState(false); // State variable to control visibility of the filter group tab
  const [totalFilterGroup, setTotalFilterGroup] = useState([[{}]]);
  const handleAndFilterChange = (index: number, updatedFilter: any) => {
    setAndGroupFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index] = updatedFilter;
      return newFilters;
    });
  };

  useEffect(() => {
    dispatch({
      type: TableViewsAction.INIT,
      payload: { modelName, filters },
    });
  }, []);

  const addFilter = () => {
    const newFilter = { ...currentFilter };
    const updatedAndGroupFilters = [...andGroupFilters, newFilter]; // Update andGroupFilters
    setAndGroupFilters(updatedAndGroupFilters); // Update state
    const totalFilters = [...totalFilterGroup, updatedAndGroupFilters]
    setTotalFilterGroup(totalFilters);

    dispatch({
      type: TableViewsAction.ADD_FILTER,
      payload: {
        modelName,
        filters: updatedAndGroupFilters, // Pass updated andGroupFilters to the payload
      },
    });

    setFilters([
      ...filters,
      {
        filters: updatedAndGroupFilters,
        modelName,
      },
    ]);
    setCurrentFilter({ ...blankFilter });
    setShowFilterGroupTab(true);
  };

  const saveFilterGroup = () => {
    dispatch({
      type: TableViewsAction.REMOVE_FILTER,
      payload: { modelName },
    });
    dispatch({
      type: TableViewsAction.ADD_FILTER,
      payload: {
        modelName,
        filters: totalFilterGroup,
      },
    });
    setFilters([
      {
        filters: totalFilterGroup,
        modelName,
      },
    ]);
  };

  const removeFilters = () => {
    dispatch({
      type: TableViewsAction.REMOVE_FILTER,
      payload: { modelName },
    });
    setFilters([]);
    setCurrentFilter({ ...blankFilter }); // Reset current filter to default
    setAndGroupFilters([]); // Reset andGroupFilters to default
    setShowFilterGroupTab(false);
    setTotalFilterGroup([[{}]]);
  };

  const renderFilter = (filter: any, index: number) => {
    const handleChange = (key: any, value: any) => {
      const updatedFilter = { ...filter, [key]: value };
      handleAndFilterChange(index, updatedFilter);
    };

    return (
      <tr key={index}>
        <td>
          <select
            value={filter.field}
            onChange={(e) => handleChange('field', e.target.value)}
          >
            {/* Options for filter field */}
            {fields.map((field, idx) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <option key={idx} value={field}>
                {field}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            type='checkbox'
            checked={filter.not}
            onChange={(e) => handleChange('not', e.target.checked)}
          />
        </td>
        <td>
          <select
            value={filter.operator}
            onChange={(e) => handleChange('operator', e.target.value)}
          >
            <option value='=='>Equals</option>
            <option value='!='>Not Equal</option>
            <option value='>'>Greater Than</option>
            <option value='<'>Less Than</option>
            <option value='contains'>Contains</option>
          </select>
        </td>
        <td>
          <input
            type='text'
            value={filter.value}
            onChange={(e) => handleChange('value', e.target.value)}
          />
        </td>
      </tr>
    );
  };

  const renderFiltersTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Not</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {andGroupFilters.map((filter, index) => renderFilter(filter, index))}
        </tbody>
      </table>
    );
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='conv-filters'>
      <Button
        title='Filter'
        variant='primary'
        onClick={() => setShowModal(true)}
      >
        Filters
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Tabs defaultActiveKey='filters' id='filter-tabs'>
          <Tab eventKey='filters' title='Filters'>
            <Modal.Header closeButton>
              <Modal.Title>Create a Filter: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    setCurrentFilter({
                      ...currentFilter,
                      not: e.target.checked,
                    })
                  }
                />
              </label>
              <select
                value={currentFilter.operator}
                onChange={(e) =>
                  setCurrentFilter({
                    ...currentFilter,
                    operator: e.target.value,
                  })
                }
              >
                <option value='=='>Equals</option>
                <option value='!='>Not Equal</option>
                <option value='>'>Greater Than</option>
                <option value='<'>Less Than</option>
                <option value='contains'>Contains</option>
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
            <Modal.Footer>
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
          </Tab>
          <Tab title='filter1' eventKey='filter1' hidden={!showFilterGroupTab}>
            <Modal.Header closeButton>
              <Modal.Title>Create a Filter: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {renderFiltersTable()}
              <Button onClick={saveFilterGroup}>Save</Button>
            </Modal.Body>
          </Tab>
        </Tabs>
      </Modal>
    </div>
  );
};

export default ModelIndexTableFilter;
