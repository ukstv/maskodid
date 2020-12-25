import React, { useState } from "react";
import { AuthMetamaskScreen } from "./auth-metamask.screen";
import { UnreachableCaseError } from "../../backbone/unreachable-case.error";

enum AuthSource {
  METAMASK,
}

function AuthSelector(props: { onSelect: (authSource: AuthSource) => void }) {
  return (
    <>
      <h1 className={"frame-container-heading"}>Authenticate via:</h1>
      <ul className={"auth-buttons-container"}>
        <li>
          <button
            className={"text-center"}
            onClick={() => props.onSelect(AuthSource.METAMASK)}
          >
            <img src={"/metamask-fox.svg"} className={"h-full inline"} />
          </button>
        </li>
      </ul>
    </>
  );
}

// export function AuthIndexScreen(props: {
//   onAuth: (result: Promise<string>) => void;
// }) {
//   const handleAuth = (result: Promise<string>) => {
//     props.onAuth(result);
//   };
//
//   const handleSelect = (authSource: AuthSource) => {
//     switch (authSource) {
//       case AuthSource.METAMASK:
//         setInside(<AuthMetamaskScreen onAuth={handleAuth} />);
//         return;
//       default:
//         throw new UnreachableCaseError(authSource);
//     }
//   };
//
//   const [inside, setInside] = useState(
//     <AuthSelector onSelect={handleSelect} />
//   );
//
//   return inside;
// }

export function AuthIndexScreen(props: {
  setInside: (element: JSX.Element) => void;
}) {
  const handleSelect = (authSource: AuthSource) => {
    switch (authSource) {
      case AuthSource.METAMASK:
        props.setInside(<AuthMetamaskScreen setInside={props.setInside} />);
        return;
      default:
        throw new UnreachableCaseError(authSource);
    }
  };

  return <AuthSelector onSelect={handleSelect} />;
}
