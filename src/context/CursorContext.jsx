/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useSyncExternalStore } from "react";

const subscribePointerFine = (callback) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(pointer: fine)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getPointerFineSnapshot = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(pointer: fine)").matches;
  }
  return false;
};

const getPointerFineServerSnapshot = () => false;

const CursorContext = createContext({
  cursorVariant: "default",
  cursorText: null,
  canCursor: false,
  setCursorVariant: () => {},
  setCursorText: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState(null);

  // Subscribe to mediaQuery externally without triggering cascading render warnings in useEffect
  const canCursor = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot
  );

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        canCursor,
        setCursorVariant,
        setCursorText,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);

// Backwards-compatible aliases
export const useUI = useCursor;
export const useCapabilities = () => {
  const { canCursor } = useCursor();
  return { canCursor };
};
