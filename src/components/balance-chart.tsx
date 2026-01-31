import { LinearGradient, vec } from "@shopify/react-native-skia";
import { View } from "react-native";
import { Area, CartesianChart, Line } from "victory-native";

// Hardcoded data for balance over time
const DATA = [
  { timestamp: 1704067200000, balance: 0.045 }, // Jan 1, 2024
  { timestamp: 1706745600000, balance: 0.052 }, // Feb 1, 2024
  { timestamp: 1709251200000, balance: 0.048 }, // Mar 1, 2024
  { timestamp: 1711929600000, balance: 0.065 }, // Apr 1, 2024
  { timestamp: 1714521600000, balance: 0.071 }, // May 1, 2024
  { timestamp: 1717200000000, balance: 0.069 }, // Jun 1, 2024
  { timestamp: 1719792000000, balance: 0.082 }, // Jul 1, 2024
  { timestamp: 1722470400000, balance: 0.095 }, // Aug 1, 2024
  { timestamp: 1725148800000, balance: 0.089 }, // Sep 1, 2024
  { timestamp: 1727740800000, balance: 0.103 }, // Oct 1, 2024
  { timestamp: 1730419200000, balance: 0.115 }, // Nov 1, 2024
  { timestamp: 1733011200000, balance: 0.121 }, // Dec 1, 2024
];

const PRIMARY_COLOR = "#f97316";

export function BalanceChart() {
  return (
    <View className="h-48">
      <CartesianChart
        data={DATA}
        xKey="timestamp"
        yKeys={["balance"]}
        axisOptions={{
          formatXLabel: () => "",
          formatYLabel: () => "",
          lineColor: "transparent",
          labelColor: "transparent",
        }}
        frame={{
          lineColor: "transparent",
        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Area
              points={points.balance}
              y0={chartBounds.bottom}
              curveType="catmullRom"
            >
              <LinearGradient
                start={vec(0, chartBounds.top)}
                end={vec(0, chartBounds.bottom)}
                colors={[`${PRIMARY_COLOR}50`, `${PRIMARY_COLOR}00`]}
              />
            </Area>
            <Line
              points={points.balance}
              color={PRIMARY_COLOR}
              strokeWidth={3}
              curveType="catmullRom"
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
}
