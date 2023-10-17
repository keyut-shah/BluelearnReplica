// import React from 'react';
// import {View,Text} from 'react-native';

// export default PostSearchScreen=({navigate})=>{
//     return(
//         <View style={{flex:1}}>
//             <Text style={{color:'black'}}>Hell testisng search screen </Text>
//         </View>
//     )
// }
import React from 'react';
import { View, Text,StatusBar, Button } from 'react-native';

const PostSearchScreen = ({ navigation }) => {
  console.log("does post screen working ")
  return (
    <View style={{ flex: 1,marginTop:StatusBar.currentHeight}}>
      <Text style={{ color: 'black' }}>Hello testing search screen</Text>
      <Button 
      title='Go back'
      onPress={()=>navigation.goBack()}
      
      />
    </View>
  );
};

export default PostSearchScreen;
