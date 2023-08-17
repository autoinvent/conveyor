import { act, renderHook } from '@testing-library/react-hooks';

import { useThemeSelect } from './useThemeSelect';

describe('useThemeSelect', () => {
  it('should change theme', () => {
    const { result } = renderHook(() => useThemeSelect());
    act(() => {
      result.current.changeTheme('flatly');
    });
    expect(result.current.currentTheme).toBe('flatly');
  });
});
