import { useValidateAddress } from "@/api/queries";
import { useAppStore } from "@/stores";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import * as Clipboard from "expo-clipboard";
import { Button, Spinner, TextField, useToast } from "heroui-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "./icon";

export function TrackAddress() {
  const [value, setValue] = useState("");
  const { trackAddress } = useAppStore();
  const { mutate, isPending } = useValidateAddress();
  const { toast } = useToast();
  const isEmpty = value.length === 0;

  const handleError = (error: string) => {
    toast.show({
      variant: "danger",
      label: error,
      icon: <Icon name="error" size={24} colorClassName="accent-danger" />,
      onShow: () => setValue(""),
    });
  };

  const handleSubmit = () => {
    if (isEmpty) return;
    mutate(value, {
      onSuccess({ isvalid }) {
        if (isvalid) {
          trackAddress(value);
        } else {
          handleError("Invalid address");
        }
      },
      onError() {
        handleError("Unable to verify address");
      },
    });
  };

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    setValue(text);
    handleSubmit();
  };

  return (
    <TrueSheet
      name="track-address"
      detents={[0.09, "auto"]}
      dimmedDetentIndex={1}
      initialDetentIndex={0}
      dismissible={false}
    >
      <View className="gap-4 p-4">
        <TextField>
          <TextField.Input
            value={value}
            onChangeText={setValue}
            className="rounded-full"
            placeholder="enter bitcoin address"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={handleSubmit}
          >
            <TextField.InputEndContent>
              <TouchableOpacity
                className="rounded-full p-2"
                onPress={handlePaste}
              >
                <Icon
                  name="content-paste"
                  size={20}
                  colorClassName="accent-field-placeholder"
                />
              </TouchableOpacity>
            </TextField.InputEndContent>
          </TextField.Input>
        </TextField>
        <Button
          variant={"tertiary"}
          onPress={handleSubmit}
          isDisabled={isPending || isEmpty}
        >
          {isPending ? <Spinner /> : "Submit"}
        </Button>
      </View>
    </TrueSheet>
  );
}
