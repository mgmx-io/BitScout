import { useValidateAddress } from "@/api/queries";
import { useAppStore } from "@/stores";
import { useHeaderHeight } from "@react-navigation/elements";
import { Button, Spinner, TextField, useThemeColor } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export function Track() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { trackAddress } = useAppStore();
  const { mutate, isPending } = useValidateAddress();
  const foreground = useThemeColor("accent-foreground");
  const headerHeight = useHeaderHeight();
  const isEmpty = value.length === 0;
  const offset = headerHeight + 16;

  const handleSubmit = () => {
    mutate(value, {
      onSuccess({ isvalid }) {
        if (isvalid) {
          trackAddress(value);
        } else {
          setError("Invalid address");
        }
      },
      onError() {
        setError("Something went wrong, try again");
      },
    });
  };

  return (
    <View className="pb-safe flex-1 p-4">
      <KeyboardAvoidingView
        className="flex-1 justify-between"
        behavior="padding"
        keyboardVerticalOffset={offset}
      >
        <TextField isInvalid={error.length > 0}>
          <TextField.Input
            className="rounded-md"
            value={value}
            onChangeText={setValue}
            placeholder="enter Bitcoin address"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            multiline
          />
          <TextField.ErrorMessage>{error}</TextField.ErrorMessage>
        </TextField>
        <Button
          variant={"primary"}
          onPress={handleSubmit}
          isDisabled={isPending || isEmpty}
        >
          {isPending ? <Spinner color={foreground} /> : "Start"}
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}
