import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type DnDContextValue = [string | null, Dispatch<SetStateAction<string | null>>];

const DnDContext = createContext<DnDContextValue | undefined>(undefined);

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>
  );
};

export const useDnD = (): DnDContextValue => {
  const ctx = useContext(DnDContext);
  if (ctx === undefined) {
    throw new Error("useDnD must be used within DnDProvider");
  }
  return ctx;
};

export default DnDContext;
