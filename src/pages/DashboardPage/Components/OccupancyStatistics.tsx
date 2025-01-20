import { SizedBox } from "@components";
import { COLORS } from "@constants";
import { Flex } from "antd";

import {
  XAxis,
  YAxis,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Container } from "styles/GlobalStyles";
import CustomDropdown from "./CustomDropdown";

const OccupancyChartData = [
  { month: "May", occupancy: 90 },
  { month: "June", occupancy: 75 },
  { month: "July", occupancy: 100 },
  { month: "August", occupancy: 50 },
  { month: "September", occupancy: 100 },
  { month: "October", occupancy: 80 },
  { month: "November", occupancy: 85 },
  { month: "December", occupancy: 85 },
  { month: "January", occupancy: 90 },
  { month: "February", occupancy: 90 },
];

const OccupancyStatistics = () => {
  return (
    <Container>
      <Flex justify="space-between">
        <h1>Occupancy Statistics</h1>
        <CustomDropdown />
      </Flex>
      <SizedBox height={20} />
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={OccupancyChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" axisLine={false} />
          <YAxis tickFormatter={(value) => `${value}%`} axisLine={false} />
          <Tooltip />
          <Bar dataKey="occupancy" fill={COLORS.primary} maxBarSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default OccupancyStatistics;
