import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import databaseUtils from "utils/database.utils";

const signUp = async (
  fullName: string,
  totalRooms: number,
  totalFloors: number,
  email: string,
  password: string
): Promise<User> => {
  try {
   

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: fullName });

    await databaseUtils.addDocumentWithId({
      collectionName: "User",
      data: {
        fullName,
        email,
        userId: user.uid,
        totalRooms,
        totalFloors,
      },
      customId: user.uid,
    });

    console.log("User signed up successfully:", user);
    return user;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

const logIn = async (email: string, password: string): Promise<User> => {
  try {
  

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

const getCurrentUserId = (): string | null => {
  const currentUser = auth.currentUser;
  return currentUser ? currentUser.uid : null;
};

export const authService = {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  getCurrentUserId,
};
