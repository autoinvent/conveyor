import { useEffect, useState } from 'react';
import { useLocalStorage, useMedia } from 'react-use';

export type ThemeName = 'darkly' | 'flatly';

const LazyThemeLoader: {
  [key in ThemeName]: () => Promise<typeof import('*?inline')>;
} = {
  darkly: () => import('bootswatch/dist/darkly/bootstrap.min.css?inline'),
  flatly: () => import('bootswatch/dist/flatly/bootstrap.min.css?inline'),
};

// hook for controlling the application theme
// allowed options for newTheme are 'flatly', 'darkly', and 'system'
const useThemeSelect = () => {
  const [currentTheme, setTheme] = useLocalStorage<ThemeName | 'system'>(
    'theme',
    'system',
  );
  const [themeCSS, setThemeCSS] = useState<string | undefined>();

  const systemTheme = useMedia('(prefers-color-scheme: dark)')
    ? 'darkly'
    : 'flatly';

  useEffect(() => {
    const themeName =
      currentTheme === 'system' ? systemTheme : currentTheme ?? 'darkly';
    LazyThemeLoader[themeName]().then((result) => setThemeCSS(result.default));
  }, [currentTheme, systemTheme]);

  return {
    currentTheme,
    themeCSS,
    changeTheme: (newTheme: ThemeName) => setTheme(newTheme),
  };
};

export default useThemeSelect;
