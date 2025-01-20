import { useContext } from "react";
import { RoomContext } from "@contexts";

export const useRoomContext = () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error("useRoomContext must be used within a RoomProvider");
    }
    return context;
};
