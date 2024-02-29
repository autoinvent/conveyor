import { useContext } from 'react';

import { ConveyorContext } from '../../contexts/ConveyorContext';
import { BaseProps, FieldData } from '../../types';
import { getAvailableKeys, gqlTypeToFlexType } from '../../utils/gqlRequest';
import ModelNav from '../ModelNav';
import Checkbox from '../commons/Checkbox';
import { InputTypes } from '../commons/FlexibleInput';
import { Card } from 'react-bootstrap';
import DateTime from '../commons/DateTime';
interface ModelFormValueProps extends BaseProps {
  modelName: string;
  fields: string[];
  field: string;
  data: Record<string, any>;
  fieldData?: FieldData;
}

const ModelFormValue = ({
  id,
  className,
  modelName,
  fields,
  field,
  data,
  fieldData,
}: ModelFormValueProps) => {
  const { primaryKey, secondaryKeys } = useContext(ConveyorContext);
  const type = gqlTypeToFlexType(fieldData?.type ?? 'String');
  const currData = data?.[field];
  const related = fieldData?.related;
  let displayData = currData;
  const keyFallbacks = [primaryKey].concat(secondaryKeys ?? []);
  if (related) {
    const availableKeys = getAvailableKeys(related.fields ?? [], keyFallbacks);
    if (!related.many) {
      displayData = displayData ? [displayData] : [];
    }
    displayData = displayData?.map(
      (val: Record<string, any>, index: number) => (
        <ModelNav
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          modelName={related?.modelName}
          modelId={val[primaryKey]}
        >
          <Card.Link>
            {val?.[availableKeys.at(1) ?? primaryKey]}
            {index !== displayData?.length - 1 && ','}
          </Card.Link>
        </ModelNav>
      ),
    );
  } else if (getAvailableKeys(fields, keyFallbacks).includes(field)) {
    displayData = (
      <ModelNav modelName={modelName} modelId={data[primaryKey]}>
        <Card.Link>{currData}</Card.Link>
      </ModelNav>
    );
  } else if (type === InputTypes.BOOLEAN) {
    displayData = <Checkbox value={currData} disabled={true} />;
  } else if (type === InputTypes.DATETIME) {
    displayData = <DateTime date={currData} />;
  }

  return (
    <span id={id} className={className}>
      {displayData}
    </span>
  );
};

export default ModelFormValue;
