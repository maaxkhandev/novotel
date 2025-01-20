import { DealContext } from "@contexts";
import { IDealModel } from "@types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@hooks";
import { fetchDeals, addDeal as addDealService } from "@services";

export const DealsProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const [deals, setDeals] = useState<IDealModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;

      const fetchDealsData = async () => {
        try {
          setLoading(true);
          const documents = await fetchDeals(userId);
          setDeals(documents);
          console.log("Fetched deals:", documents);
        } catch (error) {
          console.error("Error fetching deals:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDealsData();
    }
  }, [currentUser]);

  const addDeal = async (_deal: IDealModel) => {
    try {
      if (!currentUser) throw new Error("User is not authenticated");

      const userId = currentUser.uid;
      const newDeal = await addDealService(_deal, userId);

      setDeals((prevDeals) => [...prevDeals, newDeal]);
    } catch (error) {
      console.error("Error adding deal:", error);
    }
  };

  const contextValue = { deals, addDeal, loading };

  return (
    <DealContext.Provider value={contextValue}>{children}</DealContext.Provider>
  );
};
