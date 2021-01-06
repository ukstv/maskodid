import React from "react";
import { useInside } from "../inside-provider";

export class PermissionsAuthenticateDeniedError extends Error {
  readonly code = 4001;
  readonly message = "User denied authentication";
}

export function PermitAuthenticationScreen(props: {
  origin: string;
  done: (error?: Error) => void;
}) {
  const inside = useInside();

  const handleDecision = (isPermitted: boolean) => {
    inside.goHome();
    if (isPermitted) {
      props.done();
    } else {
      props.done(new PermissionsAuthenticateDeniedError());
    }
  };

  return (
    <>
      <div className={"text-center pt-4"}>
        Share your DID with this website?
      </div>
      <div className={"text-center font-mono pt-2 pb-2"}>{props.origin}</div>
      <div className={"button-group text-center"}>
        <button className={"btn"} onClick={() => handleDecision(true)}>
          Permit
        </button>
        <button className={"btn"} onClick={() => handleDecision(false)}>
          Deny
        </button>
      </div>
    </>
  );
}
