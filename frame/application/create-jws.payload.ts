export interface CreateJwsPayload {
  payload: object;
  did: string;
  header?: object
}