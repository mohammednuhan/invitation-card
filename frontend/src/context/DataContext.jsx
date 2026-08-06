import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import api from "../lib/api";
import { DEFAULT_DATA } from "../data/defaults";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      const [coupleRes, storyRes, eventsRes, venueRes] =
        await Promise.allSettled([
          api.get("/couple"),
          api.get("/story"),
          api.get("/events"),
          api.get("/venue")
        ]);

      const get = (r) => (r.status === "fulfilled" ? r.value?.data?.data ?? r.value?.data ?? null : null);

      const merged = { ...DEFAULT_DATA };
      const couple = get(coupleRes);
      if (couple) merged.couple = couple;
      if (get(storyRes)) merged.story = get(storyRes);
      if (get(eventsRes)) merged.events = get(eventsRes);
      if (get(venueRes)) merged.venue = get(venueRes);

      setData(merged);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const update = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchAll();
  }, [fetchAll]);

  return (
    <DataContext.Provider
      value={{ data, loading, error, setData: update, refresh }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
