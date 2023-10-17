// SignInScreen.js
import React,{useEffect, useState} from 'react';
import { View, Text, Button ,Alert, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { normalize } from '../../Normalize';
import Loader from './Loader';
import database from '@react-native-firebase/database';

const SignInScreen = ({navigation}) => {
  const [isLaoding,setisLoading]=useState(true);
    useEffect(() => {
        // Initialize Google Sign-In
        GoogleSignin.configure({
            // Replace with your own Web Client ID (for Android) and iOS Client ID
            webClientId: '565000836348-aadjh3sj276jcgn8ms3lqe04cieh2605.apps.googleusercontent.com',
            offlineAccess: true,
        });
        console.log("does this methos is call ")
        // if(isSignedIn){
        //   navigation.navigate('BottomHome')
    
        // }
        
    }, []);

    async function onGoogleButtonPress({navigation}) {
        // Check if your device supports Google Play
        try {
            // Open Google Sign-In dialog
            const user_details = await GoogleSignin.signIn();
            // User successfully signed in, you can now access user data
            const isSignedIn = await GoogleSignin.isSignedIn();
            setisLoading(false);
                const userInfo = await GoogleSignin.signInSilently();
                console.log('user info is ' ,userInfo)
                const userId = userInfo.user.id;
                console.log("userId is ==>", userId)
                const userSnapshot = await database().ref(`users/${userId}`).once('value');

                if (userSnapshot.exists()) {
                    // User is already signed in, handle the case accordingly
                    console.log('User is already signed in');
                    navigation.navigate('MessageScreen')
         
                  } else {
                    // User is signing in for the first time, create a new object in the database
                    console.log('User is signing in for the first time', );
                    await database().ref(`users/${userId}`).set({
                      name: userInfo.user.name,
                      email: userInfo.user.email,
                      profilePicture: userInfo.user.photo,
                      uniquename:userInfo.user.name.split(' ').join('').toLowerCase(),
                        aboutme:"",
                        headline:"",
                        education:{
                            college:"",
                            passout_year:""
                        },
                        location:"",
                        userId:userId,
                        socaillinks:{
                            twitter:"",
                            instagram:"",
                            facebook:"",
                            linkedin:"",

                        },
                        prrof_of_work:{
                            link:"",
                            pdf:"",
                        },
                        skills:{
                            exploring:[],
                            currently_learning:[],
                            used_in_projects:[],
                            have_work_experience:[]
                        },
                        friends:[],

                        

                      // Add other user-specific data as needed
                    });
                }
                
                navigation.navigate('MessageScreen')
         
            console.log("user succesfully sign in ", user_details)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                return null;
            }
            else if (error.code === statusCodes.IN_PROGRESS) {
            }
                else{

                
               ()=>{ Alert.alert("something went wrong pls try again")}
                }

            
        }
    }


    return (
      <>
      {/* {(isLaoding)? (<View>
        <Loader visible={true }/>
        
        </View>): */}
        <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Bluelarn Replica</Text>
      <TouchableOpacity style={styles.googleSignInButton} onPress={onGoogleButtonPress}>
        <Text style={styles.googleSignInButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <View style={{marginTop:normalize(40)}}>
      <Text style={{
         fontSize: 20,
         marginBottom: 20,
         color:'black'
      }}>Created By Keyut</Text>
      </View>
    </View>

    </>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color:'black'
    },
    googleSignInButton: {
      backgroundColor: '#4285F4',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    googleSignInButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default SignInScreen;
