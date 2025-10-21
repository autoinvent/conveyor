import type { StoryContext, StoryFn } from '@storybook/react-vite'
import { useCounter, useDebounce } from '@uidotdev/usehooks'
import { Profiler, type ProfilerOnRenderCallback, useId, useRef } from 'react'

export function withPerformance(Story: any, context: StoryContext) {
	const id = useId()
	const x = useRef({})
	const [count, { increment }] = useCounter(0)
	const onRender: ProfilerOnRenderCallback = (
		id,
		phase,
		actualDuration,
		baseDuration,
		startTime,
		commitTime,
	) => {
		x.current = {
			id,
			phase,
			actualDuration,
			baseDuration,
			startTime,
			commitTime,
		}
	}

	return (
		<div>
			<button type="button" onClick={increment}>
				render
			</button>
			<span>{count} :</span>
			{Object.entries(x.current).map(([k, v]) => (
				<div key={k}>
					{k}:{v}
				</div>
			))}
			<Profiler id={id} onRender={onRender}>
				<Story />
			</Profiler>
		</div>
	)
}
