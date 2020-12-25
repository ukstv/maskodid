import React from "react";
import { HomeIndexScreen } from "../application/home/index.screen";
import { InsideProvider } from "../application/inside-provider";

export default function Index() {
  return <InsideProvider home={<HomeIndexScreen />} />;
}
