import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { stackNames } from "../constants/navConsts/stackNames";
import AuthStack from "./stacks/authStack";
import { navConfig } from "./navigatinConfigs";
import Tabs from "./tabNavigation";
import DashBoard from "../components/DashBoard";
import HumanBodyParts from "../components/HumanBodyParts";
import AnimalRecognition from "../components/AnimalRecognition";
import TextRecognition from "../components/TextRecognition";
import TextRecognitionLesson from "../components/lessons/textRecognitionLesson";
import AnatomyLesson from "../components/lessons/AnatomyLesson";
import AnimalRecognitionLesson from "../components/lessons/animalRecognitionLesson";
import Results from "../components/Results";
import AnatomyResults from "../components/AnatomyResults";

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
        <RootStackNav.Screen
          name="HumanBodyParts"
          component={HumanBodyParts}
          options={{
            headerShown: false,
          }}
        />
        <RootStackNav.Screen
          name="Dashboard"
          component={DashBoard}
          options={{
            headerShown: false,
          }}
        />
        <RootStackNav.Screen
          name="AnimalRecognition"
          component={AnimalRecognition}
          options={{
            headerShown: false,
          }}
        />
        <RootStackNav.Screen
          name="TextRecognition"
          component={TextRecognition}
          options={{
            headerShown: false,
          }}
        />
        <RootStackNav.Screen
          name="TextRecognitionLesson"
          component={TextRecognitionLesson}
          options={{
            headerShown: false,
          }}
        />


          <RootStackNav.Screen
          name="AnatomyLesson"
          component={AnatomyLesson}
             options={{
            headerShown: false,
          }}
        />

        <RootStackNav.Screen
          name="AnimalRecognitionLesson"
          component={AnimalRecognitionLesson}
          options={{
            headerShown: false,
          }}
        />
          <RootStackNav.Screen
          name="Results"
          component={Results}

          options={{
            headerShown: false,
          }}
        />

        <RootStackNav.Screen
          name="AnatomyResults"
          component={AnatomyResults}

          options={{
            headerShown: false,
          }}
        />
      </RootStackNav.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
