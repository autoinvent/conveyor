import { useEffect, useState } from 'react';
import { BaseProps, FieldData } from '../../types';
import { Button, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import { TableViewsAction } from '../../reducers/tableViewsReducer';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';

interface ModelIndexTableFilterProps extends BaseProps {
  modelName: string;
  fields: string[];
  fieldsData: Record<string, FieldData>;
  filters: any[];
  setFilters: any;
  dispatch: any;
  setSorts: any;
}

const ModelIndexTableFilter = ({
  modelName,
  fields,
  fieldsData,
  filters,
  setFilters,
  dispatch,
  setSorts,
}: ModelIndexTableFilterProps) => {
  const defaultValue: any = 0;
  const blankFilter = {
    path: `${modelName}.${fields[0]}`,
    op: '==', // Default operator, adjust as needed
    not: false,
    value: defaultValue,
  };
  const [currentFilter, setCurrentFilter] = useState({ ...blankFilter });
  const [activeTab, setActiveTab] = useState('filters');

  const handleAndFilterChange = (
    groupIndex: number,
    filterIndex: number,
    updatedFilter: any,
    deleted: boolean,
  ) => {
    setFilters((prevFilters: any) => {
      const newFilters = [...prevFilters];
      newFilters[groupIndex][filterIndex] = updatedFilter;
      if (deleted) {
        newFilters[groupIndex].splice(filterIndex, 1);
      }
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
    const updatedAndGroupFilters = [{ ...newFilter }];
    dispatch({
      type: TableViewsAction.ADD_FILTER,
      payload: { updatedAndGroupFilters },
    });
    setFilters([...filters, updatedAndGroupFilters]);
    setCurrentFilter({ ...blankFilter });
  };

  const removeFilters = () => {
    dispatch({
      type: TableViewsAction.REMOVE_FILTER,
      payload: { modelName },
    });
    setFilters([]);
    setCurrentFilter({ ...blankFilter });
  };

  const handleFieldChange = (
    pathName: string,
    filter: any,
    isCurrent: boolean,
  ) => {
    const [modelName, fieldName] = pathName.split('.');
    const fieldType = fieldsData[fieldName].type;
    let defaultOperator = '=='; // Default operator for unknown field
    let defaultValue: any = 0;
    switch (fieldType) {
      case 'Int!':
      case 'Int':
        defaultOperator = '==';
        defaultValue = 0;
        break;
      case 'String':
      case 'String!':
        defaultOperator = '==';
        defaultValue = 'message';
        break;
      case 'DateTime':
      case 'DateTime!':
        defaultOperator = '>';
        defaultValue = '2024-01-01T00:00:00';
        break;
      case 'Boolean':
      case 'Boolean!':
        defaultOperator = '==';
        defaultValue = true;
        break;
      // Add more cases for other field types as needed
      default:
        break;
    }
    if (isCurrent) {
      setCurrentFilter({
        ...currentFilter,
        path: `${modelName}.${fieldName}`,
        op: defaultOperator,
        value: defaultValue,
      });
    } else {
      filter.path = `${modelName}.${fieldName}`;
      filter.op = defaultOperator;
      filter.value = defaultValue;
    }
  };

  const handleAddFilterToGroup = (groupIndex: number) => {
    const updatedFilters = [...filters];
    updatedFilters[groupIndex] = [...updatedFilters[groupIndex], blankFilter];
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

  const renderOperatorOptions = (filter: any) => {
    const [modelName, fieldName] = filter.path.split('.');
    const typeOfField = fieldsData[fieldName].type;
    switch (typeOfField) {
      case 'Int!':
      case 'Int':
        filter.value = Number(filter.value);
        return (
          <>
            <option key='==' value='=='>
              Equals
            </option>
            <option key='!=' value='!='>
              Not Equal
            </option>
            <option key='>' value='>'>
              Greater Than
            </option>
            <option key='<' value='<'>
              Less Than
            </option>
            <option key='GEQ' value='>='>
              GEQ
            </option>
            <option key='LEQ' value='=<'>
              LEQ
            </option>
          </>
        );
      case 'String':
      case 'String!':
        filter.value = String(filter.value);
        return (
          <>
            <option key='Equals' value='=='>
              Is
            </option>
            <option key='Not' value='neq'>
              Is Not
            </option>
            <option key='Exists' value='Exists'>
              Exists
            </option>
            <option key='DNE' value='DNE'>
              Does Not Exist
            </option>
            <option key='Contains' value='Contains'>
              Contains
            </option>
          </>
        );
      case 'DateTime':
      case 'DateTime!':
        filter.value = String(filter.value);
        return (
          <>
            <option key='Before' value='>'>
              Before
            </option>
            <option key='After' value='<'>
              After
            </option>
            <option key='On' value='contains'>
              On
            </option>
            <option key='NotOn' value='!contains'>
              Not On
            </option>
          </>
        );
      case 'Boolean':
      case 'Boolean!':
        filter.value = Boolean(filter.value);
        return (
          <>
            <option key='Is' value='=='>
              Is
            </option>
            <option key='IsNot' value='!='>
              Is Not
            </option>
          </>
        );
      default:
        filter.value = String(filter.value);
        return (
          <>
            <option key='Equals' value='Equals'>
              Equals
            </option>
            <option key='Not' value='NEQ'>
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
            <option key='Contains' value='Contains'>
              Contains
            </option>
          </>
        );
    }
  };

  const renderFilter = (filter: any, index: number, groupIndex: number) => {
    console.log('Filter', filter);
    if (!filter) {
      return null;
    }
    const handleChange = (key: string, value: any) => {
      const updatedFilter = { ...filter, [key]: value };
      handleAndFilterChange(groupIndex, index, updatedFilter, false);
    };

    const handleDeleteClick = () => {
      handleAndFilterChange(groupIndex, index, filter, true);
    };

    return (
      <tr key={`filter_${index}`}>
        <td>
          <select
            value={filter.path}
            onChange={(e) => {
              handleFieldChange(e.target.value, filter, false);
              handleChange('path', filter.path);
              handleChange('op', filter.op);
              handleChange('value', filter.value);
            }}
          >
            {fields.map((field, idx) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <option key={idx} value={`${modelName}.${field}`}>
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
            value={filter.op}
            onChange={(e) => handleChange('op', e.target.value)}
          >
            {renderOperatorOptions(filter)}
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
          <Button variant='danger' onClick={handleDeleteClick}>
            <FaRegTrashAlt />
          </Button>
        </td>
      </tr>
    );
  };

  const renderFiltersTable = (
    filter: any,
    index: number,
    groupIndex: number,
  ) => (
    <table key={`group_${groupIndex}`}>
      <thead>
        <tr>
          <th align='center' title='Field' />
          <th align='center' title='Not' />
          <th align='center' title='Operator' />
          <th align='center' title='Value' />
        </tr>
      </thead>
      <tbody>{renderFilter(filter, index, groupIndex)}</tbody>
    </table>
  );

  const renderTabs = () => {
    return Object.entries(filters ?? {}).map(([modelName, filters], index) => (
      <Tab
        key={`filterGroup${index}`}
        eventKey={`filterGroup${index}`}
        title={`FilterGroup ${index + 1}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Filter Group: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filters?.map((filter: any, filterIndex: number) => (
            <Row key={`filterGroup${index}-${filterIndex}`}>
              {renderFiltersTable(filter, filterIndex, index)}
            </Row>
          ))}
          <Button variant='info' onClick={() => handleAddFilterToGroup(index)}>
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
              <Modal.Title>Create a Filter:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <select
                value={currentFilter.path}
                onChange={(e) =>
                  handleFieldChange(e.target.value, currentFilter, true)
                }
              >
                {fields.map((field, index) => (
                  // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <option key={index} value={`${modelName}.${field}`}>
                    {field}
                  </option>
                ))}
              </select>
              <label>
                Not
                <input
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
                value={currentFilter.op}
                onChange={(e) =>
                  setCurrentFilter({ ...currentFilter, op: e.target.value })
                }
              >
                {renderOperatorOptions(currentFilter)}
              </select>
              <input
                type='input'
                className='filter-bar'
                value={currentFilter.value}
                onChange={(e) =>
                  setCurrentFilter({ ...currentFilter, value: e.target.value })
                }
              />
              <Button type='button' variant='success' onClick={addFilter}>
                <FaPlus />
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='outline-warning' onClick={removeFilters}>
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
