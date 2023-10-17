import database from '@react-native-firebase/database';


const getinfofromfirebase = async (userId) => {
  console.log("my user id contains ", userId)

    try {
        const userRef = database().ref(`users/${userId}`);
    
        const userSnapshot = await userRef.once('value');
        console.log("user snapshot value in the getinfo firebase ", userSnapshot)
        if (userSnapshot.exists()) {
          const userInfo = userSnapshot.val();
          
          return userInfo;
        } else {
          // User data not found
          return null;
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
      }
};
export default getinfofromfirebase;