import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import WebGit from './pages/WebGit';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      WebGit,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#23b283',
        },
        headerTintColor: '#fff',
      },
    }
  )
);

export default Routes;
