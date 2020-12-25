import React from "react";
import { useInside } from "../inside-provider";
import { UnreachableCaseError } from "../../backbone/unreachable-case.error";
import { SeedMetamaskScreen } from "./metamask.screen";
import { SeedRandomScreen } from "./random.screen";

enum AuthSource {
  METAMASK,
  RANDOM,
}

export function SeedIndexScreen(props: { done: (error?: Error) => void }) {
  const inside = useInside();

  const handleSelect = (authSource: AuthSource) => {
    switch (authSource) {
      case AuthSource.METAMASK:
        inside.goNext(<SeedMetamaskScreen done={props.done} />);
        return;
      case AuthSource.RANDOM:
        inside.goNext(<SeedRandomScreen done={props.done} />);
        return;
      default:
        throw new UnreachableCaseError(authSource);
    }
  };

  return (
    <>
      <h1 className={"frame-container-heading"}>Create key using:</h1>
      <ul className={"auth-buttons-container"}>
        <li>
          <button
            className={"text-center"}
            onClick={() => handleSelect(AuthSource.METAMASK)}
          >
            <img
              src={"/metamask-fox.svg"}
              className={"h-full inline"}
              title={"MetaMask"}
              alt={"MetaMask"}
            />
          </button>
        </li>
        <li>
          <button
            className={"text-center"}
            onClick={() => handleSelect(AuthSource.RANDOM)}
          >
            <img
              src={"/random-kryptos.svg"}
              className={"w-3/4 inline"}
              title={"Random"}
              alt={"Random"}
            />
          </button>
        </li>
      </ul>
    </>
  );
}
