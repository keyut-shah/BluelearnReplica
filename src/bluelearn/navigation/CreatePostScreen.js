// // // import React from 'react';
// // // import {View,Text} from 'react-native';

// // // export default CreatePostScreen=()=>{
// // //     return(
// // //         <View style={{flex:1}}>
// // //             <Text style={{color:'black'}}>Hello testisng Create Post screen </Text>
// // //         </View>
// // //     )
// // // }
// // import React from 'react';
// // import { View, Text, StatusBar, Button } from 'react-native';
// // import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// // import { moderateScale } from 'react-native-size-matters';
// // import Icons from 'react-native-vector-icons/Ionicons'

// // const CreatePostScreen = ({ navigation }) => {
// //   console.log("does post screen working ")

// //   const handleBackPress = () => {
// //     navigation.goBack();
// //   };

// //   return (
// //     <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
// //       <View style={{ flex: 1, backgroundColor: '#212120' }}>
// //         <View style={{ flexDirection: 'row', marginTop: moderateScale(10), paddingLeft: moderateScale(10), alignItems: 'center', }}>
// //           <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
// //             <Icons
// //               name="arrow-back"
// //               size={moderateScale(25)}
// //               color="white" />
// //           </TouchableWithoutFeedback>
// //           <Text style={{ marginLeft: moderateScale(10), color: 'white', fontSize: moderateScale(20), fontWeight: '500', }}>
// //          Start a disussion
// //           </Text>
// //         </View>


// //         <View style={{ marginTop: moderateScale(20), backgroundColor: 'white', flex: 1, borderTopLeftRadius: moderateScale(30), borderTopRightRadius: moderateScale(30) }}>

// //           <Text style={{
// //             marginTop: moderateScale(25),
// //             color: 'black',
// //             fontSize: moderateScale(17),
// //             fontWeight: '700',
// //             textAlign: 'center'
// //           }}>You have no new notification </Text>

// //           <View style={{ marginTop: moderateScale(22), alignItems: 'center' }}>
// //             <TouchableWithoutFeedback
// //               onPress={handleBackPress}

// //             >

// //               <View style={{
// //                 backgroundColor: '#516af6', paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(15),
// //                 borderRadius: moderateScale(20),
// //                 justifyContent: 'center', alignItems: 'center'
// //               }}>

// //                 <Text style={{
// //                   color: 'white',
// //                   fontSize: moderateScale(14),
// //                   fontWeight: '600'
// //                 }}>Go back </Text>
// //               </View>
// //             </TouchableWithoutFeedback>



// //           </View>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // export default CreatePostScreen;



// import React, {useEffect} from 'react';
// import {View,Text,StatusBar,Button} from 'react-native';
// // import auth from '@react-native-firebase/auth';
// // import database from '@react-native-firebase/database';
// import {  GoogleSignin,
//   GoogleSigninButton,
//   statusCodes, } from '@react-native-google-signin/google-signin';

// // import { firebase } from '@react-native-firebase/auth';

// export default CreatePostScreen=()=>{
//   useEffect(() => {
//     // Configure the GoogleSignIn module
//     GoogleSignin.configure({
//       webClientId: '932592935781-r86b6ms9sl7miv7acus3b87s622j1s5n.apps.googleusercontent.com',
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//     });
//   }, []);

//   const handleGoogleSignIn = async () => {
//     try {
//       // Get the user's ID token and profile information
//       const { idToken, user } = await GoogleSignin.signIn();
//       console.log("does this id token working ", idToken , user )
//       // Create a Google credential
//       const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
//       console.log("does google credential method works")
//       // Sign in to Firebase using the Google credential
//       await firebase.auth().signInWithCredential(googleCredential);

//       // You are now signed in with Firebase!
//       console.log('Signed in with Firebase:', user);
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // User cancelled the sign-in process
//         console.log('Google sign-in cancelled');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // Sign-in operation is already in progress
//         console.log('Google sign-in operation in progress');
//       } else {
//         // Handle other errors
//         console.log('Google sign-in error:', error);
//       }
//     }
//   };

//     return(
//         <View style={{flex:1,marginTop:StatusBar.currentHeight}}>
           
//            <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
//         </View>
//     )
// }
export default CreatePostScreen=()=>{
  return(
    <View></View>
  )
}