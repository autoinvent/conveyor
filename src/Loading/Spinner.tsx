import { Loader2 } from 'lucide-react';

export const Spinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-5">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
};
