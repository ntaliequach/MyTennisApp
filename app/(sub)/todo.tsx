import * as React from "react";
import { SafeAreaView, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const routes = [
  { key: "first", title: "First" },
  { key: "second", title: "Second" },
];

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView className='bg-bgColor flex-1'>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      />
      </SafeAreaView>
  );
}
