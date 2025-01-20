import { COLLECTIONNAMES } from "@constants";
import { IGuestModel } from "@types";
import databaseUtils from "utils/database.utils";
import { v4 as uuidv4 } from "uuid";

// Fetch all guests for a user
export const fetchGuests = async (userId: string): Promise<IGuestModel[]> => {
  try {
    const { documents } = await databaseUtils.getAllDocuments<IGuestModel>({
      collectionName: COLLECTIONNAMES.guests,
      userId,
    });
    return documents;
  } catch (error) {
    console.error("Error fetching guests:", error);
    throw error;
  }
};

// Add a new guest
export const addGuest = async (guest: IGuestModel, userId: string): Promise<IGuestModel> => {
  const id = uuidv4();
  const guestWithUserId = { ...guest, userId, id };
  try {
     databaseUtils.addDocumentWithId({
      collectionName: COLLECTIONNAMES.guests,
      data: guestWithUserId,
      customId: id,
    });
    return guestWithUserId;
  } catch (error) {
    console.error("Error adding guest:", error);
    throw error;
  }
};

// Check out a guest
export const checkoutGuest = async (id: string): Promise<void> => {
  try {
    await databaseUtils.deleteDocument({
      collectionName: COLLECTIONNAMES.guests,
      documentId: id,
    });
  } catch (error) {
    console.error(`Error checking out guest with ID: ${id}`, error);
    throw error;
  }
};
