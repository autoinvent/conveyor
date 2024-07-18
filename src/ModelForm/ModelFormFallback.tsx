import { Spinner } from '@/Loading';

import { useModelFormStore } from './useModelFormStore';

export const ModelFormFallback = () => {
  const data = useModelFormStore((state) => state.data);
  return (
    !data && (
      <div>
        <Spinner />
      </div>
    )
  );
};
