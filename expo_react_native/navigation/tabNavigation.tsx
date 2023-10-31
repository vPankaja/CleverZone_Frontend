import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { stackNames } from '../constants/navConsts/stackNames';
import HomeStack from './stacks/homeStack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import an icon library
import ChatNew from '../components/ChatNew';
import Chat from '../components/Chat';

const Tab = createBottomTabNavigator();

const whiteBackgroundColor = '#FFFFFF'; // White background color
const purpleColor = '#800080'; // Purple color
const grayColor = '#808080'; // Gray color

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={stackNames.HOME}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: purpleColor, // Active icon color
        tabBarInactiveTintColor: grayColor, // Inactive icon color
        tabBarStyle: {
          backgroundColor: whiteBackgroundColor, // White background color
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Define which icon to show based on the route name
          if (route.name === stackNames.HOME) {
            iconName = 'home';
          } else if (route.name === stackNames.LOGOUT) {
            iconName = 'log-out';
          }else if (route.name===stackNames.SETTINGS){
            iconName = 'settings';
          }else if (route.name===stackNames.CHATBOT){
            iconName='chatbubbles';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={stackNames.HOME}
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={stackNames.LOGOUT}
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
            <Tab.Screen
        name={stackNames.CHATBOT}
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
            <Tab.Screen
        name={stackNames.SETTINGS}
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      
    </Tab.Navigator>
  );
};

export default Tabs;