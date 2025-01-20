import { SizedBox } from "@components";
import RoomHeader from "./components/RoomHeader";
import RoomTable from "./components/RoomTable";

export const RoomPage = () => {
  return (
    <div>
      <RoomHeader />
      <SizedBox height={20} />
      <RoomTable />
    </div>
  );
};

export default RoomPage;
