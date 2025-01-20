import { COLORS } from "@constants";
import styled from "styled-components";

interface ContainerProps {
  backgroundColor?: string;
  isTransparent?: boolean;
}

export const TitleLarge = styled.p`
  color: #596275;
  font-size: 20px;
  font-weight: 600;
`;
export const TitleMedium = styled.p`
  color: #596275;
  font-size: 16px;
  font-weight: 600;
`;
export const TitleSmall = styled.p`
  color: ${COLORS.grey};
  font-size: 14px;
  font-weight: 600;
`;
export const BodyLarge = styled.p`
  color: #596275;
  font-size: 20px;
`;
export const BodyMedium = styled.p`
  color: #596275;
  font-size: 16px;
`;
export const BodySmall = styled.p`
  color: ${COLORS.grey};
  font-size: 14px;
`;
export const TitleLargeBlue = styled.p`
  color: ${COLORS.primary};
  font-size: 20px;
  font-weight: 700;
`;

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.isTransparent ? "transparent" : props.backgroundColor || "#fff"};
  padding: ${(props) => (props.isTransparent ? "0" : "1.5rem")};
  border-radius: 12px;

  @media (max-width: 768px) {
    padding: 1em;
  }
  @media (max-width: 480px) {
    padding: 0.5em;
  }
`;

Container.defaultProps = {
  isTransparent: false,
};
