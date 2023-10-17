import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import database, { firebase } from '@react-native-firebase/database';
import { normalize } from '../../Normalize';
import getinfofromfirebase from '../ProfileScreen/getinfofromfirebase';

export default function FriendsListScreen({ navigation }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchinfo() {
      // Fetch the list of friends from the database
      const userInfo = await GoogleSignin.signInSilently();
      const userId = userInfo.user.id;
      const userRef = database().ref(`users/${userId}`);

      // userRef.on('value', (snapshot) => {
      //   const userData = snapshot.val();
      //   console.log("user data contains after sign is ", userData)
      //   const userFriendsObject = userData.friends || {}; // Ensure it's an object
      //   console.log("user friends object contaisn  ", userFriendsObject);
      //   // Object.values(userFriendsObject).forEach((id) => {
      //   //   console.log("My firends id is ", id)
      //   //   console.log("My firends id type of  is ", typeof (id))
      //   //   const friend_id = id.toString();
      //   //   console.log("My firends id is ", friend_id)
      //   //   console.log("My firends id type of  is ", typeof (friend_id))
      //   //   database()
      //   //     .ref('/users/100885558934401630000')
      //   //     .on('value', snapshot => {
      //   //       console.log('User data: ', snapshot.val());
      //   //     });

      //   // })
      //   for (const friendId of Object.keys(userFriendsObject)) {

      //     // Get a reference to the friend's node in the database
      //     // const friendRef = database().ref(`users/${friendId}`);
      //    const myuserdata = await getinfofromfirebase(friendId) ;
      //    console.log("friends user data contains ", myuserdata);



      //   }


      //   // setFriends();
      // });
console.log("use ref contains ", userRef)
      userRef.once('value')
        .then(async (snapshot) => {
          const userData = snapshot.val();
          console.log("My user data contains ", userData);
          if (userData) {
            // Now you can access the user's data
            const userFriendsObject = userData.friends || {}; // Ensure it's an object
            console.log("my userfriends list contains ", userFriendsObject)

            // Object.keys(userFriendsObject).forEach((friendId) => {
            //   console.log("my id pre friend id is ", friendId)
            //   const IdBigint= BigInt(friendId)
            //   console.log("My big int id is ", IdBigint)
            //   // Get a reference to the friend's node in the database
            //   const friendRef = database().ref(`users/${IdBigint}`);
      
            //   // Fetch the friend's data from the database
            //   friendRef.once('value')
            //     .then((friendSnapshot) => {
            //       const friendData = friendSnapshot.val();
            //       if (friendData) {
            //         // Access the friend's data
            //         const friendAvatar = friendData.profilePicture;
            //         const friendName = friendData.name;
            //         const friendid = friendData.userId;

                  
            //         // and other properties as needed
      
            //         console.log('Friend Avatar:', friendAvatar);
            //         console.log('Friend Name:', friendName);
            //         // and so on...
            //       } else {
            //         console.log('Friend not found.');
            //       }
            //     })
            //     .catch((error) => {
            //       console.error('Error fetching friend data:', error);
            //     });
            // });
         
            try {
              const friendsArray = Object.entries(userData.friends);

    
      const friends = await Promise.all(friendsArray.map(async ([friendId, _]) => {
        const friendRef = database().ref(`users/${BigInt(friendId)}`);
        const friendSnapshot = await friendRef.once('value');
        return friendSnapshot.val();
              }));
              setFriends(friends);
            } catch (error) {
              console.error('Error fetching friends data:', error);
            }
          
         
          } else {
            console.log('User not found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
      return () => {
        userRef.off('value');
      };
    }

    fetchinfo();
  }, []);

  const navigateToChat = (selectedFriend) => {
    // Navigate to the chat screen, passing the selected friend's details
    navigation.navigate('MessageScreen', { selectedFriend });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => navigateToChat(item)}
    >
      <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container,StatusBar.currentHeight]}>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: normalize(StatusBar.currentHeight)
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  
  },
  friendName: {
    fontSize: 16,
    color: 'black',
  

  },
});
