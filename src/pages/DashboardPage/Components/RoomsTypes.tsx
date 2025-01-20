import { Col, Row } from "antd";
import styled from "styled-components";
import { useDealContext, useRateContext, useRoomContext } from "@hooks";
import {
  TitleLarge,
  TitleLargeBlue,
  TitleMedium,
  Container,
} from "styles/GlobalStyles";
import { SizedBox } from "@components";

const RoomsTypes = () => {
  const { rooms } = useRoomContext();
  const { rates } = useRateContext();
  const { deals } = useDealContext(); // Fetch deals from context

  return (
    <section>
      <Container>
        <Row gutter={[16, 16]} wrap={true}>
          {rates.map((rate) => {
            const matchingRooms = rooms.filter(
              (room) => room.roomType === rate.roomType
            );
            const matchingDeals = deals.filter(
              (deal) => deal.roomType === rate.roomType
            );

            return (
              <Col key={rate.id} lg={6} md={12} sm={24}>
                <RoomTypeDiv>
                  {matchingDeals.length > 0 && (
                    <SmallChip>{matchingDeals.length} Deals</SmallChip>
                  )}
                  <SizedBox height={10} />
                  <TitleMedium>{rate.roomType}</TitleMedium>
                  <SizedBox height={10} />
                  <TitleLarge>
                    {matchingRooms.length}
                    <span style={{ color: "#7F8797", fontSize: "16px" }}>
                      /{rate.totalCapacity}
                    </span>
                  </TitleLarge>
                  <SizedBox height={10} />
                  <TitleLargeBlue>
                    $ {rate.pricePerDay}
                    <span style={{ color: "#7F8797", fontSize: "16px" }}>
                      / day
                    </span>
                  </TitleLargeBlue>
                </RoomTypeDiv>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

const RoomTypeDiv = styled.div`
  border: 1px solid #c6c9d0;
  padding: 1rem;
  border-radius: 10px;
  min-height: 134px;
`;

const SmallChip = styled.p`
  background-color: #aedec8;
  color: #1d7c49;
  display: inline-block;
  padding: 5px 10px;
  font-weight: 500;
  border-radius: 4px;
`;

export default RoomsTypes;
