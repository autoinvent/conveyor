import { memo, FC, ReactNode, useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';

import { Page } from '../../enums';
import { useTableView } from '../../hooks/useTableView';
import { PACKAGE_ABBR } from '../../package';
import {
  DEFAULT_TABLE_VIEW,
  SortDirection,
  TableViewFilter,
} from '../../reducers/tableViewsReducer';
import { BaseProps, FieldData } from '../../types';
import { humanizeText } from '../../utils/common';
import ModelNav from '../ModelNav';

import ModelIndexTable from './ModelIndexTable';
import ModelIndexTableFilter from './ModelIndexTableFilter';

interface ModelIndexProps extends BaseProps {
  modelName: string;
  fields: string[];
  title?: string | JSX.Element;
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
  children?: ReactNode;
}

const ModelIndex = ({
  id,
  className,
  modelName,
  fields,
  title = humanizeText(modelName),
  fieldsData,
  editable = true,
  deletable = true,
  children,
}: ModelIndexProps) => {
  // Will save onto some storage and retrieve the tableView in the future
  useTableView({
    modelName,
    tableView: JSON.parse(JSON.stringify(DEFAULT_TABLE_VIEW)),
  });
  const { dispatch } = useTableView({ modelName });
  const [filters, setFilters] = useState<
    {
      filters: TableViewFilter[];
      modelName: string;
    }[]
  >([]); // State to manage filters

  useEffect(() => {
    // Save filters and sorts to local storage when they change
    localStorage.setItem(`${modelName}_filters`, JSON.stringify(filters));
  }, [filters, modelName]);

  const [sorts, setSorts] = useState<
    {
      direction: SortDirection;
      field: string;
    }[]
  >([]);
  useEffect(() => {
    // Save filters and sorts to local storage when they change
    localStorage.setItem(`${modelName}_filters`, JSON.stringify(sorts));
  }, [sorts, modelName]);

  return (
    <Container id={id} className={className}>
      {children ?? (
        <>
          <div id={id} className={`${PACKAGE_ABBR}-model-title`}>
            <h2>{title}</h2>
            {/* TODO: Filter under construction */}
            <ModelIndexTableFilter
              modelName={modelName}
              fields={fields}
              filters={filters}
              setFilters={setFilters}
              setSorts={setSorts}
              dispatch={dispatch}
            />
            <ModelNav modelName={modelName} modelId={Page.CREATE}>
              <Button variant='success'>Create</Button>
            </ModelNav>
          </div>
          <ModelIndexTable
            modelName={modelName}
            fields={fields}
            fieldsData={fieldsData}
            editable={editable}
            deletable={deletable}
            filters={filters}
            setSorts={setSorts}
            sorts={sorts}
          />
        </>
      )}
    </Container>
  );
};

export default memo(ModelIndex) as FC<ModelIndexProps>;
