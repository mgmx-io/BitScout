import { BlurView, type BlurViewProps } from "expo-blur";
import { useBottomSheet, useBottomSheetAnimation } from "heroui-native";
import { type FC } from "react";
import { Pressable, StyleSheet } from "react-native";
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
  const { isOpen, onOpenChange } = useBottomSheet();
  const { progress } = useBottomSheetAnimation();

  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  return (
    <Pressable
      style={[StyleSheet.absoluteFill]}
      onPress={() => onOpenChange(false)}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={theme === "dark" ? "dark" : "systemUltraThinMaterialDark"}
        style={StyleSheet.absoluteFill}
      />
    </Pressable>
  );
};
