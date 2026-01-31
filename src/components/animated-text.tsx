import { TextInput, TextInputProps } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

const AnimText = Animated.createAnimatedComponent(TextInput);

type Props = Omit<TextInputProps, "editable" | "value"> & {
  text: SharedValue<string>;
  style?: React.ComponentProps<typeof AnimText>["style"];
};

export function AnimatedText({ text, ...rest }: Props) {
  const animatedProps = useAnimatedProps<TextInputProps & { text: string }>(
    () => {
      return {
        text: text.value,
      };
    },
  );

  return (
    <AnimText
      {...rest}
      defaultValue={text.value}
      animatedProps={animatedProps}
      editable={false}
    />
  );
}
