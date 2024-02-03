import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../contexts/darkModeContext";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const OLDdata = [
  { label: "Jan 09", totalSales: 480, extrasSales: 320 - 300 },
  { label: "Jan 10", totalSales: 580, extrasSales: 400 - 300 },
  { label: "Jan 11", totalSales: 550, extrasSales: 450 - 300 },
  { label: "Jan 12", totalSales: 600, extrasSales: 350 - 300 },
  { label: "Jan 13", totalSales: 700, extrasSales: 550 - 300 },
  { label: "Jan 14", totalSales: 800, extrasSales: 650 - 500 },
  { label: "Jan 15", totalSales: 700, extrasSales: 700 - 500 },
  { label: "Jan 16", totalSales: 650, extrasSales: 500 - 300 },
  { label: "Jan 17", totalSales: 600, extrasSales: 600 - 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 400 - 300 },
  { label: "Jan 19", totalSales: 700, extrasSales: 600 - 500 },
  { label: "Jan 20", totalSales: 800, extrasSales: 700 - 500 },
  { label: "Jan 21", totalSales: 700, extrasSales: 600 - 500 },
  { label: "Jan 22", totalSales: 810, extrasSales: 550 - 500 },
  { label: "Jan 23", totalSales: 950, extrasSales: 750 - 500 },
  { label: "Jan 24", totalSales: 970, extrasSales: 600 - 500 },
  { label: "Jan 25", totalSales: 900, extrasSales: 700 - 500 },
  { label: "Jan 26", totalSales: 950, extrasSales: 800 - 500 },
  { label: "Jan 27", totalSales: 850, extrasSales: 700 - 500 },
  { label: "Jan 28", totalSales: 900, extrasSales: 600 - 500 },
  { label: "Jan 29", totalSales: 800, extrasSales: 800 - 500 },
  { label: "Jan 30", totalSales: 950, extrasSales: 700 - 500 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 800 - 500 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 900 - 500 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 800 - 500 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 950 - 500 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 1000 - 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 1100 - 500 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 900 - 500 },
];

function SalesChart1() {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading>Sales Chart</Heading>
      <ResponsiveContainer height={300} width={"100%"}>
        <AreaChart data={OLDdata}>
          <XAxis
            dataKey={"label"}
            tick={{ fill: "red" }}
            tickLine={{ stroke: "green" }}
          />
          <YAxis unit={" Rs"} />
          <Tooltip />
          <CartesianGrid />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={4}
            name="Total Salse"
            unit={".Rs"}
          />
          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Total Salse"
            unit={".Rs"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart1;
