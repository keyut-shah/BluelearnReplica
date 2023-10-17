import React from 'react';
import { View, Text, StatusBar, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/Ionicons'

const NotificationScreen = ({ navigation }) => {
  console.log("does post screen working ")

  const handleBackPress = () => {
    navigation.goBack();
  };

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
            Notifications
          </Text>
        </View>


        <View style={{ marginTop: moderateScale(20), backgroundColor: 'white', flex: 1, borderTopLeftRadius: moderateScale(30), borderTopRightRadius: moderateScale(30) }}>

          <Text style={{
            marginTop: moderateScale(25),
            color: 'black',
            fontSize: moderateScale(17),
            fontWeight: '700',
            textAlign: 'center'
          }}>You have no new notification </Text>

          <View style={{ marginTop: moderateScale(22), alignItems: 'center' }}>
            <TouchableWithoutFeedback
              onPress={handleBackPress}

            >

              <View style={{
                backgroundColor: '#516af6', paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(15),
                borderRadius: moderateScale(20),
                justifyContent: 'center', alignItems: 'center'
              }}>

                <Text style={{
                  color: 'white',
                  fontSize: moderateScale(14),
                  fontWeight: '600'
                }}>Go back </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationScreen;
