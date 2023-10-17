import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StatusBar } from 'react-native'
import BottomTab from './main_navigatoin'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostSearchScreen from "./PostSearchScreen";
import MessageScreen from "./MessageScreen";
import CreatePostScreen from "./CreatePostScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const Stack = createNativeStackNavigator();

const Routenavigation = () => {
  const   isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    // setState({ isLoginScreenPresented: !isSignedIn });
    console.log("is sign in", isSignedIn)
  };
  return (
 
        <NavigationContainer>

          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              headerBackTitleVisible: false,
              orientation: "portrait",
            }}
          >
            <Stack.Screen name="Home" component={BottomTab} />
            <Stack.Screen name="PostSearch" component={PostSearchScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
        
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            {/* <Stack.Screen name="WorkFilter" component={WorkFilterScreen} /> */}
          
        
          </Stack.Navigator>
        </NavigationContainer>
     

  )
}
export default Routenavigation;


