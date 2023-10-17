import React, { isValidElement, useEffect ,useState} from 'react'
import { View, Text, TouchableOpacity, Button, StatusBar } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../HomeScreen/HomeScreen';
import NetworkScreen from '../NetworkScreen/NetWorkScreen';
import WorkScreen from '../WorkScreen/WorkScreen';
import EventScreen from '../EventsScreen/EventsScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import Icons from 'react-native-vector-icons/Ionicons'
import MyTabBar from './custom_tabbar';
import FilterScreen from '../WorkScreen/FilterScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostSearchScreen from './PostSearchScreen';
import MessageScreen from './MessageScreen';
import CreateOportunityScreen from '../WorkScreen/CreateOportunityScreen';
import CreatePostScreen from './CreatePostScreen';
import SignInScreen from './LoginScreen';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { AuthProvider, AuthContext } from '../AuthContext';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import NotificationScreen from './NotificationScreen';
import { useIsFocused } from '@react-navigation/native';
import FriendsListScreen from './FriendsListScreen';
function Feed({ navigation }) {
  return (
    <View>
      <Text>This is my feed screen</Text>
      <Button
        title="Go to Profile Screen"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  )
}

function Messages({ navigation }) {
  return (
    <View>
      <Text>This is my Messages screen</Text>
    </View>
  )
}
function BottomTab({navigation}){
 
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,

      }}
      // initialRouteName='Work'
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Network" component={NetworkScreen} />
      <Tab.Screen name="Work" component={WorkScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
}

// const WorkStack = createStackNavigator();


export default AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect( ()=>{
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if(isSignedIn){
  //     navigation.navigate('BottomHome')

  //   }
  //   else{
  //     navigation.navigate('SignInScreen');
  //   }
  const checkIsAuthenticated = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsAuthenticated(isSignedIn);
  };
  checkIsAuthenticated();
  },[])
  return (
    
    <View style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ felx: 1 }}> */}
        <StatusBar barStyle="light-content" backgroundColor="#212120" translucent={true} />
        {/* <StatusBar barStyle="light-content" backgroundColor="green" translucent={true} /> */}
        <View style={{ flex: 1 }}>
     
          <NavigationContainer>
            <Stack.Navigator
            screenOptions={{headerShown:false}}
            initialRouteName={SignInScreen}
            >
                {isAuthenticated ? (
                  <>
              <Stack.Screen
                name="BottomHome"
                component={BottomTab}
              />
              <Stack.Screen name="Feed" component={Feed} />
           
              <Stack.Screen name="PostSearchScreen" component={PostSearchScreen} />
              <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
            <Stack.Screen name="CreateOportunityScreen" component={CreateOportunityScreen} />
            <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
            <Stack.Screen name="FriendsListScreen" component={FriendsListScreen} />
            </>
                ):(
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
                )}

              {/* <Stack.Screen name="Settings" component={Settings} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        
        </View>
      {/* </SafeAreaView> */}
    </View>
  );
}

   {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}