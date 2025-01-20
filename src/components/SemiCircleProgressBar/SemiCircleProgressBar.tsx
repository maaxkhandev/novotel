import { COLORS } from "@constants";
import { Flex } from "antd";
import styled from "styled-components";

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const StatusCircle = styled.div<{ completed: boolean; strokeColor?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.completed ? props.strokeColor || "#4caf50" : "#d0d0ce"};
  margin-right: 8px;
  color: ${COLORS.grey};
`;

const StatusText = styled.div`
  font-size: 14px;
  color: ${COLORS.grey};
`;

export const SemiCircleProgressBar = ({
  percentage,
  fillColor = "#d0d0ce",
  strokeColor = "#4caf50",
  strokeWidth = 20,
  radius = 100,
  size = 1,
}) => {
  const scaledRadius = radius * size;
  const diameter = scaledRadius * 2;
  const circumference = Math.PI * scaledRadius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Flex>
      <div style={{ textAlign: "center" }}>
        <svg
          width={diameter + strokeWidth * size}
          height={scaledRadius + strokeWidth * 0}
          viewBox={`0 0 ${diameter + strokeWidth * size} ${
            scaledRadius + strokeWidth * 2 * size
          }`}
        >
          <path
            d={`
            M ${(strokeWidth / 2) * size},${scaledRadius + strokeWidth * size}
            A ${scaledRadius},${scaledRadius} 0 1,1 ${
              diameter + (strokeWidth / 2) * size
            },${scaledRadius + strokeWidth * size}
          `}
            fill="none"
            stroke={fillColor}
            strokeWidth={strokeWidth * size}
            strokeLinecap="round"
          />

          <path
            d={`
            M ${(strokeWidth / 2) * size},${scaledRadius + strokeWidth * size}
            A ${scaledRadius},${scaledRadius} 0 1,1 ${
              diameter + (strokeWidth / 2) * size
            },${scaledRadius + strokeWidth * size}
          `}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth * size}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            marginTop: "-40px",
            fontSize: `${22}px`,
            fontWeight: "bold",
          }}
        >
          {percentage}%
        </div>
      </div>
      <StatusContainer>
        <StatusItem>
          <StatusCircle completed={true} strokeColor={strokeColor} />
          <StatusText>Completed</StatusText>
        </StatusItem>
        <StatusItem>
          <StatusCircle completed={false} strokeColor={strokeColor} />
          <StatusText>Yet to Complete</StatusText>
        </StatusItem>
      </StatusContainer>
    </Flex>
  );
};

export default SemiCircleProgressBar;
