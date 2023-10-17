// import React, { useState ,useRef} from 'react'
// import { View, Text, TouchableOpacity, Button, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback ,FlatList,StyleSheet,StatusBar} from 'react-native';
// import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import Icons from 'react-native-vector-icons/Ionicons'
// import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { Screen } from 'react-native-screens';
// import { moderateScale } from 'react-native-size-matters';


// function NetworkScreen({ navigation }) {
//   const [visible, setvisible] = useState(false);
//   const bottomSheetModalRef = useRef(null);

//   const openBottomSheet = () => {
//     if (bottomSheetModalRef.current) {
//       bottomSheetModalRef.current.present();
//     }
//   };

//   const handlelocationinnetworkscreen = () => {
//     console.log("Click on the All locations ");
//     setvisible(true);
//   }
//   const handleinterestsinnetworkscreen = () => {
//     console.log("Click on the All Interests ");

//   }
//   const DATA = [
//     {
//       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//       title: 'First Item',
//     },
//     {
//       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//       title: 'Second Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: 'Third Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: '4 Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: '5 Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: '6 Item',
//     },
//     {
//       id: '58694a0f-3da1-471f-bd96-145571e29d72',
//       title: '7 Item',
//     },
//   ];
//   const Item = ({title}) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
//       <View style={{ flex: 1, }}>
//         {/* network screens  */}
//         <View style={{ flex: 1, backgroundColor: "#212120", marginTop: StatusBar.currentHeight, }}>
//           {/* Network header part  */}
//           <View style={{ flex: 1.2, }}>
//             {/* 1st row */}
//             <View style={{ flex: 1.1, flexDirection: 'row', }}>
//               {/* Network text */}
//               <View style={{ flex: 6.35, justifyContent: 'center', paddingLeft: 15 }}>
//                 <Text style={{ color: 'white', fontSize: 24, textAlign: 'left', fontWeight: '600' }}>Network</Text>
//               </View>

//               {/* notification icon  */}
//               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//                 <TouchableOpacity>
//                   <Icons
//                     name="notifications-outline"
//                     size={25}
//                     color="white"
//                   />
//                 </TouchableOpacity>

//               </View>
//               {/* message icon */}
//               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
//                 <TouchableOpacity>
//                   <Icons
//                     name="chatbubble-outline"
//                     size={25}
//                     color="white"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* 2nd row */}
//             <View style={{ flex: 1.1, }}>
//               {/* Seacrh bar */}
//               <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: '3%', marginVertical: '2.5%', backgroundColor: '#545350', borderRadius: 20, }}>
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                   <Icons name="search" size={20} color="white" />
//                 </View>
//                 <View style={{ flex: 7, justifyContent: 'center', }}>
//                   <TouchableWithoutFeedback>
//                     <TextInput
//                       placeholder='Search members '
//                       placeholderTextColor="white"
//                       style={{ paddingVertical: '1%' }}
//                     />
//                   </TouchableWithoutFeedback>
//                 </View>
//               </View>
//             </View>
//             {/* 3rd row */}
//             <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: '3%', justifyContent: 'center' }}>
//           {/* filer by location  */}
//           <BottomSheetModalProvider>

//               <TouchableWithoutFeedback
//                 // onPress={() => { handlelocationinnetworkscreen() }}
//                 onPress={openBottomSheet}
//               >


//                 <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', marginBottom: '2.5%', marginEnd: '2%', flexDirection: 'row', alignItems: 'center' }}>
//                   <Text style={{ color: '#545350', marginEnd: '2%', fontWeight: '600' }}>All Locations</Text>
//                   <Icons
//                     name="chevron-down-outline"
//                     size={22}
//                     color='#545350'
//                   />
//                 </View>

//               </TouchableWithoutFeedback>
//   <BottomSheetModal
//         ref={bottomSheetModalRef}
//         // Specify other configuration options for the bottom sheet modal
//       >
//         {/* Your bottom sheet content */}
//       </BottomSheetModal>
//     </BottomSheetModalProvider>

