import { useSnapshotStore } from "@/stores/snapshot";
import { FiatCurrency } from "@/types/api";
import { DisplayUnit } from "@/types/misc";
import { satsToBtc, satsToFiat } from "@/utils";
import { LinearGradient, Path, vec } from "@shopify/react-native-skia";
import { Big } from "big.js";
import { useThemeColor } from "heroui-native";
import { Fragment } from "react";
import { View } from "react-native";
import type { ChartPressState, PointsArray } from "victory-native";
import {
  CartesianChart,
  useAnimatedPath,
  useAreaPath,
  useLinePath,
} from "victory-native";
import { ToolTip } from "./tooltip";

type Props = {
  state: ChartPressState<{ x: number; y: { value: number } }>;
  isActive: boolean;
  displayUnit: DisplayUnit;
  fiatCurrency: FiatCurrency;
};

const OFFSET = 16;

function AnimatedArea({
  points,
  y0,
  color,
}: {
  points: PointsArray;
  y0: number;
  color: string;
}) {
  const { path } = useAreaPath(points, y0);
  const animPath = useAnimatedPath(path);

  return (
    <Path path={animPath} style="fill">
      <LinearGradient
        start={vec(0, 0)}
        end={vec(0, y0)}
        colors={[`${color}80`, `${color}00`]}
      />
    </Path>
  );
}

function AnimatedLine({
  points,
  color,
}: {
  points: PointsArray;
  color: string;
}) {
  const { path } = useLinePath(points);
  const animPath = useAnimatedPath(path);

  return <Path path={animPath} style="stroke" color={color} strokeWidth={3} />;
}

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
          <Fragment>
            <AnimatedArea
              points={points.value}
              y0={chartBounds.bottom}
              color={primary}
            />
            <AnimatedLine points={points.value} color={primary} />
            {isActive && (
              <ToolTip
                x={state.x.position}
                y={state.y.value.position}
                color={primary}
              />
            )}
          </Fragment>
        )}
      </CartesianChart>
    </View>
  );
}
