import { createContext, useCallback, useContext, useState } from "react";

const BookingPrefillContext = createContext(null);

export function BookingPrefillProvider({ children }) {
  const [prefill, setPrefillState] = useState({ city: "", departureIso: "" });

  const setPrefill = useCallback((next) => {
    setPrefillState((prev) => ({ ...prev, ...next }));
  }, []);

  const clearPrefill = useCallback(() => {
    setPrefillState({ city: "", departureIso: "" });
  }, []);

  return (
    <BookingPrefillContext.Provider value={{ prefill, setPrefill, clearPrefill }}>
      {children}
    </BookingPrefillContext.Provider>
  );
}

export function useBookingPrefill() {
  const ctx = useContext(BookingPrefillContext);
  if (!ctx) throw new Error("useBookingPrefill must be used within BookingPrefillProvider");
  return ctx;
}
