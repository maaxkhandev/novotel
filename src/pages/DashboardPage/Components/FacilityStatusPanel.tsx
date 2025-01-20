import { Col, Flex, Row } from "antd";
import { Container, TitleMedium } from "styles/GlobalStyles";
import { SemiCircleProgressBar, SizedBox } from "@components";
import RoomStatusRow from "./RoomStatusRow";
import { COLORS } from "@constants";

const roomData = {
  occupiedRooms: {
    total: 104,
    clean: 90,
    dirty: 4,
    inspected: 60,
  },
  availableRooms: {
    total: 20,
    clean: 30,
    dirty: 19,
    inspected: 30,
  },
};
const FacilityStatusPanel = () => {
  return (
    <section>
      <Container isTransparent={true}>
        <Row gutter={[16, 16]}>
          <Col lg={16}>
            <Container>
              <h1>Room status</h1>
              <Row>
                <Col lg={10}>
                  <SizedBox height={16} />
                  <Flex justify="space-between">
                    <TitleMedium>Occupied rooms</TitleMedium>
                    <TitleMedium>{roomData.occupiedRooms.total}</TitleMedium>
                  </Flex>
                  <RoomStatusRow
                    title="Clean"
                    value={roomData.occupiedRooms.clean}
                  />
                  <RoomStatusRow
                    title="Dirty"
                    value={roomData.occupiedRooms.dirty}
                  />
                  <RoomStatusRow
                    title="Inspected"
                    value={roomData.occupiedRooms.inspected}
                  />
                </Col>
                <Col lg={4}></Col>
                <Col lg={10}>
                  <SizedBox height={14} />
                  <Flex justify="space-between">
                    <TitleMedium>Available rooms</TitleMedium>
                    <TitleMedium>{roomData.availableRooms.total}</TitleMedium>
                  </Flex>
                  <RoomStatusRow
                    title="Clean"
                    value={roomData.availableRooms.clean}
                  />
                  <RoomStatusRow
                    title="Dirty"
                    value={roomData.availableRooms.dirty}
                  />
                  <RoomStatusRow
                    title="Inspected"
                    value={roomData.availableRooms.inspected}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col lg={8}>
            <Container>
              <h1>Facility Status</h1>
              <SizedBox height={10} />
              <SemiCircleProgressBar
                percentage={75}
                strokeColor={COLORS.primary}
                strokeWidth={20}
                radius={80}
                size={1.4}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FacilityStatusPanel;
