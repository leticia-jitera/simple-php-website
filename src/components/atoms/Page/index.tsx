import { memo } from "react";
import { StatusBar, StatusBarProps, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Page = memo(({
  style,
  children,
  statusBar,
}: ViewProps & { statusBar?: StatusBarProps }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }, style]}
    >
      <StatusBar {...statusBar} />
      {children}
    </View>
  );
})
