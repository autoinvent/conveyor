import type { Decorator } from '@storybook/react';
import { Profiler, type ProfilerOnRenderCallback, useId, useRef } from 'react';

export const withProfiler: Decorator = (Story) => {
  const id = useId();
  const isMounting = useRef(true);
  const totalRenders = useRef(0);
  const totalActualDuration = useRef(0);
  const totalBaseDuration = useRef(0);

  const onRender: ProfilerOnRenderCallback = (
    _,
    phase,
    actualDuration,
    baseDuration,
  ) => {
    if (phase === 'update' && isMounting.current) {
      isMounting.current = false;
      return;
    }
    if (phase === 'update') {
      totalRenders.current += 1;
    }
    if (phase !== 'mount' && totalRenders.current > 0) {
      totalActualDuration.current += actualDuration;
      totalBaseDuration.current += baseDuration;
      const averageActualDuration =
        totalActualDuration.current / totalRenders.current;
      const averageBaseDuration =
        totalBaseDuration.current / totalRenders.current;

      console.log(`Render: ${totalRenders.current}`, {
        averageActualDuration,
        averageBaseDuration,
        reportDetails: { phase, actualDuration, baseDuration },
      });
    }
  };

  return (
    <Profiler id={id} onRender={onRender}>
      <Story />
    </Profiler>
  );
};
