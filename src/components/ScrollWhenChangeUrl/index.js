import { useEffect } from 'react';
import { createBrowserHistory } from 'history';

function ScrollWhenChangeUrl() {
  const history = createBrowserHistory();
  // Scroll to top when route changes
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, [history]);

  return null;
}

export default ScrollWhenChangeUrl;
