import { SizedBox } from "@components";
import DealHeader from "./components/DealHeader";
import DealTable from "./components/DealTable";

export const DealPage = () => {
  return (
    <div>
      <DealHeader />
      <SizedBox height={20} />
      <DealTable />
    </div>
  );
};

export default DealPage;
