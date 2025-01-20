import { SizedBox } from "@components";
import { CgMoreVerticalAlt } from "react-icons/cg";

import { Divider, Flex } from "antd";
import { BodyMedium, Container, TitleMedium } from "styles/GlobalStyles";
const customerFeedbackData = [
  {
    name: "Mark",
    feedback: "Food could be better.",
    room: "A201",
  },
  {
    name: "Christian",
    feedback: "Facilities are not enough for amount paid.",
    room: "A101",
  },
  {
    name: "Alexander",
    feedback: "Room cleaning could be better.",
    room: "A301",
  },
];

const CustomersFeedback = () => {
  return (
    <Container>
      <Flex justify="space-between">
        <h1>Customers feedback</h1>
        <CgMoreVerticalAlt size={22} />
      </Flex>
      <SizedBox height={20} />
      {customerFeedbackData.map((customerFeedback, index) => {
        return (
          <div key={customerFeedback.name || customerFeedback.room || index}>
            <Flex justify="space-between" align="center">
              <div>
                <TitleMedium>{customerFeedback.name}</TitleMedium>
                <SizedBox height={6} />
                <BodyMedium>{customerFeedback.feedback}</BodyMedium>
              </div>
              <TitleMedium>{customerFeedback.room}</TitleMedium>
            </Flex>
            <Divider style={{ borderWidth: "1px", borderColor: "#C6C9D0" }} />
          </div>
        );
      })}
    </Container>
  );
};

export default CustomersFeedback;
