/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import {AppRegistry} from 'react-native';
// import App from './App';
import AppNavigator  from './src/bluelearn/navigation/main_navigatoin'
// import Routenavigation from './src/bluelearn/navigation/Routenavigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
