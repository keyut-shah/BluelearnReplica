import React, { useReducer, useState } from 'react'
import { View, Text, TouchableOpacity, Button, SafeAreaView, StatusBar,FlatList,Image,TouchableWithoutFeedback} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'
import PostSearchScreen from '../navigation/PostSearchScreen';
// import database from '@react-native-firebase/database';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { normalize } from '../../Normalize';
import { Node } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
// import auth from '@react-native-firebase/auth';

function HomeScreen({ navigation }) {



  const [mystatusbarheight, setstatusbarheight] = useState(null);


      //  const handlepress=async ()=>{

      //     // this works perfectly
      //     try {
      //         const snapshot = await database().ref('/').once('value');
      //         console.log('Data:', snapshot.val());
      //       } catch (error) {
      //         console.error('Error reading data:', error);
      //     }
      //  }
          // perfectly works for the add 
          // try {
          //     const data = {
          //       key1: 'value1',
          //       key2: 'value2',
          //       // Add more key-value pairs as needed
          //     };
          //     database().ref('/profile/').set(data);
          //     console.log('Data added successfully!');
          //   } catch (error) {
          //     console.error('Error adding data:', error);
          //   }



  // // Somewhere in your code
  // signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // setState({ userInfo });
  //     console.log("My userinfo is ",userInfo)
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  //      }
  // GoogleSignin.configure({
  //   webClientId: '932592935781-r86b6ms9sl7miv7acus3b87s622j1s5n.apps.googleusercontent.com',
  // });
  const handlepress = async () => {
    console.log("does handle methid call")
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({ userInfo });
      console.log("My userinfo is ", userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("error happen ", error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // login is already in progress
        console.log("error happen ", error)

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
        console.log("error happen ", error)

      } else {
        // Some other error occurred
        console.log("error happen in else part ", error)

      }
    }
  };


  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("My userinfo is ", userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // login is already in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
      } else {
        // Some other error occurred
      }
    }
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3daa1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '586a94a0f-3da1-471f-bd96-145571e29d72',
      title: '4 Item',
    },
    {
      id: '586g94a0f-3da1-471f-bd96-14557f1e29d72',
      title: '5 Item',
    },
    {
      id: '586h94a0f-3da1-471f-bd96-145571ghe29d72',
      title: '6 Item',
    },
    {
      id: '5869e4a0f-3da1-471f-bd96-145571e2h9d72',
      title: '7 Item',
    },
  ];
  const Item = ({title}) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
    <View style={{
      backgroundColor: 'white',
      marginTop: moderateScale(10),
      padding: moderateScale(15),
     borderRadius:moderateScale(10),
     elevation:3
      }}>
      <View style={{  flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          width: moderateScale(30),
          height: moderateScale(30),
          borderRadius: moderateScale(15),
          backgroundColor: 'grey',
          overflow: 'hidden',
        }}>
          <Image
            source={require('../../assets/logos/instagram.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <View style={{ marginLeft: moderateScale(10) }}>
          <Text style={{ color: 'black', fontSize: moderateScale(15) }}>testing</Text>
        </View>
      </View>
      <View style={{ marginTop: moderateScale(20), paddingRight: moderateScale(15) }}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: '#2e2e2d',
            fontSize: moderateScale(20),
            fontWeight: '600',
            lineHeight: moderateScale(23),
          
          }}
        >
          testing message
        </Text>
      </View>
      <View style={{ marginTop: moderateScale(10), flexDirection: 'row' }}>
        <Text
          style={{
            color: 'black',
            backgroundColor: '#e1e3e1',
            paddingVertical: moderateScale(4),
            paddingHorizontal: moderateScale(8),
            fontWeight: '600',
            borderRadius: moderateScale(10),
            fontSize: moderateScale(12),
          }}
        >
          Marketing Club
        </Text>
      </View>
      <View style={{ flexDirection: 'row', height: moderateScale(1), width: '100%', backgroundColor: 'grey', marginVertical: moderateScale(15) }} />

      <View style={{alignItems:'flex-end', marginEnd:moderateScale(5)}}>
        <TouchableWithoutFeedback >
        <Text style={{color:'#516af6',
        fontSize:moderateScale(13),
        fontWeight:'500'
      }}>Start Conversation {'->'}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
  return (


    <SafeAreaView style={{ flex: 1, backgroundColor: "#212120" }}>

      <View style={{ flex: 2, backgroundColor: "#212120", flexDirection: 'row', marginTop: StatusBar.currentHeight }}>
        <View style={{ flexDirection: 'row', flex: 5.32, alignItems: 'center', paddingLeft: 15 }}>

          <Text style={{ color: "#516af6", fontSize: 25 }}>blue</Text>
          <Text style={{ color: "white", fontSize: 25 }}>learn</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('PostSearchScreen') }}>
            <Icons
              name="search"
              size={25}
              // color={isFocused ? '#516af6' : 'black'}
              color="white"

            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <Icons
              name="notifications-outline"
              size={25}
              // color={isFocused ? '#516af6' : 'black'}
              color="white"

            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
            <Icons
              name="chatbubble-outline"
              size={25}
              // color={isFocused ? '#516af6' : 'black'}
              color="white"

            />
          </TouchableOpacity>
        </View>

      </View>
      <View
        style={{ flex: 25, backgroundColor: "#edebeb", borderTopLeftRadius: 35, borderTopRightRadius: 25 }}
      >
        <View >

        </View>

        <View
          style={{ backgroundColor: 'white' }}
        >
          <Button
            title='Checking '
            onPress={handlepress}

          />
        </View>
         <View style={{flex:1,borderTopLeftRadius:moderateScale(30),backgroundColor:'white' , borderTopRightRadius:moderateScale(30),paddingTop:moderateScale(10), backgroundColor:'#e8eaeb' ,marginHorizontal:normalize(20),
          marginv:normalize(10)
        }}>
      
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      </View>
     
 <TouchableOpacity style={{
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20)
  }} 
  
  onPress={()=>navigation.navigate('CreatePostScreen')}>
      <View style={{
    backgroundColor: '#516af6',
    borderRadius: moderateScale(50),
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  }}>
      <Icon name="plus" size={moderateScale(30)} color="white" />
      </View>
    </TouchableOpacity>
      </View>
      

    </SafeAreaView>
  );
}
export default HomeScreen;
