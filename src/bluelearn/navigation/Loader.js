import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';


const Loader = ({ visible }) => {
    console.log("is my loader visible ", visible)
    return (
      <Modal visible={visible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#516af6" />
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    modalContent: {
     
    },
  });
  
  export default Loader;
  