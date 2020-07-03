import { useEffect } from "react";

export default (fn: () => Promise<any>, deps: any[]) =>
  useEffect((): any => {
    fn();
  }, deps);
