import { SizedBox } from "@components";
import RateHeader from "./components/RateHeader";
import RateTable from "./components/RateTable";

export const RatePage = () => {
  return (
    <div>
      <RateHeader />
      <SizedBox height={20} />
      <RateTable />
    </div>
  );
};

export default RatePage;
