import { COLLECTIONNAMES } from "@constants";
import { IRoomModel } from "@types";
import databaseUtils from "utils/database.utils";
import { v4 as uuidv4 } from "uuid";

// Fetch all rooms for a user
export const fetchRooms = async (userId: string): Promise<IRoomModel[]> => {
  try {
    const { documents } = await databaseUtils.getAllDocuments<IRoomModel>({
      collectionName: COLLECTIONNAMES.rooms,
      userId,
    });
    return documents;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

// Add a new room
export const addRoom = async (room: IRoomModel, userId: string): Promise<IRoomModel> => {
  try {
    const id = uuidv4();
    const roomWithId = { ...room, id, userId };

     databaseUtils.addDocumentWithId({
      collectionName: COLLECTIONNAMES.rooms,
      data: roomWithId,
      customId: id,
    });

    return roomWithId;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};
