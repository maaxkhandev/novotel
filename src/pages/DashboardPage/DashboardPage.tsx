import RoomsTypes from "./Components/RoomsTypes";
import DashboardOverview from "./Components/DashboardOverview";
import FacilityStatusPanel from "./Components/FacilityStatusPanel";
import DashboardInsightsPanel from "./Components/DashboardInsightsPanel";

export const DashboardPage = () => {
  return (
    <div>
      <DashboardOverview />
      <RoomsTypes />
      <FacilityStatusPanel />
      <DashboardInsightsPanel />
    </div>
  );
};

export default DashboardPage;
