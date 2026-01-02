import { AddressMenu } from "@/components/address-menu";
import { WalletSwitch } from "@/components/wallet-switch";
import { Address } from "@/screens/address";
import { Wallet } from "@/screens/wallet";
import { compactAddress } from "@/utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createElement } from "react";

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
        const { address, addressId } = route.params as any;
        return {
          title: compactAddress(address),
          headerShadowVisible: false,
          headerRight: (props) =>
            createElement(AddressMenu, { ...props, address, addressId }),
        };
      },
    },
  },
  screenOptions: {
    headerBackButtonMenuEnabled: false,
    headerBackButtonDisplayMode: "minimal",
  },
});
