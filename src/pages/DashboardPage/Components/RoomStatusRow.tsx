import { SizedBox } from "@components";
import { Flex } from "antd";
import { BodyMedium } from "styles/GlobalStyles";

interface Props {
  title: string;
  value: number;
}

const RoomStatusRow = (props: Props) => {
  return (
    <div>
      <SizedBox height={10} />
      <Flex justify="space-between">
        <BodyMedium>{props.title}</BodyMedium>
        <BodyMedium>{props.value}</BodyMedium>
      </Flex>
    </div>
  );
};

export default RoomStatusRow;
