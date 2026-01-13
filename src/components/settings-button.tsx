import { Feedback } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Icon from "./icon";

export function SettingsButton() {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        Feedback.selection();
        navigate("Settings");
      }}
      className="aspect-square h-full items-center justify-center"
    >
      <Icon name="settings" size={20} colorClassName="accent-foreground" />
    </TouchableOpacity>
  );
}
