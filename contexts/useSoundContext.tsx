"use client";

import { createContext, useContext, ReactNode } from "react";
import { useStickyState } from "@/hooks/useStickeyState";

interface SoundContextType {
  isMuted: boolean;
  toggleSound: () => void;
}

export const SoundContext = createContext<SoundContextType | undefined>(
  undefined,
);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useStickyState(true, "play");

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};
