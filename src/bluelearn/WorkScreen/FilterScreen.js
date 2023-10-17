import React from 'react';
import {View,Text} from 'react-native';


function FilterScreen({ navigation }) {
    return (
      // Your filter screen JSX code here
      <View style={{flex:1}}>
      <View style={{flexDirection:'row',flex:6}}>
              <View style={{flex:2,backgroundColor:'red'}}></View>
              <View style={{flex:3}}></View>
      </View>
      <View style={{flex:1,backgroundColor:'green'}}></View>
      </View>
    );
  }
  export default FilterScreen