import { RoomContext } from "@contexts";
import { useAuthContext } from "@hooks";
import { useGuestContext } from "hooks/useGuestContext";
import { IRoomModel } from "@types";
import { useEffect, useState } from "react";
import { fetchRooms, addRoom as addRoomService } from "@services";

export const RoomsProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const { guests } = useGuestContext();
  const [rooms, setRoom] = useState<IRoomModel[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch rooms when the current user changes
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;

      const fetchRoomData = async () => {
        try {
          setLoading(true);
          const fetchedRooms = await fetchRooms(userId);
          setRoom(fetchedRooms);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRoomData();
    }
  }, [currentUser]);

  // Add a new room
  const addRoom = async (room: IRoomModel) => {
    try {
      if (!currentUser) throw new Error("User is not authenticated");

      const userId = currentUser.uid;
      const newRoom = await addRoomService(room, userId);
      setRoom((prevRooms) => [...prevRooms, newRoom]);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  // Get available room numbers
  const getAvailableRoomNumbers = () => {
    return rooms
      .filter(
        (room) =>
          !guests.some((guest) => guest.roomNumber.includes(room.roomNumber))
      )
      .map((room) => room.roomNumber);
  };

  // Get total number of rooms
  const totalRooms = () => {
    return rooms.length;
  };

  const contextValue = {
    addRoom,
    loading,
    getAvailableRoomNumbers,
    rooms,
    totalRooms,
  };

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  );
};

export default RoomsProvider;
