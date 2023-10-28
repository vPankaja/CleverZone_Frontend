import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {screenNames} from '../../constants/screenNames';
// import {navConfig} from '../navigationConfigs';
import Welcome from '../../components/Welcome';
import { navConfig } from '../navigatinConfigs';
import { screenNames } from '../../constants/navConsts/screenNames';
import Register from '../../components/Register';
import Login from '../../components/Login';


const AuthStackNav = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthStackNav.Navigator>
      <AuthStackNav.Screen
        name={screenNames.WELCOME}
        component={Welcome}
        options={navConfig}
      />
         <AuthStackNav.Screen
        name={screenNames.LOGIN}
        component={Login}
        options={navConfig}
      />
       <AuthStackNav.Screen
        name={screenNames.REGISTER}
        component={Register}
        options={navConfig}
      />
    </AuthStackNav.Navigator>
  );
};

export default AuthStack;
