import { useNavigate, useParams } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { useConveyor } from '../Conveyor';

export interface ModelCreatePage {
  model?: string;
}

export const ModelCreatePage = ({ model }: ModelCreatePage) => {
  const params = useParams({ from: '/$model/create' });
  const currModel: string = model ?? params.model ?? '';
  const navigate = useNavigate();
  const { addAlert } = useAlerts();

  const { selected } = useConveyor((state) => ({
    model: state.models?.[currModel],
    fetcher: state.fetcher,
  }));
  const fieldNames = Object.keys(selected.model.fields);
  return (
    <div>
      {fieldNames.map((fieldName) => {
        return (
          <label key={fieldName}>
            {fieldName}
            <input />
          </label>
        );
      })}
    </div>
  );
};
