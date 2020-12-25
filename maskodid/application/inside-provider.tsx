import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "../backbone/bus";
import { BackboneContext } from "../backbone/backbone";
import { PermitAuthenticationScreen } from "./permit/authentication.screen";
import { InsideContext, InsideContextReal } from "./inside-context";
import { Cases } from "./cases";
import { CasesProvider } from "./cases.context";

type Props = {
  home: JSX.Element;
};

export function InsideProvider(props: React.PropsWithChildren<Props>) {
  const bus = useContext(BusContext);
  const backbone = useContext(BackboneContext);
  const [inside, setInside] = useState(props.home);
  const context = new InsideContextReal(setInside, props.home);
  const cases = new Cases(context, backbone, bus);

  const permitAuthentication = (origin: string) => {
    return new Promise<void>((resolve, reject) => {
      const handleDone = (error?: Error) => {
        error ? reject(error) : resolve();
      };
      context.goNext(
        <PermitAuthenticationScreen done={handleDone} origin={origin} />
      );
    });
  };

  async function withShow<A>(f: () => Promise<A> | A) {
    await bus.call("show");
    try {
      return await f();
    } finally {
      await bus.call("hide");
      context.goHome();
    }
  }

  useEffect(() => {
    bus.expose("authenticate", async (data, origin) => {
      return cases.authenticate(origin);
      // return withShow(async () => {
      //   await prepareSeed();
      //   await permitAuthentication(origin);
      //   return backbone.did();
      // });
    });
  }, [backbone, bus]);

  return (
    <InsideContext.Provider value={context}>
      <CasesProvider cases={cases}>{inside}</CasesProvider>
    </InsideContext.Provider>
  );
}

export function useInside() {
  return useContext(InsideContext);
}
