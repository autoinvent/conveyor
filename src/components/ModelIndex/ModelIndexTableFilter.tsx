import { useEffect, useState } from 'react';
import { BaseProps, FieldData } from '../../types';
import { Button, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import { TableViewsAction } from '../../reducers/tableViewsReducer';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { set } from 'react-hook-form';

interface ModelIndexTableFilterProps extends BaseProps {
  modelName: string;
  fields: string[];
  fieldsData: Record<string, FieldData>;
  filters: any[];
  setFilters: any;
  dispatch: any;
  setSorts: any;
}

interface FilterItem {
  path: string;
  op: string;
  not?: boolean;
  value?: any;
  model: string;
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
  const blankFilter: FilterItem = {
    path: fields[0],
    op: 'eq', // Default operator, adjust as needed
    not: false,
    value: [0],
    model: modelName,
  };
  const [currentFilter, setCurrentFilter] = useState(blankFilter);
  const [activeTab, setActiveTab] = useState('filters');

  const handleAndFilterChange = (
    groupIndex: number,
    filterIndex: number,
    updatedFilter: FilterItem,
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
    const newFilter: FilterItem = { ...currentFilter, model: modelName };
    dispatch({
      type: TableViewsAction.ADD_FILTER,
      payload: { modelName, updatedAndGroupFilters: [newFilter] },
    });
    setFilters((prevFilters: any) => [...prevFilters, [newFilter]]);
    setCurrentFilter(blankFilter);
  };

  const removeFilters = () => {
    dispatch({
      type: TableViewsAction.REMOVE_FILTER,
      payload: { modelName },
    });
    setFilters([]);
    setCurrentFilter({...blankFilter});
  };

  const handleFieldChange = (
    pathName: string,
    filter: FilterItem,
    isCurrent: boolean,
  ) => {
    let defaultOperator = 'eq';
    let defaultValue: any = 0;
    let defaultType: any;

    const [fieldRelated, fieldName] = pathName.split('.');
    const relatedFieldData = fieldsData[fieldRelated]?.related?.fieldsData;
    if (relatedFieldData?.[fieldName]) {
      defaultType = relatedFieldData[fieldName].type;
    } else {
      defaultType = fieldsData[pathName]?.type;
    }

    const modelNameForField = relatedFieldData ? fieldRelated : modelName;

    switch (defaultType) {
      case 'Int!':
      case 'Int':
        defaultOperator = 'eq';
        defaultValue = 0;
        break;
      case 'String':
      case 'String!':
        defaultOperator = 'eq';
        defaultValue = '';
        break;
      case 'DateTime':
      case 'DateTime!':
        defaultOperator = 'eq';
        defaultValue = '2024-01-01T00:00:00';
        break;
      case 'Boolean':
      case 'Boolean!':
        defaultOperator = 'eq';
        defaultValue = false;
        break;
      // Add more cases for other field types as needed
      default:
        break;
    }
    if (isCurrent) {
      setCurrentFilter({
        ...currentFilter,
        path: pathName,
        op: defaultOperator,
        value: [defaultValue],
        model: modelNameForField,
      });
    } else {
      filter.path = pathName;
      filter.op = defaultOperator;
      filter.value = [defaultValue];
    }
  };

  const handleAddFilterToGroup = (groupIndex: number) => {
    const updatedFilters = [...filters];
    updatedFilters[groupIndex] = [...updatedFilters[groupIndex], {...blankFilter, model: modelName}];
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

  const renderInputOptions = () => {
    let defaultType: any;

    const [fieldRelated, fieldName] = currentFilter.path.split('.');
    const relatedFieldData = fieldsData[fieldRelated]?.related?.fieldsData;
    if (relatedFieldData?.[fieldName]) {
      defaultType = relatedFieldData[fieldName].type;
    } else {
      defaultType = fieldsData[currentFilter.path].type;
    }

    switch (defaultType) {
      case 'DateTime':
      case 'DateTime!':
        return (
          <input
            type='datetime-local'
            className='filter-bar'
            value={currentFilter.value}
            onChange={(e) => {
              setCurrentFilter({ ...currentFilter, value: e.target.value });
            }}
          />
        );
      case 'Boolean':
      case 'Boolean!':
        return (
          <select
            className='filter-bar'
            value={String(currentFilter.value)}
            onChange={(e) => {
              setCurrentFilter({
                ...currentFilter,
                value: [e.target.value === 'true'],
              });
            }}
          >
            {/* Render option elements */}
            <option key='true' value={'true'}>
              True
            </option>
            <option key='false' value={'false'}>
              False
            </option>
          </select>
        );
      default:
        // Render default input field
        return (
          <input
            type='text'
            className='filter-bar'
            value={currentFilter.value}
            onChange={(e) => {
              setCurrentFilter({ ...currentFilter, value: e.target.value });
            }}
          />
        );
    }
  };

  const renderOperatorOptions = (filter: FilterItem) => {
    let defaultType: any;

    const [fieldRelated, fieldName] = filter.path.split('.');
    const relatedFieldData = fieldsData[fieldRelated]?.related?.fieldsData;
    if (relatedFieldData?.[fieldName]) {
      defaultType = relatedFieldData[fieldName].type;
    } else {
      defaultType = fieldsData[filter.path]?.type;
    }
    if (defaultType) {
      switch (defaultType) {
        case 'Int!':
        case 'Int':
          if (isNaN(Number(filter.value))) {
            filter.value = 0;
          }
          filter.value = [Number(filter.value)];
          return (
            <>
              <option key='==' value='eq'>
                Equals
              </option>
              <option key='>' value='gt'>
                Greater Than
              </option>
              <option key='<' value='lt'>
                Less Than
              </option>
              <option key='GEQ' value='ge'>
                GEQ
              </option>
              <option key='LEQ' value='le'>
                LEQ
              </option>
            </>
          );
        case 'String':
        case 'String!':
          filter.value = [String(filter.value)];
          return (
            <>
              <option key='Equals' value='eq'>
                Equals
              </option>
              <option key='Like' value='like'>
                Similar to
              </option>
            </>
          );
        case 'DateTime':
        case 'DateTime!':
          filter.value = [String(filter.value)];
          return (
            <>
              <option key='==' value='eq'>
                Equals
              </option>
              <option key='>' value='gt'>
                After
              </option>
              <option key='<' value='lt'>
                Before
              </option>
              <option key='GEQ' value='ge'>
                At or After
              </option>
              <option key='LEQ' value='le'>
                At or Before
              </option>
            </>
          );
        case 'Boolean':
        case 'Boolean!':
          return (
            <>
              <option key='Is' value='eq'>
                Equals
              </option>
            </>
          );
        default:
          return (
            <>
              <option key='Equals' value='eq'>
                Equals
              </option>
              <option key='Like' value='like'>
                Similar to
              </option>
            </>
          );
      }
} else {
      filter.path = fields[0];
      filter.value = 0;
      return (
        <>
          <option key='Equals' value='eq'>
            Equals
          </option>
        </>
      );
    }
  };

  const renderFilter = (
    filter: FilterItem,
    index: number,
    groupIndex: number,
  ) => {
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

    const renderInputOptionsTabs = () => {
      let defaultType: any;

    const [fieldRelated, fieldName] = filter.path.split('.');
    const relatedFieldData = fieldsData[fieldRelated]?.related?.fieldsData;
    if (relatedFieldData?.[fieldName]) {
      defaultType = relatedFieldData[fieldName].type;
    } else {
      defaultType = fieldsData[filter.path]?.type;
    }
      switch (defaultType) {
        // Render input field
        case 'DateTime':
        case 'DateTime!':
          return (
            <input
              type='datetime-local'
              className='filter-bar'
              value={filter.value}
              onChange={(e) => {
                handleChange('value', e.target.value);
              }}
            />
          );
        case 'Boolean':
        case 'Boolean!':
          return (
            <select
              value={String(filter.value)}
              onChange={(e) => {
                handleChange('value', [e.target.value === 'true']);
              }}
            >
              {/* Render option elements */}
              <option key='true' value={'true'}>
                True
              </option>
              <option key='false' value={'false'}>
                False
              </option>
            </select>
          );
        default:
          // Render default input field
          return (
            <input
              type='text'
              className='filter-bar'
              value={filter.value}
              onChange={(e) => {
                handleChange('value', e.target.value);
              }}
            />
          );
      }
    };

    const renderTrashButton = () => {
      return (
        <td>
          <Button variant='danger' onClick={handleDeleteClick}>
            <FaRegTrashAlt />
          </Button>
        </td>
      );
    };
    if (filter.model && filter.model !== modelName) {
      return (
        <tr>
          <td>
            <select value={filter.path} disabled>
              <option value={filter.path}>{filter.path}</option>
            </select>
          </td>
          <td>
            {'Not'}
            <input
              type='checkbox'
              checked={filter.not}
              className='not-checkbox'
              readOnly
            />
          </td>
          <td>
            <select value={filter.op} disabled>
              <option value={filter.op}>{filter.op}</option>
            </select>
          </td>
          <td>
            <input value={filter.value} className='filter-bar' readOnly />
          </td>
          {renderTrashButton()}
        </tr>
      );
    } else {
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
            {Object.keys(fieldsData).map((fieldName, index) => {
                  const fieldData = fieldsData[fieldName];
                  if (fieldData.related) {
                    // If the field has a related property, render related fields
                    return fieldData.related.fields?.map(
                      (relatedFieldName, idx) => (
                        <option
                          key={`${fieldName}_${relatedFieldName}`}
                          value={`${fieldName}.${relatedFieldName}`}
                        >
                          {`${fieldName}.${relatedFieldName}`}
                        </option>
                      ),
                    );
                  } else {
                    // If not related, render the field normally
                    return (
                      <option
                        // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        value={fieldName}
                      >
                        {fieldName}
                      </option>
                    );
                  }
                })}
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
        <td>{renderInputOptionsTabs()}</td>
        {renderTrashButton()}
      </tr>
    );
              }
  };

  const renderFiltersTable = (
    filter: FilterItem,
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
          {filters?.map((filter: FilterItem, filterIndex: number) => (
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
                {Object.keys(fieldsData).map((fieldName, index) => {
                  const fieldData = fieldsData[fieldName];
                  if (fieldData.related) {
                    // If the field has a related property, render related fields
                    return fieldData.related.fields?.map(
                      (relatedFieldName, idx) => (
                        <option
                          key={`${fieldName}_${relatedFieldName}`}
                          value={`${fieldName}.${relatedFieldName}`}
                        >
                          {`${fieldName}.${relatedFieldName}`}
                        </option>
                      ),
                    );
                  } else {
                    // If not related, render the field normally
                    return (
                      <option
                        // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        value={fieldName}
                      >
                        {fieldName}
                      </option>
                    );
                  }
                })}
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
              {renderInputOptions()}
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
