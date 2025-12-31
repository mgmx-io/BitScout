import { View } from "react-native";
import * as ContextMenu from "zeego/context-menu";

export const Root = ContextMenu.Root;

export const Trigger = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Trigger>) => (
    <ContextMenu.Trigger {...props} asChild>
      <View aria-role="button">{props.children}</View>
    </ContextMenu.Trigger>
  ),
  "Trigger",
);

export const Content = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Content>) => (
    <ContextMenu.Content {...props} />
  ),
  "Content",
);

export const Item = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Item>) => (
    <ContextMenu.Item {...props} />
  ),
  "Item",
);

export const ItemTitle = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemTitle>) => (
    <ContextMenu.ItemTitle {...props} />
  ),
  "ItemTitle",
);

export const ItemIcon = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemIcon>) => (
    <ContextMenu.ItemIcon {...props} />
  ),
  "ItemIcon",
);

export const ItemImage = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemImage>) => (
    <ContextMenu.ItemImage {...props} />
  ),
  "ItemImage",
);

export const CheckboxItem = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.CheckboxItem>) => (
    <ContextMenu.CheckboxItem {...props} />
  ),
  "CheckboxItem",
);

export const Label = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Label>) => (
    <ContextMenu.Label {...props} />
  ),
  "Label",
);

export const Separator = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Separator>) => (
    <ContextMenu.Separator {...props} />
  ),
  "Separator",
);

export const Group = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Group>) => (
    <ContextMenu.Group {...props} />
  ),
  "Group",
);

export const SubTrigger = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.SubTrigger>) => (
    <ContextMenu.SubTrigger {...props} />
  ),
  "SubTrigger",
);

export const SubContent = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.SubContent>) => (
    <ContextMenu.SubContent {...props} />
  ),
  "SubContent",
);

export const Sub = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Sub>) => (
    <ContextMenu.Sub {...props} />
  ),
  "Sub",
);

export const ItemIndicator = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.ItemIndicator>) => (
    <ContextMenu.ItemIndicator {...props} />
  ),
  "ItemIndicator",
);

export const Preview = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Preview>) => (
    <ContextMenu.Preview {...props} />
  ),
  "Preview",
);

export const Arrow = ContextMenu.create(
  (props: React.ComponentProps<typeof ContextMenu.Arrow>) => (
    <ContextMenu.Arrow {...props} />
  ),
  "Arrow",
);
