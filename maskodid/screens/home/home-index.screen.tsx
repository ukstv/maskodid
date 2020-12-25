import { useContext, useEffect, useState } from "react";
import { BackboneContext } from "../../backbone/backbone";
import { UnreachableCaseError } from "../../backbone/unreachable-case.error";
import { HomeDidScreen } from "./home-did.screen";
import { AuthIndexScreen } from "../auth/auth-index.screen";

enum Inside {
  EMPTY,
  AUTHENTICATE,
  DISPLAY,
}

export function HomeIndexScreen(props: {
  setInside: (element: JSX.Element) => void;
}) {
  const backbone = useContext(BackboneContext);

  // const handleClear = () => {
  //   console.log('TODO Clear')
  // }
  //
  // const fingerprint = props.did.replace(/did:key:/, "");
  // return (
  //   <>
  //     <div className={"frame-container-heading"}>Welcome</div>
  //     <div className={"flex-auto flex-col flex content-center justify-center"}>
  //       <div
  //         className={"text-center font-mono"}
  //         style={{ fontSize: "smaller" }}
  //       >
  //         <span className={"badge"}>ed25519</span> did:key
  //       </div>
  //       <div
  //         style={{ fontSize: "3.2vw" }}
  //         className={"text-center font-mono mt-1 mb-1"}
  //       >
  //         {fingerprint}
  //       </div>
  //       <div className={"text-center mt-2"}>
  //         <button className={"btn"} onClick={handleClear}>
  //           Clear
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // );

  // const [inside, setInside] = useState(Inside.EMPTY);
  // const [did, setDid] = useState("");
  //
  // function Authenticate() {
  //   const handleAuth = (result: Promise<string>) => {
  //     result
  //       .then((did) => {
  //         setDid(did);
  //         setInside(Inside.DISPLAY);
  //       })
  //       .catch((error) => {
  //         setDid("");
  //         setInside(Inside.EMPTY);
  //         console.error(error);
  //       });
  //   };
  //
  //   return <AuthIndexScreen onAuth={handleAuth} />;
  // }
  //
  // function Display() {
  //   const handleClear = () => {
  //     backbone.clearSeed();
  //     setDid("");
  //     setInside(Inside.EMPTY);
  //   };
  //
  //   const fingerprint = did.replace(/did:key:/, "");
  //   return (
  //     <>
  //       <div className={"frame-container-heading"}>Welcome</div>
  //       <div
  //         className={"flex-auto flex-col flex content-center justify-center"}
  //       >
  //         <div
  //           className={"text-center font-mono"}
  //           style={{ fontSize: "smaller" }}
  //         >
  //           <span className={"badge"}>ed25519</span> did:key
  //         </div>
  //         <div
  //           style={{ fontSize: "3.2vw" }}
  //           className={"text-center font-mono mt-1 mb-1"}
  //         >
  //           {fingerprint}
  //         </div>
  //         <div className={"text-center mt-2"}>
  //           <button className={"btn"} onClick={handleClear}>
  //             Clear
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  //
  // function Empty() {
  //   useEffect(() => {
  //     if (backbone.hasSeed) {
  //       backbone
  //         .authenticate()
  //         .then((did) => {
  //           setDid(did);
  //           setInside(Inside.DISPLAY);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           setInside(Inside.AUTHENTICATE);
  //         });
  //     } else {
  //       setInside(Inside.AUTHENTICATE);
  //     }
  //   }, [inside]);
  //   return <></>;
  // }
  //
  // switch (inside) {
  //   case Inside.EMPTY:
  //     return <Empty />;
  //   case Inside.AUTHENTICATE:
  //     return <Authenticate />;
  //   case Inside.DISPLAY:
  //     return <Display />;
  //   default:
  //     throw new UnreachableCaseError(inside);
  // }

  useEffect(() => {
    if (backbone.hasSeed) {
      backbone
        .did()
        .then((did) => {
          props.setInside(
            <HomeDidScreen setInside={props.setInside} did={did} />
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      props.setInside(<AuthIndexScreen setInside={props.setInside} />);
    }
  }, [backbone]);

  return <></>;
}
