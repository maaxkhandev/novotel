import { COLORS } from "@constants";
import { Flex } from "antd";
import styled from "styled-components";

interface Props {
  options: string[];
  selectedOption?: string;
  onOptionChange?: (selected: string) => void;
}
export const SingleSelectChip = ({
  options,
  selectedOption,
  onOptionChange,
}: Props) => {
  return (
    <Flex gap="small">
      {options.map((option, index) => (
        <SingleSelectChipStyle
          key={index}
          isActive={selectedOption === option}
          onClick={() => {
            onOptionChange(option);
          }}
        >
          {option}
        </SingleSelectChipStyle>
      ))}
    </Flex>
  );
};

const SingleSelectChipStyle = styled.div<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? `${COLORS.primary}33` : "transparent"};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  color: ${(props) => (props.isActive ? `${COLORS.primary}` : COLORS.grey)};
  border: 1px solid
    ${(props) => (props.isActive ? COLORS.primary : COLORS.grey)};
`;

export default SingleSelectChip;
