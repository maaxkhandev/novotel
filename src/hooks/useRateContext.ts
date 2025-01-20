
import { useContext } from "react";
import {RateContext} from "@contexts"; 

export const useRateContext = () => {
  const context = useContext(RateContext);

  if (!context) {
    throw new Error("useRateContext must be used within an RateProvider");
  }

  return context;
};
