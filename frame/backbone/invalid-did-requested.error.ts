export class InvalidDidRequestedError extends Error {
  readonly code = -32602;
  constructor(readonly message: string) {
    super(message);
  }
}
