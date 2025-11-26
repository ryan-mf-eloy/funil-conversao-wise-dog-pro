"use client";

import { DevControlsProvider } from "./DevControlsContext";

export function DevControlsProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DevControlsProvider>{children}</DevControlsProvider>;
}

