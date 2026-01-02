import { AddressMenu } from "@/components/address-menu";
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
      options: ({ route }) => {
        const address = (route.params as any).address;
        return {
          title: compactAddress(address),
          headerShadowVisible: false,
          headerRight: AddressMenu,
        };
      },
    },
  },
  screenOptions: {
    headerBackButtonMenuEnabled: false,
    headerBackButtonDisplayMode: "minimal",
  },
});
