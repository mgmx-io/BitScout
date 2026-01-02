import { WalletSwitch } from "@/components/wallet-switch";
import { Address } from "@/screens/address";
import { Wallet } from "@/screens/wallet";
import { compactAddress } from "@/utils";
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
      options: ({ route }) => ({
        title: compactAddress((route.params as any).address),
        headerShadowVisible: false,
      }),
    },
  },
  screenOptions: {
    headerBackButtonMenuEnabled: false,
    headerBackButtonDisplayMode: "minimal",
  },
});
