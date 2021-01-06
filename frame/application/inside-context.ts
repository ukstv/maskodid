import React from "react";

export interface IInsideContext {
  goHome(): void;
  goNext(element: JSX.Element): void;
}

export class InsideContextEmpty implements IInsideContext {
  goHome() {}
  goNext(element: JSX.Element) {}
}

export class InsideContextReal implements IInsideContext {
  constructor(
    private readonly setInside: (element: JSX.Element) => void,
    private readonly home: JSX.Element
  ) {}

  goHome(): void {
    this.setInside(this.home);
  }

  goNext(element: JSX.Element): void {
    this.setInside(element);
  }
}

export const InsideContext = React.createContext<IInsideContext>(
  new InsideContextEmpty()
);
