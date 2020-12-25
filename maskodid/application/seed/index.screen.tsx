import React from "react";
import { useInside } from "../inside-provider";
import { UnreachableCaseError } from "../../backbone/unreachable-case.error";
import { SeedMetamaskScreen } from "./metamask.screen";

enum AuthSource {
  METAMASK,
}

export function SeedIndexScreen(props: { done?: (error?: Error) => void }) {
  const inside = useInside();

  const handleSelect = (authSource: AuthSource) => {
    switch (authSource) {
      case AuthSource.METAMASK:
        inside.goNext(<SeedMetamaskScreen done={props.done} />);
        return;
      default:
        throw new UnreachableCaseError(authSource);
    }
  };

  return (
    <>
      <h1 className={"frame-container-heading"}>Authenticate via:</h1>
      <ul className={"auth-buttons-container"}>
        <li>
          <button
            className={"text-center"}
            onClick={() => handleSelect(AuthSource.METAMASK)}
          >
            <img src={"/metamask-fox.svg"} className={"h-full inline"} />
          </button>
        </li>
      </ul>
    </>
  );
}
