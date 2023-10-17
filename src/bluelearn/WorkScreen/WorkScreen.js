import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Button, SafeAreaView, StatusBar,Linking ,TextInput} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterScreen from './FilterScreen';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

function WorkScreen({ navigation }) {
 
const [isvisible,setisvisible]=useState(false);
  return (


    <SafeAreaView style={{ flex: 1, backgroundColor: "#212120" }}>

      <View style={{ flex: 1, backgroundColor: "#212120", flexDirection: 'row', marginTop: StatusBar.currentHeight }}>
        <View style={{ flexDirection: 'row', flex: 5.32, alignItems: 'center', paddingLeft: 15 }}>

          <Text style={{ color: "white", fontSize: 25, fontWeight: '600' }}>Work</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity 
          onPress={()=>{
            Linking.openURL(`https://wa.me/8980865111?text=Hello Keyut `);
          }}
          >
            <Icons
              name="logo-whatsapp"
              size={25}
              // color={isFocused ? '#516af6' : 'black'}
              color="white"

            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate('NotificationScreen')}
          >
            <Icons
              name="notifications-outline"
              size={25}
              // color={isFocused ? '#516af6' : 'black'}
              color="white"

            />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <TouchableOpacity
          onPress={()=>navigation.navigate('FriendsListScreen')}
          >
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
        style={{ flex: 12.5, backgroundColor: "#f0f0f0  ", }}
      >
        <View

          style={{ flex: 1.1, backgroundColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'center' }}>

          <View style={{ flex: 2.5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "black", fontWeight: '400' }}>Opportunities for you </Text>
          </View>
          <View style={{ flex: 1,  }}>

          </View>
          <View style={{ flex: 1.2, justifyContent: 'center',alignItems:'center' }}>
           
              <TouchableWithoutFeedback
                style={{ backgroundColor: 'white', borderRadius: 25, padding: 5,paddingLeft:15 ,paddingEnd:15,flexDirection:'row'}}
                onPress={()=>{navigation.navigate('FilterScreen')}}

              >

                <Text style={{ color: 'black' ,fontSize:12}}>Filters</Text>
                <View style={{alignItems:'center',justifyContent:'center',paddingLeft:5}}>
                <AntDesign name="filter" size={15} color="black" />
                </View>
              </TouchableWithoutFeedback>
          
          </View>
          {/* <View style={{ flex: 1, borderwidth: 2 ,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity 
          onPress={()=>{setisvisible(true)}}
          >
                    <Icons
                        name="search"
                        size={25}
                       
                        color="black"

                    />
                    </TouchableOpacity>
          </View> */}
        </View>
          {/* {
            isvisible &&
            <View style={{ paddingHorizontal: moderateScale(7) }}>
            <TextInput
              placeholder='Search members'
              placeholderTextColor='white'
              style={{
                paddingVertical: moderateScale(4),
                backgroundColor: 'transparent' // Set the TextInput background to transparent
              }}
            />
          </View>
         
          } */}
        <View
          style={{ backgroundColor: 'white', flex: 12.5, borderwidth: 2, }}
        ></View>
      </View>

    </SafeAreaView>
  );
}
export default WorkScreen;

// const Stack = createStackNavigator();

// function App() {
//   return (
   
//       <Stack.Navigator>
//         <Stack.Screen name="Work" component={WorkScreen} 
//         options={{headerShown:false}}
//         />
//         <Stack.Screen name="Filter" component={FilterScreen}
//         options={{ta}}

//         />
//       </Stack.Navigator>
  
//   );
// }

// export default App;