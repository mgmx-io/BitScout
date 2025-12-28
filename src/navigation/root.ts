import { Home } from "@/screens/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
    },
  },
  screenOptions: {
    headerBackButtonMenuEnabled: false,
    headerBackButtonDisplayMode: "minimal",
  },
});
