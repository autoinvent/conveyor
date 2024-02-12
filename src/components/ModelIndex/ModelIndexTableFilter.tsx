import { useEffect, useState } from 'react';
import { BaseProps, FieldData } from '../../types';
import { Button, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import { TableViewsAction } from '../../reducers/tableViewsReducer';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';

interface ModelIndexTableFilterProps extends BaseProps {
  modelName: string;
  fields: string[];
  filters: any[];
  setFilters: any;
  dispatch: any;
  setSorts: any;
}

const ModelIndexTableFilter = ({
  modelName,
  fields,
  filters,
  setFilters,
  dispatch,
  setSorts,
}: ModelIndexTableFilterProps) => {
  const blankFilter = {
    field: fields[0] || '',
    operator: '==', // Default operator, adjust as needed
    value: '',
    not: false,
  };
  const [currentFilter, setCurrentFilter] = useState({ ...blankFilter });
  const [andGroupFilters, setAndGroupFilters] = useState([{ ...blankFilter }]);
  const [activeTab, setActiveTab] = useState('filters');

  const handleAndFilterChange = (
    groupIndex: number,
    filterIndex: number,
    updatedFilter: any,
    deleted: boolean,
  ) => {
    setFilters((prevGroups: any) => {
      const newGroups = [...prevGroups];
      newGroups[groupIndex].filters[filterIndex] = updatedFilter;
      return newGroups;
    });
    if (deleted) {
      setFilters((prevGroups: any) => {
        const newGroups = [...prevGroups];
        newGroups[groupIndex].filters.splice(filterIndex, 1);
        return newGroups;
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: TableViewsAction.INIT,
      payload: { modelName, filters },
    });
  }, []);

  const addFilter = () => {
    const newFilter = { ...currentFilter };
    const updatedAndGroupFilters = [newFilter];

    dispatch({
      type: TableViewsAction.ADD_FILTER,
      payload: {
        modelName,
        filters: updatedAndGroupFilters,
      },
    });

    setFilters([
      ...filters,
      {
        filters: updatedAndGroupFilters,
        modelName,
      },
    ]);
    setAndGroupFilters([{ ...blankFilter }]);
    setCurrentFilter({ ...blankFilter });
  };

  const removeFilters = () => {
    dispatch({
      type: TableViewsAction.REMOVE_FILTER,
      payload: { modelName },
    });
    setFilters([]);
    setCurrentFilter({ ...blankFilter });
    setAndGroupFilters([{ ...currentFilter }]);
  };

  const handleAddFilterToGroup = (groupIndex: number) => {
    const updatedFilters = [...filters];
    updatedFilters[groupIndex].filters.push({ ...blankFilter });
    setFilters(updatedFilters);
  };
  const handleRemoveGroup = (groupIndex: number) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(groupIndex, 1);
    setFilters(updatedFilters);
  };
  const resetSort = () => {
    dispatch({
      type: TableViewsAction.CLEAR_SORTS,
      payload: { modelName },
    });
    setSorts([]);
  };

  const renderOperatorOptions = () => {
    return (
      <>
        <option key='Equals' value='=='>
          Equals
        </option>
        <option key='Not' value='!='>
          Not Equal
        </option>
        <option key='Greater' value='>'>
          Greater Than
        </option>
        <option key='Less' value='<'>
          Less Than
        </option>
        <option key='GEQ' value='>='>
          GEQ
        </option>
        <option key='LEQ' value='=<'>
          LEQ
        </option>
        <option key='Contains' value='contains'>
          Contains
        </option>
      </>
    );
  };

  const renderFilter = (filter: any, index: number, groupIndex: number) => {
    const handleChange = (key: any, value: any) => {
      const updatedFilter = { ...filter, [key]: value };
      handleAndFilterChange(groupIndex, index, updatedFilter, false);
    };

    const handleDeleteClick = (input: any) => {
      handleAndFilterChange(groupIndex, index, input, true);
    };

    return (
      <tr key={`filter_${index}`}>
        {/* Assign a unique key */}
        <td>
          <select
            value={filter.field}
            onChange={(e) => {
              handleChange('field', e.target.value);
            }}
          >
            {fields.map((field, idx) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <option key={idx} value={field}>
                {field}
              </option>
            ))}
          </select>
        </td>
        <td>
          {'Not'}
          <input
            type='checkbox'
            checked={filter.not}
            onChange={(e) => handleChange('not', e.target.checked)}
            className='not-checkbox'
          />
        </td>
        <td>
          <select
            value={filter.operator}
            onChange={(e) => handleChange('operator', e.target.value)}
          >
            {renderOperatorOptions()}
          </select>
        </td>
        <td>
          <input
            type='text'
            value={filter.value}
            className='filter-bar'
            onChange={(e) => handleChange('value', e.target.value)}
          />
        </td>
        <td>
          <Button
            variant='danger'
            onClick={(e) => {
              handleDeleteClick(e);
            }}
          >
            {<FaRegTrashAlt />}
          </Button>
        </td>
      </tr>
    );
  };

  const renderFiltersTable = (
    filter: any,
    filterIndex: number,
    groupIndex: number,
  ) => {
    return (
      <table>
        <thead>
          <tr>
            <th align='center' title='Field' />
            <th align='center' title='Not' />
            <th align='center' title='Operator' />
            <th align='center' title='Value' />
          </tr>
        </thead>
        <tbody>{renderFilter(filter, filterIndex, groupIndex)}</tbody>
      </table>
    );
  };

  const renderTabs = () => {
    return filters
      .filter((index) => index !== filters.length)
      .map((group: any, index: number) => (
        <Tab
          key={`filterGroup${index}`}
          eventKey={`filterGroup${index}`}
          title={`FilterGroup ${index + 1}`}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Filter Group: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {group.filters.map((filter: any, filterIndex: number) =>
              <Row key={`filterGroup${index}-${filterIndex}`}>{renderFiltersTable(filter, filterIndex, index)}</Row>
            )}
            <Button
              variant='info'
              onClick={() => handleAddFilterToGroup(index)}
            >
              <FaPlus />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='outline-danger'
              onClick={() => handleRemoveGroup(index)}
            >
              Delete Group
            </Button>
          </Modal.Footer>
        </Tab>
      ));
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
        <Tabs activeKey={activeTab} onSelect={(key: any) => setActiveTab(key)}>
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
                {/* Render operator options based on field type */}
                {renderOperatorOptions()}
              </select>
              <input
                type='input'
                className='filter-bar'
                value={currentFilter.value}
                onChange={(e) =>
                  setCurrentFilter({ ...currentFilter, value: e.target.value })
                }
              />
              <Button
                className='ms-1'
                type='button'
                variant='success'
                onClick={addFilter}
              >
                <FaPlus />
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='outline-warning'
                type='button'
                onClick={removeFilters}
              >
                Reset Filters
              </Button>
              <Button variant='outline-light' onClick={resetSort}>
                Reset Sorts
              </Button>
            </Modal.Footer>
          </Tab>
          {renderTabs()}
        </Tabs>
      </Modal>
    </div>
  );
};

export default ModelIndexTableFilter;
