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
            className={"auth-method"}
            onClick={() => handleSelect(AuthSource.METAMASK)}
          >
            <span className={"auth-method-picture"}>
              <img
                src={"/metamask-fox.svg"}
                className={"w-1/2 inline"}
                title={"MetaMask"}
                alt={"MetaMask"}
              />
            </span>
            <span className={"auth-method-name"}>MetaMask</span>
          </button>
        </li>
        <li>
          <button
            className={"auth-method"}
            onClick={() => handleSelect(AuthSource.RANDOM)}
          >
            <span className={"auth-method-picture"}>
              <img
                src={"/random-kryptos.svg"}
                className={"w-3/4 inline"}
                title={"Random"}
                alt={"Random"}
              />
            </span>
            <span className={"auth-method-name"}>Random</span>
          </button>
        </li>
      </ul>
    </>
  );
}
