import { cn } from '@repo/internal'

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
				className,
			)}
			{...props}
		/>
	)
}
