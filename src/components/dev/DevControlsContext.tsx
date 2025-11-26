"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface DevControlsContextType {
  activeId: string | null;
  setActive: (id: string | null) => void;
  isActive: (id: string) => boolean;
}

const DevControlsContext = createContext<DevControlsContextType | undefined>(
  undefined
);

export function DevControlsProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const setActive = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  const isActive = useCallback(
    (id: string) => {
      return activeId === id;
    },
    [activeId]
  );

  return (
    <DevControlsContext.Provider value={{ activeId, setActive, isActive }}>
      {children}
    </DevControlsContext.Provider>
  );
}

export function useDevControls() {
  const context = useContext(DevControlsContext);
  if (!context) {
    throw new Error("useDevControls must be used within DevControlsProvider");
  }
  return context;
}

