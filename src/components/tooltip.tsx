import { Circle } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";

export function ToolTip({
  x,
  y,
  color,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
  color: string;
}) {
  return (
    <>
      {/* Outer circle */}
      <Circle cx={x} cy={y} r={8} color={color} opacity={0.3} />
      {/* Inner circle */}
      <Circle cx={x} cy={y} r={4} color={color} />
    </>
  );
}
