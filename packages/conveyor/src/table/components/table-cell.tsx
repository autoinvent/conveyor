import { cn } from '@repo/internal'

export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className,
			)}
			{...props}
		/>
	)
}
