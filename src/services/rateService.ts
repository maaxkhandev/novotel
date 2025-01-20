import { COLLECTIONNAMES } from "@constants";
import { IRateModel } from "@types";
import databaseUtils from "utils/database.utils";
import { v4 as uuidv4 } from "uuid";

// Fetch all rates for the current user
export const fetchRates = async (userId: string): Promise<IRateModel[]> => {
  try {
    const { documents } = await databaseUtils.getAllDocuments<IRateModel>({
      collectionName: COLLECTIONNAMES.rates,
      userId,
    });
    return documents;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};

// Add a new rate
export const addRate = async (rate: IRateModel, userId: string): Promise<IRateModel> => {
  try {
    const id = uuidv4();
    const rateWithUserId = { ...rate, userId, id };

     databaseUtils.addDocumentWithId({
      collectionName: COLLECTIONNAMES.rates,
      data: rateWithUserId,
      customId: id,
    });

    return rateWithUserId;
  } catch (error) {
    console.error("Error adding rate:", error);
    throw error;
  }
};
