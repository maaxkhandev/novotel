import { useContext  } from "react";
import { DealContext } from "@contexts";

export const useDealContext =()=>{
    const context = useContext(DealContext);
     if (!context) {
    throw new Error("useDealContext must be used within an DealProvider");
  }

  return context;
}