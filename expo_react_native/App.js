import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import Loading from "./components/Loading";
import Welcome from "./components/Welcome";
import Tabs from "./components/TabNavigation";
import AnimalRecognition from "./components/AnimalRecognition";
import TextRecognition from "./components/TextRecognition";
import HumanBodyParts from "./components/HumanBodyParts";
import ForgotPassword from "./components/ForgotPassword";
import Chat from "./components/Chat";
import Results from "./components/Results";
import { initializeApp } from "firebase/app";
import { LogBox, SafeAreaView, StatusBar } from "react-native";
import "react-native-gesture-handler";
import RootNavigation from "./navigation/rootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["Warning: ..."], (isAffected, bundle) => {
  return isAffected || bundle.includes("example.js");
});

const firebaseConfig = {
  apiKey: "AIzaSyC-t36J9j_F52PMDgNiRj5v33oVsgKcIG0",
  authDomain: "clever-zone.firebaseapp.com",
  projectId: "clever-zone",
  storageBucket: "clever-zone.appspot.com",
  messagingSenderId: "287791336634",
  appId: "1:287791336634:web:180d7455812eebe9f1c683",
  measurementId: "G-SFSXHTWFLP",
};

initializeApp(firebaseConfig);

// const App = createStackNavigator(
//   {
//     Loading: { screen: Loading },
//     Welcome: { screen: Welcome },
//     // DashBoard: { screen: DashBoard },
//     Login: { screen: Login },
//     ForgotPassword: { screen: ForgotPassword },
//     Register: { screen: Register },
//     // HumanBodyParts: { screen: HumanBodyParts },
//     TextRecognition: { screen: TextRecognition },
//     AnimalRecognition: { screen: AnimalRecognition },
//     Chat: { screen: Chat },
//     Results: { screen: Results },
//     Tabs: { screen: Tabs },
//   },
//   {
//     initialRouteName: "Loading",
//   }
//   // ko tab ek
// );
// export default createAppContainer(App);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* content */}
      <StatusBar />
      <RootNavigation />
    </GestureHandlerRootView>
  );
};

export default App;
