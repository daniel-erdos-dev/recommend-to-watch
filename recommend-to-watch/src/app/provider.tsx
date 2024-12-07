"use client";

import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { store } from "../redux/configureStore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReduxProvider({ children }: PropsWithChildren<any>) {
  return <Provider store={store}>{children}</Provider>;
}
