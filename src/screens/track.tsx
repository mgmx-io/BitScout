import { useValidateAddress } from "@/api/queries";
import { useAppStore } from "@/stores";
import { Button, Spinner, TextField } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";

export function Track() {
  const [value, setValue] = useState("");
  const { trackAddress } = useAppStore();
  const { mutate, isPending } = useValidateAddress();

  const handleSubmit = () => {
    mutate(value, {
      onSuccess(data) {
        if (!data.isvalid) return;
        trackAddress(value);
      },
    });
  };

  return (
    <View className="flex-1 gap-4 p-4">
      <TextField>
        <TextField.Label>Address</TextField.Label>
        <TextField.Input
          value={value}
          onChangeText={setValue}
          placeholder="enter your btc address"
        />
      </TextField>
      <Button
        variant={isPending ? "secondary" : "primary"}
        onPress={handleSubmit}
        isDisabled={isPending}
      >
        {isPending ? <Spinner /> : "Submit"}
      </Button>
    </View>
  );
}
