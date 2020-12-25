import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "../backbone/bus";
import { HomeIndexScreen } from "../application/home/index.screen";
import { BackboneContext } from "../backbone/backbone";
import {
  PermissionsAuthenticateDeniedError,
  PermissionsAuthenticateScreen,
} from "../screens/permissions/permissions-authenticate.screen";
import { useSubjectable } from "../backbone/use-subjectable";
import { AuthIndexScreen } from "../screens/auth/auth-index.screen";
import { InsideProvider } from "../application/inside-provider";

export default function Index() {
  // const bus = useContext(BusContext);
  // const backbone = useContext(BackboneContext);
  // const [inside, setInside] = useState(
  //   <HomeIndexScreen setInside={(element) => setInside(element)} />
  // );
  //
  // useEffect(() => {
  //   bus.expose("authenticate", async (data, origin) => {
  //     if (backbone.hasSeed) {
  //       return new Promise<string>(async (resolve, reject) => {
  //         await bus.call("show");
  //         const handleDecision = async (isPermitted: boolean) => {
  //           setInside(<HomeIndexScreen setInside={setInside} />);
  //           await bus.call("hide");
  //           if (isPermitted) {
  //             resolve(await backbone.did());
  //           } else {
  //             reject(new PermissionsAuthenticateDeniedError());
  //           }
  //         };
  //         setInside(
  //             <PermissionsAuthenticateScreen
  //                 origin={origin}
  //                 onDecision={handleDecision}
  //             />
  //         );
  //       });
  //     } else {
  //       console.log('no seed')
  //       // await prepareSeed()
  //       // await permit
  //       // setInside(<AuthIndexScreen setInside={setInside} />);
  //       return new Date().toISOString()
  //     }
  //   });
  // }, [bus, backbone]);
  //
  // // const setHome = () => {
  // //   setInside(<HomeIndexScreen />);
  // // };
  // //
  // // const permitAuthentication = async (origin: string) => {
  // //   await bus.call("show");
  // //   return new Promise<void>((resolve, reject) => {
  // //     const handleDecision = (isPermitted: boolean) => {
  // //       console.log('handleDecision', isPermitted)
  // //       bus.call('hide').then(() => {
  // //         setHome();
  // //         if (isPermitted) {
  // //           resolve();
  // //         } else {
  // //           reject(new PermissionsAuthenticateDeniedError());
  // //         }
  // //       })
  // //     };
  // //     setInside(
  // //       <PermissionsAuthenticateScreen
  // //         origin={origin}
  // //         onDecision={handleDecision}
  // //       />
  // //     );
  // //   });
  // // };
  // //
  // // bus.expose("authenticate", async (data, origin) => {
  // //   if (backbone.hasSeed) {
  // //     await permitAuthentication(origin);
  // //     return backbone.authenticate();
  // //   } else {
  // //     return new Promise(async (resolve, reject) => {
  // //       await bus.call("show");
  // //       const handleAuth = (result: Promise<string>) => {
  // //         result
  // //           .then(resolve)
  // //           .catch(reject)
  // //           .finally(async () => {
  // //             await bus.call("hide");
  // //             setHome();
  // //           });
  // //       };
  // //       setInside(<AuthIndexScreen onAuth={handleAuth} />);
  // //     });
  // //   }
  // // });
  //
  // return inside;

  return <InsideProvider home={<HomeIndexScreen />} />;
}
