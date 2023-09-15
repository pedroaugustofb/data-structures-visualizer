import { Dispatch, SetStateAction } from "react";

export const with_update = (fn: () => void, setState: Dispatch<SetStateAction<number>>) => () => (
  fn(), setState((prev: number) => prev + 1)
);
