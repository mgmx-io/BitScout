import { BottomSheet as HBS } from "heroui-native";
import { ComponentProps, PropsWithChildren } from "react";
import { BottomSheetBlurOverlay } from "./blur-overlay";

const Portal = ({ children }: PropsWithChildren) => (
  <HBS.Portal>
    <BottomSheetBlurOverlay />
    {children}
  </HBS.Portal>
);

export const BottomSheet = Object.assign(
  (props: ComponentProps<typeof HBS>) => <HBS {...props} />,
  HBS,
  { Portal },
);
