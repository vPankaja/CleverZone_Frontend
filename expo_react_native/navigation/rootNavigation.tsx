import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { stackNames } from '../constants/navConsts/stackNames';
import AuthStack from './stacks/authStack';
import { navConfig } from './navigatinConfigs';
import Tabs from './tabNavigation';


const RootNavigation = () => {
    const RootStackNav = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <RootStackNav.Navigator>
    <RootStackNav.Screen
          name={stackNames.AUTH}
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
          <RootStackNav.Screen
          name={stackNames.TABS}
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
   
    </RootStackNav.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation