"use client";

import { store } from "@/store/app/store";
import React, { PropsWithChildren } from "react";
import { Provider as StoreProvider } from "react-redux";

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default Provider;
