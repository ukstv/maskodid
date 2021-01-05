import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "../backbone/bus";
import { BackboneContext } from "../backbone/backbone";
import { InsideContext, InsideContextReal } from "./inside-context";
import { Cases } from "./cases";
import { CasesProvider } from "./cases.context";
import { CreateJwsPayload } from "./create-jws.payload";
import { DecryptJwePayload } from "./decrypt-jwe.payload";

type Props = {
  home: JSX.Element;
};

export function InsideProvider(props: React.PropsWithChildren<Props>) {
  const bus = useContext(BusContext);
  const backbone = useContext(BackboneContext);
  const [inside, setInside] = useState(props.home);
  const context = new InsideContextReal(setInside, props.home);
  const [cases] = useState(() => new Cases(context, backbone, bus));

  useEffect(() => {
    bus.expose("did_authenticate", async (data, origin) => {
      return cases.authenticateCommand(origin);
    });
    bus.expose<CreateJwsPayload>("did_createJWS", async (data, origin) => {
      return cases.signCommand(data, origin);
    });
    bus.expose<DecryptJwePayload>("did_decryptJWE", async (data, origin) => {
      return cases.decryptCommand(data, origin);
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
