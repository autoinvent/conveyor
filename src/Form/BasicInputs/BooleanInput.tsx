import type { InputRenderFnProps } from '@/Form';

export interface BooleanInputProps extends InputRenderFnProps {}

export const BooleanInput = ({
  inputProps,
  inputState,
  formState,
  ...htmlProps
}: BooleanInputProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[--bg-accent]">
      <input type="checkbox" {...htmlProps} {...inputProps} />
    </div>
  );
};
