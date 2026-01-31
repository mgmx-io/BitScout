import { useSnapshotStore } from "@/stores/snapshot";
import { FiatCurrency } from "@/types/api";
import { DisplayUnit } from "@/types/misc";
import { satsToBtc, satsToFiat } from "@/utils";
import { LinearGradient, vec } from "@shopify/react-native-skia";
import { Big } from "big.js";
import { useThemeColor } from "heroui-native";
import { View } from "react-native";
import type { ChartPressState } from "victory-native";
import { Area, CartesianChart, Line } from "victory-native";
import { ToolTip } from "./tooltip";

type Props = {
  state: ChartPressState<{ x: number; y: { value: number } }>;
  isActive: boolean;
  displayUnit: DisplayUnit;
  fiatCurrency: FiatCurrency;
};

const OFFSET = 16;

export function BalanceChart({
  state,
  isActive,
  displayUnit,
  fiatCurrency,
}: Props) {
  const primary = useThemeColor("accent");
  const { getHistory } = useSnapshotStore();
  const snapshots = getHistory();

  const data = snapshots.map(({ balance, prices, timestamp }) => {
    const sats = new Big(balance || 0);
    const price = new Big(prices?.[fiatCurrency] || 0);
    let value: number;

    if (displayUnit === "BTC") {
      value = satsToBtc(sats).toNumber();
    } else if (displayUnit === "fiat") {
      value = satsToFiat(sats, price).toNumber();
    } else {
      value = sats.toNumber();
    }

    return { timestamp, value };
  });

  return (
    <View className="h-32">
      <CartesianChart
        data={data}
        xKey="timestamp"
        yKeys={["value"]}
        chartPressState={state}
        domainPadding={{
          bottom: OFFSET,
          top: OFFSET,
          left: OFFSET,
          right: OFFSET,
        }}
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
              points={points.value}
              y0={chartBounds.bottom}
              curveType="catmullRom"
            >
              <LinearGradient
                start={vec(0, chartBounds.top)}
                end={vec(0, chartBounds.bottom)}
                colors={[`${primary}80`, `${primary}00`]}
              />
            </Area>
            <Line
              points={points.value}
              color={primary}
              strokeWidth={3}
              curveType="catmullRom"
            />
            {isActive && (
              <ToolTip
                x={state.x.position}
                y={state.y.value.position}
                color={primary}
              />
            )}
          </>
        )}
      </CartesianChart>
    </View>
  );
}
