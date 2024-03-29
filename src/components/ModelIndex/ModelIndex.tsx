import { memo, FC, ReactNode } from 'react';
import { Button, Container } from 'react-bootstrap';

import { Page } from '../../enums';
import { useTableView } from '../../hooks/useTableView';
import { PACKAGE_ABBR } from '../../package';
import { DEFAULT_TABLE_VIEW } from '../../reducers/tableViewsReducer';
import { BaseProps, FieldData } from '../../types';
import { humanizeText } from '../../utils/common';
import ModelNav from '../ModelNav';

import ModelIndexTable from './ModelIndexTable';

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
  return (
    <Container id={id} className={className}>
      {children ?? (
        <>
          <div id={id} className={`${PACKAGE_ABBR}-model-title`}>
            <h2>{title}</h2>
            {/* TODO: Filter under construction */}
            <ModelNav modelName={modelName} modelId={Page.CREATE}>
              <Button>Create</Button>
            </ModelNav>
          </div>
          <ModelIndexTable
            modelName={modelName}
            fields={fields}
            fieldsData={fieldsData}
            editable={editable}
            deletable={deletable}
          />
        </>
      )}
    </Container>
  );
};

export default memo(ModelIndex) as FC<ModelIndexProps>;
