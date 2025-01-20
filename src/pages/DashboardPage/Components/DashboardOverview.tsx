import { Col, Row } from "antd";

import { Container } from "styles/GlobalStyles";
import DashboardOverviewCard from "./DashboardOverviewCard";
import { useGuestContext } from "hooks/useGuestContext";
import { useRoomContext } from "@hooks";

const DashboardOverview = () => {
  const { todaysCheckIn, todaysCheckOut, totalInHotel } = useGuestContext();
  const { totalRooms } = useRoomContext();

  return (
    <section>
      <Container>
        <h1>Overview</h1>
        <Row gutter={[16, 16]} wrap={true}>
          <Col xs={24} sm={12} md={8} lg={4}>
            <DashboardOverviewCard
              title="Today's"
              subtitle="Check-in"
              value={todaysCheckIn()}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <DashboardOverviewCard
              title="Today's"
              subtitle="Check-out"
              value={todaysCheckOut()}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <DashboardOverviewCard
              title="Total"
              subtitle="In hotel"
              value={totalInHotel()}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <DashboardOverviewCard
              title="Total"
              subtitle="Available room"
              value={totalRooms() - totalInHotel()}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <DashboardOverviewCard
              title="Total"
              subtitle="Occupied room"
              value={totalInHotel()}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardOverview;
