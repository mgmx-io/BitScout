import { useAppStore } from "@/stores";
import { Button, TextField } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";

export function Track() {
  const [value, setValue] = useState("");
  const { trackAddress } = useAppStore();

  const handleSubmit = () => {
    trackAddress(value);
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
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
}
