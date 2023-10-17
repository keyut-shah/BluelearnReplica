import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StatusBar, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'
import { moderateScale } from 'react-native-size-matters';
import database from '@react-native-firebase/database';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { GoogleSignin } from '@react-native-google-signin/google-signin';



export default MessageScreen = ({route, navigation }) => {
    const { selectedFriend} = route.params;

    function generateChatReference(userId1, userId2) {
        const sortedIds = [userId1, userId2].sort(); // Sort the user IDs
        return `${sortedIds[0]}_${sortedIds[1]}`;
    }
 
    const [curr_user, setcurruser] = useState(true)


    const [messages, setMessages] = useState([]);
    const [userid, setuserid] = useState();
    useEffect(async () => {
        
        const userInfo = await GoogleSignin.signInSilently();
        console.log('user info is ', userInfo)
        const userId = userInfo.user.id;
        setuserid(userId);
        console.log("userId is ==>", userId)
        const chatRef = database()
            .ref('/chatroom/user1user2')

        chatRef.on('value', (snapshot) => {
            // Convert the received data to an array of messages for GiftedChat
            const data = snapshot.val();
            const messagesArray = Object.values(data).map((message) => ({
                _id: message._id,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
            }));
            messagesArray.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

          
            setMessages(messagesArray);
        })
        return () => chatRef.off('value');

    }, [])
  


    const onSend = useCallback((messages = []) => {
        const msg = messages[0];
        var now = new Date().getTime();

        const myMsg = {
            ...msg,
            sendby: userid,
            sendto: 100885558934401627112,
            createdAt: now
        }
        console.log("My current messages is ", messages[0])
        database()
            .ref('/chatroom/user1user2/')
            .push(myMsg)
            .then(() => console.log('Data set.'));

        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        )
        console.log("My message contains ", myMsg)
    }, [])

    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <View style={{ flex: 1, backgroundColor: '#212120' }}>
                <View style={{ flexDirection: 'row', marginTop: moderateScale(10), paddingLeft: moderateScale(10), alignItems: 'center', }}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <Icons
                            name="arrow-back"
                            size={moderateScale(25)}
                            color="white" />
                    </TouchableWithoutFeedback>
                    <Text style={{ marginLeft: moderateScale(10), color: 'white', fontSize: moderateScale(20), fontWeight: '500', }}>
                        Message Screen
                    </Text>
                </View>


                <View style={{ marginTop: moderateScale(20), backgroundColor: 'white', flex: 1, borderTopLeftRadius: moderateScale(30), borderTopRightRadius: moderateScale(30) }}>

                    <View style={{ backgroundColor: 'white', flex: 1 }}>

                        <View style={{ flex: 2 }}>

                            <GiftedChat
                                messages={messages}
                                onSend={messages => onSend(messages)}
                                user={{
                                    _id: userid,
                                    name: 'Keyut',
                                    avatar: 'https://fastly.picsum.photos/id/585/200/200.jpg?hmac=xPWUtHiddZixyCUwkNykuZcN4myA3sY2ewf9zFRc7oM',
                                }}
                                renderBubble={props => {
                                    return (
                                        <Bubble{...props}
                                            wrapperStyle={{
                                                right: {
                                                    backgroundColor: '#516af6'
                                                },
                                            }}
                                        />
                                    );
                                }
                                }
                            />

                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}


