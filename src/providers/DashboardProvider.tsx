import { DashboardContext } from "@contexts";
import { RoomType } from "@types";
import { useState } from "react";

const roomTypesInitial: RoomType[] = [
  {
    id: 1,
    name: "Single sharing",
    currentBookings: 2,
    totalCapacity: 30,
    pricePerDay: 568,
    dealsCount: 2,
  },
  {
    id: 2,
    name: "Double sharing",
    currentBookings: 2,
    totalCapacity: 35,
    pricePerDay: 1068,
    dealsCount: 2,
  },
  {
    id: 3,
    name: "Triple sharing",
    currentBookings: 2,
    totalCapacity: 25,
    pricePerDay: 1568,
    dealsCount: 0,
  },
  {
    id: 4,
    name: "VIP Suit",
    currentBookings: 4,
    totalCapacity: 10,
    pricePerDay: 2568,
    dealsCount: 0,
  },
];

export const DashboardProvider = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roomTypes, setRooms] = useState(roomTypesInitial);

  const contextValue = {
    roomTypes,
  };
  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
