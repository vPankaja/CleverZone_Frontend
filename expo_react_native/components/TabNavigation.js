import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./Loading";
import DashBoard from "./DashBoard";
import HumanBodyParts from "./HumanBodyParts";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Loading"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Home"
          component={DashBoard}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Nipuna"
          component={DashBoard}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
