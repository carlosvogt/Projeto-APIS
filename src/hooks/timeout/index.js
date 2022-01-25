import { useEffect, useRef, useState } from 'react';

function useTimeout({ timeout, onDone = () => {}, autostart = true }) {
  const timer = useRef(null);
  const [startTimer, setStartTimer] = useState(autostart);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (startTimer) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setDone(true);
        onDone();
      }, timeout);
    }

    return () => clearTimeout(timer.current);
  }, [startTimer, timeout, onDone]);

  return {
    done,
    startTimeout() {
      setStartTimer(true);
    },
  };
}

export default useTimeout;