//               {/* filter by roles or interest  */}
//               <TouchableWithoutFeedback
//                 onPress={() => { handleinterestsinnetworkscreen() }}
//               >
//                 <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 25, marginBottom: '2.5%', marginStart: '2%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                   <Text style={{ color: '#545350', marginEnd: '2%', fontWeight: '600' }}>All Interests </Text>
//                   <Icons
//                     name="chevron-down-outline"
//                     size={22}
//                     color='#545350'
//                   />
//                 </View>
//               </TouchableWithoutFeedback>


//             </View>
//           </View>

//           {/* Network remaning part  */}
//           <View style={{ flex: 4.4, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>

//           <FlatList
//         data={DATA}
//         renderItem={({item}) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//       />
//           </View>
//         </View>
//       </View>
//       </KeyboardAvoidingView>  



//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//     color:'green'
//   },
// });

// export default NetworkScreen;


import React,{useRef,useEffect,useState,useCallback} from 'react'
// import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { normalize } from '../../Normalize';
import { View, Text, TouchableOpacity, Button, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, FlatList, StyleSheet, StatusBar ,Alert,GestureHandlerRootView,  NativeViewGestureHandler,Image
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons'
import { Screen } from 'react-native-screens';
import RBSheet from "react-native-raw-bottom-sheet";
// import { isNewWebImplementationEnabled } from 'react-native-gesture-handler/lib/typescript/EnableNewWebImplementation';
export default function NetworkScreen({navigation}) {
  
  const renderinterestflatlist=(item)=>{
console.log("My item contains ", item);
return(
  <View style={styles.item}>
      <Text style={styles.title}>{item?.title}</Text>
    </View>
)
  }
  // const refRBSheet = useRef();
  const refLocationSheet = useRef();
const refInterestSheet = useRef();
    const INTERESTSDATA=[
      {
        id: '1',
        title: 'Cyber Security',
      },
      {
        id: '2',
        title: 'Video Editing ',
      },
      {
        id: '3',
        title: 'Marketing',
      },
      {
        id: '4',
        title: 'Graphic Design ',
      },
      {
        id: '5',
        title: 'Photography',
      },
      {
        id: '6',
        title: 'Competitive Programing ',
      },
      {
        id: '7',
        title: 'Stock Market',
      },
      {
        id: '8',
        title: 'Content creation',
      },
      {
        id: '9',
        title: 'Music',
      },
      {
        id: '10',
        title: 'Web3',
      },
      {
        id: '11',
        title: 'full time jobs ',
      },
      {
        id: '12',
        title: 'Startups',
      },



    ]
    const LOCATIONDATA=[
      {
        id: '1',
        title: 'Hyderabad, Telegana',
      },
      {
        id: '2',
        title: 'Banglore, Karnataka ',
      },
      {
        id: '3',
        title: 'Delhi,Delhi',
      },
      {
        id: '4',
        title: 'Pune,Maharashtra ',
      },
      {
        id: '5',
        title: 'Mumbai,Maharashtra',
      },
      {
        id: '6',
        title: 'Ahmedabad, Gujarat ',
      },
      {
        id: '7',
        title: 'Surat, Gujarat',
      },
      {
        id: '8',
        title: 'Noida, UttarPradesh',
      },
      {
        id: '9',
        title: 'Bhopal, MadhyaPradesh',
      },
      {
        id: '10',
        title: 'Kolkata, WestBengal',
      },
      {
        id: '11',
        title: 'Jaipur , Rajasthan ',
      },
      {
        id: '12',
        title: 'Chennai, TamilNadu',
      },



    ]
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
    <View style={{borderWidth:1,marginTop:moderateScale(10),marginHorizontal:moderateScale(10),backgroundColor:'white',borderRadius:moderateScale(10),padding: moderateScale(10)}}>
    <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
        <Image source={require('../../assets/logos/Facebook_Logo.png')} style={{ width: moderateScale(40), height: moderateScale(40), marginRight: moderateScale(10) }} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ fontSize: moderateScale(16), color:'black' }}>Your Text 1</Text>
          <Text style={{ fontSize: moderateScale(14), color: 'gray' }}>Your Text 2</Text>
        </View>
        <View style={{backgroundColor:'#516af6',padding:moderateScale(10),borderRadius:moderateScale(25)}}> 
        <Icons
                        name="chatbubble-outline"
                        size={moderateScale(20)}
                        color="white"

                    />
         </View>
    </View>

      {/* if about me is not null  */}
      <View style={{marginTop:moderateScale(10)}}>
       <Text
       style={{color:'#434545'}}
       >A designer with over 5 years of experience, who liked to make youtube videos </Text>
      </View>

      {/* talk me about currently doesn't find let's see  */}
      <View>
        <Text>Talk me about</Text>
     
      </View>
      <TouchableWithoutFeedback style={{backgroundColor:''}}>
      <Text style={{}}>Freelancing</Text>
      </TouchableWithoutFeedback>
    </View>
  );


  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(null);

  return (
    <View style={styles.network_container}>
      <View style={styles.network_headercontainer}>
        <View style={{
          flex: 7,
          //  marginLeft:normalize(15),
          //  paddingLeft:normalize(15),
          // borderWidth:2,
          // borderColor:'yellow'
        }}>
          <View
            style={{ paddingLeft: moderateScale(15) }}
          >
            <Text style={styles.netwroktext} >Network</Text>
          </View>
        </View>
        <View style={{
          flex: 2, flexDirection: 'row',
          // borderWidth:2,
          // borderColor:'violet',
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate('NotificationScreen')}
          >
            <Icons
              name="notifications-outline"
              size={moderateScale(23)}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: moderateScale(20)
            }}
            onPress={()=>navigation.navigate('MessageScreen')}
          >
            <Icons
              name="chatbubble-outline"

              size={moderateScale(23)}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View >
      {/* netowrk header search textinout  */}

      <View style={{ paddingVertical: moderateScale(10), }}>
        <View style={{ marginHorizontal: moderateScale(20), backgroundColor: 'grey', borderRadius: moderateScale(25), flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: moderateScale(7) }}>
            <Icons name="search" size={20} color="white" />
          </View>
            <TouchableWithoutFeedback >
          <View style={{flex:1}}>
              <TextInput

                placeholder='Search members '
                placeholderTextColor="white"
                style={{ paddingVertical: moderateScale(4), paddingLeft: moderateScale(7) ,}}
              />
          </View>
            </TouchableWithoutFeedback>
        </View>
      </View>       
                                


      {/*    end of search members */}

      {/* header 3rd row bottom sheet  */}

      <View style={{alignItems:'center',flexDirection:'row',paddingBottom:moderateScale(15),marginHorizontal:moderateScale(20),}}>
        <TouchableWithoutFeedback onPress={() => refLocationSheet.current.open()}>
       <View style={{backgroundColor:'white',flex:1,flexDirection:'row', paddingVertical:moderateScale(8),borderRadius:moderateScale(20),marginRight:moderateScale(10),alignItems:'center',justifyContent:'center'}}>
       
            <Text style={{color:'black' , marginRight:moderateScale(5),fontSize:moderateScale(14)}}>All Locations</Text>
       
          
                   <Icons
                    name="chevron-down-outline"
                    size={moderateScale(22)}
                    color='#545350'
                  />
                    <RBSheet
        ref={refLocationSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
       onClose={()=>{setSelectedLocations(null)
       }}
        customStyles={{
          container: styles.bottomSheetContainer,
          wrapper: styles.bottomSheetWrapper,
          draggableIcon: styles.bottomSheetDraggableIcon,
        }}
      >
       <View style={{flex:1,backgroundColor:'white',paddingLeft:moderateScale(15)}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:4}}>
            <Text style={{color:'black',fontWeight:'700',fontSize:moderateScale(14)}}>Search by Locations</Text>
          </View>
          <View style={{flex:1,}}>
            <TouchableWithoutFeedback onPress={()=>{
              setSelectedLocations(null),
              refLocationSheet.current.close()
              
              }}>
            <Text style={{color:'#516af6'}}>Clear</Text>
            </TouchableWithoutFeedback>
          </View>

        </View>
          {/* <View style={{flex:1,borderWidth:1,borderColor:'red'}}> */}
            {/* <FlatList
            data={INTERESTSDATA}
            renderItem={({item})=>{renderinterestflatlist(item)}}
            keyExtractor={item => item.id}

            /> */}
          {/* </View> */}
          <View style={{ paddingVertical: moderateScale(10), }}>
        <View style={{ marginEnd: moderateScale(10), backgroundColor: 'grey', borderRadius: moderateScale(25), flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: moderateScale(7) ,borderColor:'green',borderRadius:2}}>
            <Icons name="search" size={20} color="white" />
          </View>
            <TouchableWithoutFeedback >
          <View style={{flex:1}}>
              <TextInput

                placeholder='Search members '
                placeholderTextColor="white"
                style={{ paddingVertical: moderateScale(4), paddingLeft: moderateScale(7) ,}}
              />
          </View>
            </TouchableWithoutFeedback>
        </View>
      </View>    
          <FlatList
      data={LOCATIONDATA}
     
      renderItem={({ item ,index}) => (

      
        <TouchableWithoutFeedback 
        onPress={() => {
         setSelectedLocations(index);
        }}
          
        >
        <View style={{width:'100%'}}>
        <Text style={{ color: selectedLocations === index ? '#516af6' : 'black', marginVertical: 10 }}>

            {item?.title}</Text>
        </View>
        </TouchableWithoutFeedback>
        
      )}
      keyExtractor={item => item.id}
     
    />
       </View>  

     
      </RBSheet>
       </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => refInterestSheet.current.open()}>
       <View style={{backgroundColor:'white',flex:1,flexDirection:'row', paddingVertical:moderateScale(8),borderRadius:moderateScale(20),alignItems:'center',justifyContent:'center'}}>
        
       
        <Text style={{color:'black' , marginRight:moderateScale(5), fontSize:moderateScale(14)}}>All interests</Text>
   
      
               <Icons
                name="chevron-down-outline"
                size={moderateScale(22)}
                color='#545350'
              />
        <RBSheet
        ref={refInterestSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
       onClose={()=>{setSelectedItems([])
       }}
        customStyles={{
          container: styles.bottomSheetContainer,
          wrapper: styles.bottomSheetWrapper,
          draggableIcon: styles.bottomSheetDraggableIcon,
        }}
      >
       <View style={{flex:1,backgroundColor:'white',paddingLeft:moderateScale(15)}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:4}}>
            <Text style={{color:'black',fontWeight:'700',fontSize:moderateScale(14)}}>Search by interests</Text>
          </View>
          <View style={{flex:1,}}>
            <TouchableWithoutFeedback onPress={()=>{
              setSelectedItems([]),
              refInterestSheet.current.close()
              
              }}>
            <Text style={{color:'#516af6'}}>Clear</Text>
            </TouchableWithoutFeedback>
          </View>

        </View>
          {/* <View style={{flex:1,borderWidth:1,borderColor:'red'}}> */}
            {/* <FlatList
            data={INTERESTSDATA}
            renderItem={({item})=>{renderinterestflatlist(item)}}
            keyExtractor={item => item.id}

            /> */}
          {/* </View> */}

          <FlatList
      data={INTERESTSDATA}
     
      renderItem={({ item ,index}) => (

      
        <TouchableWithoutFeedback 
        onPress={() => {
          const selectedIndex = selectedItems.indexOf(index);
          let newSelectedItems = [...selectedItems];
          if (selectedIndex !== -1) {
            // Item is already selected, remove it from the array
            newSelectedItems.splice(selectedIndex, 1);
          } else {
            // Item is not selected, add it to the array
            newSelectedItems.push(index);
          }
          setSelectedItems(newSelectedItems);
        }}
          
        >
        <View style={{width:'100%'}}>
        <Text style={{ color: selectedItems.includes(index) ? '#516af6' : 'black',
        fontSize:selectedItems.includes(index)?moderateScale(13):moderateScale(12.75),
        marginVertical: 10 }}>
        {item?.title}</Text>
        </View>
        </TouchableWithoutFeedback>
        
      )}
      keyExtractor={item => item.id}
     
    />
       </View>  
 {selectedItems.length > 0 && (
      <TouchableWithoutFeedback >
        <View style={{backgroundColor:'#516af6',
        justifyContent:'center',alignItems:'center',paddingVertical:moderateScale(12),
        borderRadius:moderateScale(25),
       marginHorizontal:moderateScale(15),
       marginBottom:moderateScale(5)
        }}>
        <Text style={{color:'white',fontSize:moderateScale(13)}}>Apply </Text>
        </View>
      </TouchableWithoutFeedback>
    )}
     
      </RBSheet>
   </View>
   </TouchableWithoutFeedback  >

      </View>

  <View style={{flex:1,borderTopLeftRadius:moderateScale(30),backgroundColor:'white' , borderTopRightRadius:moderateScale(30),paddingTop:moderateScale(10), backgroundColor:'#e8eaeb'}}>
      
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  network_container: {
    flex: 1,
    backgroundColor: "#212120"

  },
  network_headercontainer: {
    // borderColor: 'red',
    // borderWidth:2,
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScale(29),
    // paddingTop:normalize(7),
    // paddingBottom:normalize(10),
    paddingVertical: moderateScale(10),

    // borderWidth: 2
  },
  netwroktext: {
    color: 'white',
    fontSize: moderateScale(22),
    fontWeight: '600'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color:'green'
  },
  bottomSheetContainer: {
    height:'50%',
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the background color to achieve the blur effect
  },
  bottomSheetDraggableIcon: {
    backgroundColor: 'white',
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
  
// });


















































// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
// import Icons from 'react-native-vector-icons/Ionicons';
// import MyTabBar from '../navigation/custom_tabbar';

// function NetworkScreen({ navigation }) {
//   const [isSearchFocused, setIsSearchFocused] = useState(false);

//   const handleSearchFocus = () => {
//     setIsSearchFocused(true);
//   };

//   const handleSearchBlur = () => {
//     setIsSearchFocused(false);
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
//       <View style={styles.container}>
//         <View style={styles.content}>
//           <View style={styles.header}>
//             <View style={styles.networkContainer}>

//               <Text style={styles.whiteText}>Network</Text>
//             </View>
//             <View style={styles.iconContainer}>
//               <TouchableOpacity style={styles.icon}>
//                 <Icons name="notifications-outline" size={28} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.icon}>
//                 <Icons name="chatbubble-outline" size={28} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.searchBarContainer}>
//             {isSearchFocused ? (
//               <TouchableOpacity style={styles.searchIcon} onPress={handleSearchBlur}>
//                 <Icons name="arrow-back" size={24} color="black" />
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity style={styles.searchIcon} onPress={handleSearchFocus}>
//                 <Icons name="search" size={24} color="black" />
//               </TouchableOpacity>
//             )}
//             {isSearchFocused ? (
//               <TextInput
//                 style={styles.searchInputFocused}
//                 placeholder="Search"
//                 placeholderTextColor="#9ea0a3"
//                 autoFocus
//                 onBlur={handleSearchBlur}
//               />
//             ) : (
//               <TouchableOpacity style={styles.searchInput} onPress={handleSearchFocus}>
//                 <Text style={styles.searchPlaceholder}>Search</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//           {/* Rest of the screen content */}
//         </View>
//         <View style={styles.networkview}></View>
//         <View style={[styles.tabBar, { transform: [{ translateY: isSearchFocused ? 0 : 60 }] }]}>
//           <MyTabBar/>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#212120',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 10,
//     backgroundColor: '#212120',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     marginTop:30
//   },
//   networkContainer: {
//     flexDirection: 'row',
//     flex: 4,
//     paddingLeft: 20,
//   },
//   whiteText: {
//     color: 'white',
//     fontSize: 24,
//   },
//   networkview:{
// flex:2
//   },
//   iconContainer: {
//     flex: 1,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   icon: {
//     marginHorizontal: 10,
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4f555e',
//     borderRadius: 4,
//     height: 40,
//     paddingHorizontal: 8,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   searchInputFocused: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   searchPlaceholder: {
//     color: '#9ea0a3',
//   },
// });

// export default NetworkScreen;
