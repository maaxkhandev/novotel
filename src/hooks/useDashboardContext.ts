// src/hooks/useAuthContext.ts
import { useContext } from "react";
import {DashboardContext} from "@contexts"; 

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboardContext must be used within an DashboardProvider");
  }

  return context;
};
