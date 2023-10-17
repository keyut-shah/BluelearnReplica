// import React, { useState, useRef, useEffect, useContext } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, TouchableWithoutFeedback, Button, Alert } from 'react-native';
// import RBSheet from "react-native-raw-bottom-sheet";
// import { moderateScale } from 'react-native-size-matters';
// import database from '@react-native-firebase/database';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { launchImageLibrary } from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
// import { combineTransition } from 'react-native-reanimated';
// import DocumentPicker from 'react-native-document-picker'

// function EventScreen({ navigation }) {
//   useEffect(() => {
//     // Initialize Google Sign-In
//     GoogleSignin.configure({
//       // Replace with your own Web Client ID (for Android) and iOS Client ID
//       webClientId: '565000836348-aadjh3sj276jcgn8ms3lqe04cieh2605.apps.googleusercontent.com',
//       offlineAccess: true,
//     });
//   }, []);

//   const isSignedIn = async () => {
//     const isSignedIn = await GoogleSignin.isSignedIn();
//     // setState({ isLoginScreenPresented: !isSignedIn });
//     console.log("is sign in", isSignedIn)
//   };
//   const signOut = async () => {
//     try {
//       const answer = await GoogleSignin.signOut();
//       // setState({ user: null }); // Remember to remove the user from your app's state as well
//       console.log("resposne after sing is ", answer)
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   async function onGoogleButtonPress() {
//     // Check if your device supports Google Play
//     try {
//       // Open Google Sign-In dialog
//       const user_details = await GoogleSignin.signIn();
//       // User successfully signed in, you can now access user data
//       console.log("user succesfully sign in ", user_details)
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // User canceled the sign-in process
//         console.log("user sign out ")
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // Sign-in process already in progress
//         console.key1("something happens")
//       } else {
//         // Other error occurred
//       }
//     }
//   }
//   const handlefirebase = async () => {
//     //        try {
//     //     const snapshot = await database().ref('/').once('value');
//     //     console.log('Data:', snapshot.val());
//     //   } catch (error) {
//     //     console.error('Error reading data:', error);
//     // }
//     try {
//       const data = {
//         key1: 'value1',
//         key2: 'value2',
//         // Add more key-value pairs as needed
//       };
//       database().ref('/profile/').set(data);
//       console.log('Data added successfully!');
//     } catch (error) {
//       console.error('Error adding data:', error);
//     }
//   }
//   const [imageSource, setImageSource] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [pickedDocument, setPickedDocument] = useState(null);
//   const [result, setResult] = useState();
//   const selectImageHandler = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (!response.didCancel && !response.errorCode) {
//         const { uri } = response.assets[0];
//         uploadImage(uri);
//       }
//     });
//   };

//   const uploadImage = async (uri) => {
//     console.log("my uri is ", uri)
//     const imageName = 'my-image5.jpg';
//     const reference = storage().ref(`images/${imageName}`);

//     try {
//       await reference.putFile(uri);
//       const downloadURL = await reference.getDownloadURL();
//       console.log('Image uploaded successfully. Download URL:', downloadURL);
//       setSelectedImage(downloadURL);
//     } catch (error) {
//       console.log('Error uploading image:', error);
//     }
//   };




//   const handleImagePicker = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       console.log("my response after picking the image ", response);

//       if (response.assets && response.assets.length > 0 && !response.didCancel && !response.errorCode) {
//         const selectedImage = response.assets[0];
//         setImageSource(selectedImage.uri);
//         setSelectedImage(selectedImage);
//       }
//     });
//   };

//   const handlePickDocument = async () => {
//     const response = await DocumentPicker.pick({
//       type: 'pdf',
//       multiple: false,
//       title: 'Select a PDF document',
//     });

//     if (response.cancelled) {
//       console.log('Document picker was cancelled');
//     } else {
//       console.log('Document picked:', response.uri);
//     }
//   };


//   const [selectedDocument, setSelectedDocument] = useState(null);

//   const pickDocument = async () => {
//     try {
//       const result = await DocumentPicker.pick({

//         allowMultiSelection: false,
//         type: [DocumentPicker.types.allFiles], // You can specify the type of documents you want to allow, e.g., DocumentPicker.types.pdf, DocumentPicker.types.images, etc.
//       });
//       console.log("result getting after picking document ", result[0].uri)
//       uploaddocument(result[0])
//       setSelectedDocument(result.uri);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled the document picker.');
//       } else {
//         console.log('Error selecting the document:', err);
//       }
//     }
//   };
//   const uploaddocument = async (uri) => {
//     console.log("my uri is ", uri)
//     const documentName = `${uri.name}${Math.random() * 100}`;
//     const reference = storage().ref(`document/${documentName}`);

//     try {
//       await reference.putFile(uri?.uri);
//       const downloadURL = await reference.getDownloadURL();
//       console.log('Image uploaded successfully. Download URL:', downloadURL);
//       setImageSource(downloadURL);
//     } catch (error) {
//       Alert.alert("Something went wrong")
//       console.log('Error uploading image:', error);
//     }

//   }
//   return (
//     <View style={{ flex: 1, paddingTop: moderateScale(20), paddingHorizontal: moderateScale(20), marginTop: StatusBar.currentHeight }}>
//       {/* <Button title="Pick Document" onPress={pickDocument} />
//       {pickedDocument && (
//         <View>
//           <Text>File URI: {pickedDocument.uri}</Text>
//           <Text>File Type: {pickedDocument.type}</Text>
//           <Text>File Name: {pickedDocument.name}</Text>
//           <Text>File Size: {pickedDocument.size} bytes</Text>
//         </View>
        
//       )}
//          <Button
//         title="open picker for single file selection"
//         onPress={async () => {
//           try {
//             const pickerResult = await DocumentPicker.pickSingle({
//               presentationStyle: 'fullScreen',
//               copyTo: 'cachesDirectory',
//             })
//             console.log("picker ", pickerResult)
//             setResult([pickerResult])
//           } catch (e) {
//             handleError(e)
//           }
//         }}
//       /> */}
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {selectedDocument ? (
//           <Text>Selected Document URI: {selectedDocument}</Text>
//         ) : (
//           <Text>No document selected</Text>
//         )}
//         <Button title="Pick Document" onPress={pickDocument} />
//       </View>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//     margin: 20
//   },
// });
// export default EventScreen
// SignInScreen.js
import React,{useEffect, useState} from 'react';
import { View, Text, Button ,Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { normalize } from '../../Normalize';
import database from '@react-native-firebase/database';

export default EventScreen = ({navigation}) => {
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

    async function onGoogleButtonPress() {
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
                        }

                        

                      // Add other user-specific data as needed
                    });
                }
                
                navigation.navigate('BottomHome')
          
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
  

