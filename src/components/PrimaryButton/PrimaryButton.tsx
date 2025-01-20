import { COLORS } from "@constants";
import { Button } from "antd";
import styled from "styled-components";

interface ButtonProps {
  title: string;
  onClick: () => void; // Define onClick as a function type
}

export const PrimaryButton = ({ title, onClick }: ButtonProps) => {
  return (
    <div>
      <PrimaryButtonDiv onClick={onClick}>{title}</PrimaryButtonDiv>
    </div>
  );
};

const PrimaryButtonDiv = styled(Button)`
  background-color: ${COLORS.primary};
  color: #fff;
  font-weight: 500;
  padding: 1.5rem;
  border-radius: 10px;
  font-size: 16px;
`;

export default PrimaryButton;
