import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { withUniwind } from "uniwind";

const IconMaterial = withUniwind(MaterialIcons);
const IconCommunity = withUniwind(MaterialCommunityIcons);

const Icon = {
  Material: IconMaterial,
  Community: IconCommunity,
};

export default Icon;
