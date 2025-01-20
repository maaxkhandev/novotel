import { Col, Row } from "antd";
import OccupancyStatistics from "./OccupancyStatistics";
import CustomersFeedback from "./CustomersFeedback";

const DashboardInsightsPanel = () => {
  return (
    <section>
      <Row gutter={[16, 16]}>
        <Col lg={16}>
          <OccupancyStatistics />
        </Col>
        <Col lg={8}>
          <CustomersFeedback />
        </Col>
      </Row>
    </section>
  );
};

export default DashboardInsightsPanel;
