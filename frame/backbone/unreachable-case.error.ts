export class UnreachableCaseError extends Error {
  constructor(variant: never) {
    super(`Unreachable case ${variant}`);
  }
}
