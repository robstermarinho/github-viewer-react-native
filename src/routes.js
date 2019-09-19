import {createAppContainer, createStackNavigator} from 'react-navigation';

import Main from './pages/Main';
import User from './pages/User';
import Web from './pages/Web';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Web,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#ff9c08',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
