import { BlurView, type BlurViewProps } from "expo-blur";
import { BottomSheet, useBottomSheetAnimation } from "heroui-native";
import { type FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { useUniwind } from "uniwind";

const RBlurView = Animated.createAnimatedComponent(BlurView);

interface Props extends BlurViewProps {
  blurIntensity: SharedValue<number>;
}

const AnimatedBlurView: FC<Props> = ({ blurIntensity, ...props }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      intensity: blurIntensity.get(),
    };
  });

  return <RBlurView animatedProps={animatedProps} {...props} />;
};

export const BottomSheetBlurOverlay = () => {
  const { theme } = useUniwind();
  const { progress } = useBottomSheetAnimation();

  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  return (
    <BottomSheet.Close style={StyleSheet.absoluteFill}>
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={theme === "dark" ? "dark" : "systemUltraThinMaterialDark"}
        style={StyleSheet.absoluteFill}
      />
    </BottomSheet.Close>
  );
};
