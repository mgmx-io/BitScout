import { WalletSwitch } from "@/components/wallet-switch";
import { Address } from "@/screens/address";
import { Wallet } from "@/screens/wallet";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default createNativeStackNavigator({
  screens: {
    Wallet: {
      screen: Wallet,
      options: {
        title: "",
        headerLeft: WalletSwitch,
        headerShadowVisible: false,
      },
    },
    Address: {
      screen: Address,
      options: {
        title: "Address",
      },
    },
  },
  screenOptions: {
    headerBackButtonMenuEnabled: false,
    headerBackButtonDisplayMode: "minimal",
  },
});
