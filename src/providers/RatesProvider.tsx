import { RateContext } from "@contexts";
import { useAuthContext } from "@hooks";
import { IRateModel } from "@types";
import { useEffect, useState } from "react";
import { fetchRates, addRate } from "@services";

export const RatesProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const [rates, setRates] = useState<IRateModel[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch rates when the current user changes
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;

      const fetchRatesData = async () => {
        try {
          setLoading(true);
          const fetchedRates = await fetchRates(userId);
          setRates(fetchedRates);
          console.log("Fetched rates:", fetchedRates);
        } catch (error) {
          console.error("Error fetching rates:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRatesData();
    }
  }, [currentUser]);

  // Add a new rate
  const addRates = async (rate: IRateModel) => {
    try {
      if (!currentUser) throw new Error("User is not authenticated");

      const userId = currentUser.uid;
      const newRate = await addRate(rate, userId);
      setRates((prevRates) => [...prevRates, newRate]);
    } catch (error) {
      console.error("Error adding rate:", error);
    }
  };

  const contextValue = { rates, addRates, loading };

  return (
    <RateContext.Provider value={contextValue}>{children}</RateContext.Provider>
  );
};
