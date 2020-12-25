import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "../backbone/bus";
import { BackboneContext } from "../backbone/backbone";
import { SeedIndexScreen } from "./seed/index.screen";
import { PermitAuthenticationScreen } from "./permit/authentication.screen";

type Props = {
  home: JSX.Element;
};

export const InsideContext = React.createContext({
  goHome: () => {},
  goNext: (element: JSX.Element) => {},
});

export function InsideProvider(props: React.PropsWithChildren<Props>) {
  const bus = useContext(BusContext);
  const backbone = useContext(BackboneContext);
  const [inside, setInside] = useState(props.home);

  const context = {
    goHome: () => {
      setInside(props.home);
    },
    goNext: (element: JSX.Element) => {
      setInside(element);
    },
  };

  const prepareSeed = () => {
    return new Promise<void>((resolve, reject) => {
      const handleDone = (error?: Error) => {
        error ? reject(error) : resolve();
      };
      context.goNext(<SeedIndexScreen done={handleDone} />);
    });
  };

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

  useEffect(() => {
    bus.expose("authenticate", async (data, origin) => {
      await bus.call("show");
      try {
        if (!backbone.hasSeed) {
          await prepareSeed();
        }
        await permitAuthentication(origin);
        return backbone.did();
      } finally {
        await bus.call("hide");
        context.goHome();
      }
    });
  }, [backbone, bus]);

  return (
    <InsideContext.Provider value={context}>{inside}</InsideContext.Provider>
  );
}

export function useInside() {
  return useContext(InsideContext);
}
