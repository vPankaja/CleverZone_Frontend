import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {screenNames} from '../../constants/screenNames';
// import {navConfig} from '../navigationConfigs';
import Welcome from '../../components/Welcome';
import { navConfig } from '../navigatinConfigs';
import { screenNames } from '../../constants/navConsts/screenNames';
import Register from '../../components/Register';
import Login from '../../components/Login';
import TextRecognition from '../../components/TextRecognition';
import HumanBodyParts from '../../components/HumanBodyParts';
import AnimalRecognition from '../../components/AnimalRecognition';
import DashBoard from '../../components/DashBoard';
import Results from '../../components/Results';
import Chat from '../../components/Chat';
import AnatomyResults from '../../components/AnatomyResults';
import ChatNew from '../../components/ChatNew';



const HomeStackNav = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNav.Navigator initialRouteName={screenNames.DASHBOARD}>
          <HomeStackNav.Screen
        name={screenNames.DASHBOARD}
        component={DashBoard}
        options={navConfig}
        
      />
      <HomeStackNav.Screen
        name={screenNames.TEXT_RECOGNITION}
        component={TextRecognition}
        options={navConfig}
      />
         <HomeStackNav.Screen
        name={screenNames.HUMAN_BODY}
        component={HumanBodyParts}
        options={navConfig}
      />
       <HomeStackNav.Screen
        name={screenNames.ANIMAL}
        component={AnimalRecognition}
        options={navConfig}
      />
        <HomeStackNav.Screen
        name={screenNames.RESULTS}
        component={Results}
        options={navConfig}
      />
       <HomeStackNav.Screen
        name={screenNames.CHAT}
        component={ChatNew}
        options={navConfig}
      />
      <HomeStackNav.Screen
        name={screenNames.ANATOMY_RESULTS}
        component={AnatomyResults}
        options={navConfig}
      />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;
