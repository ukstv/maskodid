import React from "react";

type Props = {
  origin: string;
  onDecision: (decision: boolean) => void;
};

export class PermissionsAuthenticateDeniedError extends Error {
    readonly code = 4001
    readonly message = 'User denied authentication'
}

export function PermissionsAuthenticateScreen(props: Props) {
  return (
    <>
      <div className={"text-center pt-4"}>
        Share your DID with this website?
      </div>
      <div className={"text-center font-mono pt-2 pb-2"}>{props.origin}</div>
      <div className={"button-group text-center"}>
        <button className={"btn"} onClick={() => props.onDecision(true)}>
          Permit
        </button>
        <button className={"btn"} onClick={() => props.onDecision(false)}>
          Deny
        </button>
      </div>
    </>
  );
}
