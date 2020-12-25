import { Subscribable } from "rxjs";
import { useEffect, useState } from "react";

export interface Subjectable<A> extends Subscribable<A> {
  value: A;
}

export function useSubjectable<A>(subjectable: Subjectable<A>) {
  const [value, setValue] = useState(subjectable.value);

  useEffect(() => {
    const subscription = subjectable.subscribe((v) => {
      setValue(v);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [subjectable]);

  return value;
}
