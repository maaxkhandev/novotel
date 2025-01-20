import { SizedBox } from "@components";
import { COLORS } from "@constants";
import { Flex } from "antd";
import styled from "styled-components";

interface Props {
  title: string;
  subtitle: string;
  value: number;
}

const DashboardOverviewCard = (props: Props) => {
  return (
    <>
      <SizedBox height={30} />

      <p>{props.title}</p>
      <Flex align="end">
        <TitleMedium>{props.subtitle}</TitleMedium>
        <SizedBox width={10} />
        <TitleLarge>{props.value}</TitleLarge>
      </Flex>
    </>
  );
};

const TitleLarge = styled.h1`
  color: ${COLORS.primary};
  font-weight: 700;
  font-size: 1.8rem;
`;

const TitleMedium = styled.p`
  color: ${COLORS.grey};
  font-weight: 600;
  font-size: 1.2rem;
`;
export default DashboardOverviewCard;
