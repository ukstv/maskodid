import React from "react";
import { Maskodid } from "maskodid";

export function FrameSection(props: { maskodid: Maskodid }) {
  return (
    <section>
      <h2>Frame</h2>
      <div className={"button-group"}>
        <button onClick={() => props.maskodid.show()}>Show</button>
        <button onClick={() => props.maskodid.hide()}>Hide</button>
      </div>
    </section>
  );
}
