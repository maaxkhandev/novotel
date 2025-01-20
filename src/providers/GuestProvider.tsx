import { GuestContext } from "contexts/GuestContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "@hooks";
import {
  fetchGuests,
  addGuest as addGuestService,
  checkoutGuest as checkoutGuestService,
} from "@services";
import { IGuestModel } from "@types";

export const GuestProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [guests, setGuests] = useState<IGuestModel[]>([]);
  const today = new Date().setHours(0, 0, 0, 0);

  // Fetch guests when the current user changes
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const fetchGuestData = async () => {
        try {
          setLoading(true);
          const fetchedGuests = await fetchGuests(userId);
          setGuests(fetchedGuests);
        } catch (error) {
          console.error("Error fetching guests:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchGuestData();
    }
  }, [currentUser]);

  // Add a guest
  const addGuest = async (guest: IGuestModel) => {
    try {
      if (!currentUser) throw new Error("User is not authenticated");

      const userId = currentUser.uid;
      const newGuest = await addGuestService(guest, userId);
      setGuests((prevGuests) => [...prevGuests, newGuest]);
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };

  // Check out a guest
  const checkoutGuest = async (id: string) => {
    try {
      setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
      await checkoutGuestService(id);
    } catch (error) {
      console.error(`Failed to check out guest with ID: ${id}`, error);
    }
  };

  // Calculate today's check-ins
  const todaysCheckIn = () => {
    return guests.filter(
      (guest) => guest.startDate.toDate().setHours(0, 0, 0, 0) === today
    ).length;
  };

  // Calculate today's check-outs
  const todaysCheckOut = () => {
    return guests.filter(
      (guest) => guest.endDate.toDate().setHours(0, 0, 0, 0) === today
    ).length;
  };

  // Calculate total guests in the hotel
  const totalInHotel = () => {
    return guests.length;
  };

  const contextValue = {
    loading,
    guests,
    addGuest,
    checkoutGuest,
    todaysCheckIn,
    todaysCheckOut,
    totalInHotel,
  };

  return (
    <GuestContext.Provider value={contextValue}>
      {children}
    </GuestContext.Provider>
  );
};
