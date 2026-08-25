import { createContext, useContext, useState, ReactNode } from "react";

export const MiniPlayerContext = createContext<any>(null);

export function MiniPlayerProvider({ children }: { children: ReactNode }) {
  const [miniPlayer, setMiniPlayer] = useState({
    isActive: false,
    videoKey: null,
    title: "",
    videoId: null,
  });

  return (
    <MiniPlayerContext.Provider value={{ miniPlayer, setMiniPlayer }}>
      {children}
    </MiniPlayerContext.Provider>
  );
}

export const useMiniPlayer = () => useContext(MiniPlayerContext);
