import { Address } from "@/screens/address";
import { Track } from "@/screens/track";
import { Wallet } from "@/screens/wallet";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default createNativeStackNavigator({
  screens: {
    Wallet: {
      screen: Wallet,
      options: {
        title: "Wallet",
      },
    },
    Address: {
      screen: Address,
      options: {
        title: "Address",
      },
    },
    Track: {
      screen: Track,
      options: {
        title: "Track Address",
      },
    },
  },
  screenOptions: {
    headerBackButtonMenuEnabled: false,
    headerBackButtonDisplayMode: "minimal",
  },
});
