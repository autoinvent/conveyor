import { cn } from '@repo/internal';

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
  );
}