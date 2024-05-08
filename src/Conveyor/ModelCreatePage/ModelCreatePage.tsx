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
    <div className="w-full">
      <h3 className="w-full text-center font-semibold text-4xl">
        Create Model
      </h3>
      <div className="flex">
        <div className="block w-full md:w-1/2 md:px-4 inset-y-0">
          {fieldNames
            .slice(0, Math.ceil(fieldNames.length / 2))
            .map((fieldName) => (
              <label
                key={fieldName}
                className="flex w-full rounded-md border border-[--border-color] my-6"
              >
                <span className="bg-[--fg-color] py-1.5 px-3 w-[200px] border border-transparent text-center rounded-l-md">
                  {fieldName}
                </span>
                <input className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md" />
              </label>
            ))}
        </div>
        <div className="block w-full md:w-1/2 md:px-4 inset-y-0">
          {fieldNames
            .slice(Math.ceil(fieldNames.length / 2))
            .map((fieldName) => (
              <label
                key={fieldName}
                className="flex w-full rounded-md border border-[--border-color] my-6"
              >
                <span className="bg-[--fg-color] py-1.5 px-3 w-[200px] border border-transparent text-center rounded-l-md">
                  {fieldName}
                </span>
                <input className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md" />
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};
