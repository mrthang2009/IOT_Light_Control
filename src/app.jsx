/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import Toast from 'src/components/Toast';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <>
      <Toast />
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
}
