import React from "react";

export function useInterval(callback: Function, delay: number) {
  const callbackRef = React.useRef<Function>(() => {});
  callbackRef.current = callback;

  React.useEffect(() => {
    function tick() {
      callbackRef.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [callbackRef, delay]);
}
