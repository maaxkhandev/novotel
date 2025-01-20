import { Timestamp } from "firebase/firestore";

import { IDealModel } from "@types";
import { COLLECTIONNAMES } from "@constants";
import databaseUtils from "utils/database.utils";
import { v4 as uuidv4 } from "uuid";


export const calculateDealStatus = (
  startDate: Timestamp,
  endDate: Timestamp
): string => {
  const currentDate = new Date();
  const start = startDate.toDate(); // Convert Firestore Timestamp to Date
  const end = endDate.toDate(); // Convert Firestore Timestamp to Date

  if (end < currentDate) {
    return "Expired";
  } else if (start > currentDate) {
    return "Upcoming";
  } else if (start <= currentDate && end >= currentDate) {
    return "Active";
  } else {
    return "Inactive";
  }
};
export const fetchDeals = async (userId: string): Promise<IDealModel[]> => {
  try {
    const { documents } = await databaseUtils.getAllDocuments<IDealModel>({
      collectionName: COLLECTIONNAMES.deals,
      userId,
    });
    return documents;
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};

export const addDeal = async (_deal: IDealModel, userId: string): Promise<IDealModel> => {
  try {
    const id = uuidv4();
    const dealWithUserId = { ..._deal, userId, id };

     databaseUtils.addDocumentWithId({
      collectionName: COLLECTIONNAMES.deals,
      data: dealWithUserId,
      customId: id,
    });

    console.log("Deal added successfully:", dealWithUserId);
    return dealWithUserId;
  } catch (error) {
    console.error("Error adding deal:", error);
    throw error;
  }
};
