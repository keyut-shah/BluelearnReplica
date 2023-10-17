

import React, { useEffect, useState, useRef, createContext, useContext } from 'react'
import { View, Text, TouchableOpacity, Button, SafeAreaView, StatusBar, Image, Alert, Linking } from 'react-native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import { cos } from 'react-native-reanimated';
import Toast from 'react-native-simple-toast';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { normalize } from '../../Normalize';
import { CommonActions } from '@react-navigation/native';
import { AuthProvider, AuthContext } from '../AuthContext';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import getinfofromfirebase from './getinfofromfirebase';
import Loader from '../navigation/Loader';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker'
import database from '@react-native-firebase/database';

function ProfileScreen({ navigation }) {
  const [userinfo, setuserinfo] = useState();
  const [greyPartHeight, setGreyPartHeight] = useState(0);

  const handleGreyPartLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setGreyPartHeight(height);
  };
  const refthreedots = useRef();
  const refaboutme = useRef();
  const refsociallink = useRef();
  const refproofofwork = useRef();
  const refprofileinfo = useRef();

  const [IsAboutMe, setIsAboutMe] = useState(true);
  const [isLocationVisible, setisLocationVisible] = useState(false);
  const [isEducationVisible, setisEducationVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isopenprofileinfo, setopenprofileinfo] = useState(null);
  const [fullName, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [headline, setHeadline] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [abouteme, setAboutMe] = useState('');
  const [my_location, setMyLocation] = useState('');
  const [my_college, setMycollege] = useState('')
  const [selectedYear, setSelectedYear] = useState(null);
  const [my_insta_link, setMyinsta] = useState('');
  const [linkVisible, setLinkVisible] = useState(false);
  const [my_twitter, setMytwitter] = useState('');
  const [linkVisible2, setLinkVisible2] = useState(false);
  const [my_facebook, setMyfacebook] = useState('');
  const [linkVisible3, setLinkVisible3] = useState(false);
  const [my_linkedin, setMylinkedin] = useState('');
  const [linkVisible4, setLinkVisible4] = useState(false);
  const [projecturl, setprojecturl] = useState('');
  const [visbleproofofworklink, setvisbleproofofworklink] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // const { setUser } = useContext(AuthContext);

  // useEffect(async()=>{
  //   console.log( "my token is ", await GoogleSignin.getTokens())
  // },[])
  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };
  const closeBottomSheet = async () => {
    // setBottomSheetVisible(false);
    // setIsAboutMe(true);
    if (my_location != '' || my_location != undefined) {
      try {
        await database().ref(`users/${userinfo.userId}`).update({
          location: my_location

        }).then(
          setisLocationVisible(false),
          setisEducationVisible(true),
          Toast.show("Updated Successfully", Toast.SHORT),

          // ()=>console.log('Data updated ')
        )
      }
      catch (error) {
        console.log("something went wrong", error)
        return (
          () => Alert.alert("Somethin went wrong ")
        )
      }
    }
    else {
      setisLocationVisible(false);
      setisEducationVisible(true);
      Toast.show("Updated Successfully", Toast.SHORT);
    }

  };
  const closeaboutsheet = () => {
    setisEducationVisible(false);
    // setIsAboutMe(true);
    refaboutme.current.close()
  }
  const handleNextButton = async () => {
    console.log("about me is ", abouteme);
    if (abouteme != '' || abouteme != undefined) {
      try {
        await database().ref(`users/${userinfo.userId}`).update({
          aboutme: abouteme

        }).then(
          setIsAboutMe(false),
          setisLocationVisible(true),
          Toast.show("Updated Successfully", Toast.SHORT),

          // ()=>console.log('Data updated ')
        )
      }
      catch (error) {
        console.log("something went wrong", error)
        return (
          () => Alert.alert("Somethin went wrong ")
        )
      }
    }
    else {
      setIsAboutMe(false);
      setisLocationVisible(true);
      Toast.show("Updated Successfully", Toast.SHORT);
    }


    // setIsAboutMe(false);
    // setisLocationVisible(true);
    console.log("does toast of successfully save about me data done ")


  };
  const handlelocationbackbutton = () => {
    setisLocationVisible(false);
    setIsAboutMe(true);
  }
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  const handleeducationbackbutton = () => {
    setisLocationVisible(true);
    setisEducationVisible(false);
  }
  const doneaboutmebottomsheet = async () => {
    console.log("my college is ", my_college + " passout year is ", selectedYear)
    try {
      await database().ref(`users/${userinfo.userId}`).update({
        'education/college': my_college,
        'education/passout_year': selectedYear,


      }).then(
        refaboutme.current.close(),
        Toast.show("Data Saved Successfully", Toast.SHORT),

      )
    }
    catch (error) {
      console.log("something went wrong", error)
      return (
        () => Alert.alert("Something went wrong ")
      )
    }

  }

  const donesocaillinksbottomsheet = async () => {
    try {
      await database().ref(`users/${userinfo.userId}`).update({
        'sociallinks/instagram': my_insta_link,
        'sociallinks/facebook': my_facebook,
        'sociallinks/linkedin': my_linkedin,
        'sociallinks/twitter': my_twitter,
      })
      console.log("my twitter ", my_linkedin)
      if (my_insta_link != '' && my_insta_link != undefined) {
        console.log("does my instalink version change ")
        setLinkVisible(true);
      }
      else {
        setLinkVisible(false);
      }
      if (my_twitter != '' && my_twitter != undefined) {
        console.log("does my twitter version change ")
        setLinkVisible2(true);
      }
      else {
        setLinkVisible2(false);
      }
      if (my_facebook != '' && my_facebook != undefined) {
        console.log("does my facebook version change ")
        setLinkVisible3(true);
      }
      else {
        setLinkVisible2(false);
      }
      if (my_linkedin != '' && my_linkedin != undefined) {
        console.log("does my linkedin version change ")
        setLinkVisible4(true);
      }
      else {
        setLinkVisible4(false);
      }
    }
    catch (error) {
      console.log("eror happening while adding data of social links to firebase ", error)
    }
    refsociallink.current.close();
    Toast.show("Data Saved Successfully", Toast.SHORT);

  }
  const handleprofilebottomsheet = () => {

  }

  const doneproofofwork = async () => {
    try {
      await database().ref(`users/${userinfo.userId}`).update({
        'prrof_of_work/link': projecturl,
        'prrof_of_work/pdf': selectedDocument,

      })
    }
    catch (error) {
      Alert.alert("Somethin went wrong ")
      console.log("error handling while proof of work ", error)
    }
  }
  const years = Array.from({ length: 28 }, (_, index) => 2001 + index);
  const [selectedTab, setSelectedTab] = useState('link');

  const handleproofofworklink = () => {
    Linking.openURL(link).catch((error) => console.error('Error opening link:', error));
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const renderContent = () => {
    if (selectedTab === 'link') {
      return (
        <View style={{ flex: 1, }}>
          <View style={{
            flex: 1,
            margin: normalize(15),
            padding: normalize(10),


          }}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(17)
              }}
            >
              Project URL
            </Text>

            <TextInput
              style={[styles.inputField, { marginTop: normalize(10) }]}
              value={projecturl}
              onChangeText={setprojecturl}
            />



          </View>

          <TouchableOpacity
            onPress={() => { handleTabChange('attachment') }}
            style={{ position: 'relative', marginTop: normalize(20) }}
          >
            <View style={{
              backgroundColor: '#516af6', alignItems: 'center',
              paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
              marginVertical: moderateScale(10), borderRadius: moderateScale(20)
            }}>
              <Text style={{ color: 'white' }}>Next :Add attachment </Text>
            </View>

          </TouchableOpacity>

        </View>

      );
    } else if (selectedTab === 'attachment') {
      return (
        <>
          <View style={{
            flex: 1,
            margin: normalize(15),
            padding: normalize(10)
          }}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(17)
              }}
            >
              Proof of work attachment
            </Text>

            <View>
              <TouchableOpacity
                onPress={pickDocument}
                style={{ position: 'relative', marginTop: normalize(20) }}
              >
                <View style={{
                  backgroundColor: '#516af6', alignItems: 'center',
                  paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                  marginVertical: moderateScale(10), borderRadius: moderateScale(20)
                }}>
                  <Text style={{ color: 'white' }}>Upload </Text>
                </View>

              </TouchableOpacity>

            </View>

            {/* {
            visbleproofofworklink==true ? 
            <TouchableOpacity onPress={handleproofofworklink} >
            <Text style={{
              padding: normalize(10),
              fontSize: normalize(14),
              color: 'white'
            }}>Visit</Text>
          </TouchableOpacity>:
          <View></View>
          } */}


          </View>
          <View style={{ marginTop: normalize(200) }}>
            <TouchableOpacity
              onPress={doneproofofwork}
              style={{ position: 'relative', marginTop: normalize(20) }}
            >
              <View style={{
                backgroundColor: '#516af6', alignItems: 'center',
                paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                marginVertical: moderateScale(10), borderRadius: moderateScale(20)
              }}>
                <Text style={{ color: 'white' }}>Save </Text>
              </View>

            </TouchableOpacity>

          </View>

        </>

      );
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      console.log("my response after picking the image ", response);

      if (response.assets && response.assets.length > 0 && !response.didCancel && !response.errorCode) {
        const selectedImage = response.assets[0];
        setImageSource(selectedImage.uri);
        setSelectedImage(selectedImage);
      }
    });
  };

  const handleFullNameChange = (text) => {
    setFullName(text);
  };

  const handleHeadlineChange = (text) => {
    setHeadline(text);
  };
  const handleUsernameChange = (text) => {
    setUserName(text); ``
  }

  const handleupdateprofile = async () => {
    console.log("does handle update profile call or not ")
    console.log("my suerinfo contains ", userinfo.userId)
    setImageSource(imageSource)
    uploadImage(imageSource);
    try {
      await database().ref(`users/${userinfo.userId}`).update({
        name: fullName,
        headline: headline,
        uniquename: username,
        profilePicture: imageSource,

      }).then(
        refprofileinfo.current.close()
        // ()=>console.log('Data updated ')
      )
    }
    catch (error) {
      console.log("something went wrong", error)
      return (
        () => Alert.alert("Somethin went wrong ")
      )
    }
  }
  const uploadImage = async (uri) => {
    console.log("my uri is ", uri)
    const imageName = `image${parseInt(Math.random() * 100000)}`;
    const reference = storage().ref(`images/${imageName}`);

    try {
      await reference.putFile(uri);
      const downloadURL = await reference.getDownloadURL();
      console.log('Image uploaded successfully. Download URL:', downloadURL);
      setImageSource(downloadURL);
    } catch (error) {
      Alert.alert("Something went wrong")
      console.log('Error uploading image:', error);
    }
  };
  const handlelogout = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log("is sign in", isSignedIn)

    try {

      await GoogleSignin.signOut();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }],
        })
      );
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle any errors that occur during the sign-out process
      () => { Alert.alert("Something went wrong ") }
    }
  }

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({

        allowMultiSelection: false,
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory'
        // You can specify the type of documents you want to allow, e.g., DocumentPicker.types.pdf, DocumentPicker.types.images, etc.
      });
      console.log("result getting after picking document ", result[0].uri)
      uploaddocument(result[0])
      // setSelectedDocument(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the document picker.');
      } else {
        console.log('Error selecting the document:', err);
      }
    }
  };
  const uploaddocument = async (uri) => {
    console.log("my uri is ", uri)
    const documentName = `${uri.name}${Math.random() * 100}`;
    const reference = storage().ref(`document/${documentName}`);

    try {
      await reference.putFile(uri?.fileCopyUri);
      const downloadURL = await reference.getDownloadURL();
      console.log('Image uploaded successfully. Download URL:', downloadURL);
      setSelectedDocument(downloadURL);
    } catch (error) {
      Alert.alert("Something went wrong")
      console.log('Error uploading image:', error);
    }

  }
  useEffect(() => {
    // const currentUser = await GoogleSignin.getCurrentUser();
    // console.log("my current user id is ", currentUser.user.id)
    // const user = await getinfofromfirebase(currentUser.user.id)
    // console.log("My user contains in the profile screen ", user )
    // setuserinfo(user)


    const fetchUserInfo = async () => {
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        setLoading(true)
        console.log("my current user id is ", currentUser.user.id);

        const user = await getinfofromfirebase(currentUser.user.id);
        console.log("My user contains in the profile screen ", user);

        setuserinfo(user);

        setUserName(user?.uniquename)
        setFullName(user?.name)
        setLoading(false)
        setImageSource(user?.profilePicture)
        setHeadline(user?.headline)
        setMycollege(user?.education?.college)
        setSelectedYear(user?.education?.passout_year)
        setAboutMe(user?.abouteme)
        setMyLocation(user?.location)
        setMyinsta(user?.sociallinks?.instagram)
        setMytwitter(user?.sociallinks?.twitter)
        setMylinkedin(user?.sociallinks?.linkeidn)
        setMyfacebook(user?.sociallinks?.facebook)

        if (user?.sociallinks?.instagram != "" && user?.sociallinks?.instagram != null && user?.sociallinks?.instagram != undefined) {
          console.log("does set method call for instagram")
          setLinkVisible(true)
        }
        if (user?.sociallinks?.twitter != "" && user?.sociallinks?.twitter != null && user?.sociallinks?.twitter != undefined) {
          console.log("does set method call for twitter")

          setLinkVisible2(true)
        }
        if (user?.sociallinks?.facebook != "" && user?.sociallinks?.facebook != null && user?.sociallinks?.facebook != undefined) {
          console.log("does set method call for facebook ->", user?.sociallinks?.facebook)

          setLinkVisible3(true)
        }
        if (user?.sociallinks?.linkedin != "" && user?.sociallinks?.linkedin != null && user?.sociallinks?.linkedin != undefined) {
          console.log("does set method call for linkedin ->", user?.sociallinks?.linkedin)

          setLinkVisible4(true)
        }



      } catch (error) {
        console.error('Error fetching user info:', error);
        setLoading(false)

      }
    };

    fetchUserInfo();
  }, [])

  const handleinsta = () => {
    if (my_insta_link) {
      const prefixedLink = addPrefixToInstagramLink(my_insta_link);
      Linking.openURL(prefixedLink).catch(err => {
        console.log('Error opening Instagram link:', err);
      });
    } else {
      // Handle empty link (optional)
      Alert.alert("Please try again . Something went wrong")
      console.log('Empty Instagram link.');
    }
  }
  const addPrefixToInstagramLink = (link) => {
    // Check if the link already contains the prefix
    if (!link.startsWith('https://www.instagram.com/')) {
      return `https://www.instagram.com/${link}`;
    }
    return link;
  };

  const handletwiiter = () => {
    if (my_insta_link) {
      const prefixedLink = addPrefixToXLink(my_insta_link);
      Linking.openURL(prefixedLink).catch(err => {
        console.log('Error opening Twitter link:', err);
      });
    } else {
      // Handle empty link (optional)
      Alert.alert("Please try again . Something went wrong")
      console.log('Empty Twitter link.');
    }
  }
  const addPrefixToXLink = (link) => {
    // Check if the link already contains the prefix
    if (!link.startsWith('https://www.twitter.com/')) {
      return `https://www.twitter.com/${link}`;
    }
    return link;
  };
  const handlelinkedin = () => {

    try {
      const prefixedLink = addPrefixToLinkedinLink(my_linkedin);
      Linking.openURL(prefixedLink).catch(err => {
        console.log('Error opening Linkedin link:', err);
      });
    }
    catch (error) {
      // Handle empty link (optional)
      Alert.alert("Please try again . Something went wrong")
      console.log('Empty Linkedin link.', error);
    }
  }
  const addPrefixToLinkedinLink = (link) => {
    // Check if the link already contains the prefix
    if (!link.startsWith('https://www.linkedin.com/in/')) {
      return `https://www.linkedin.com/in/${link}`;
    }
    return link;
  };
  const handlefacebook = () => {
    if (my_facebook) {
      const prefixedLink = addPrefixTofacebookLink(my_facebook);
      Linking.openURL(prefixedLink).catch(err => {
        console.log('Error opening Facebook link:', err);
      });
    } else {
      // Handle empty link (optional)
      Alert.alert("Please try again . Something went wrong")
      console.log('Empty Facebook link.');
    }
  }
  const addPrefixTofacebookLink = (link) => {
    // Check if the link already contains the prefix
    if (!link.startsWith('https://www.facebook.com/')) {
      return `https://www.facebook.com/${link}`;
    }
    return link;
  };



  useEffect(() => {
    console.log("My insta visible is useeffect ", linkVisible)
    console.log("My twitter visible is useeffect", linkVisible2)
    console.log("My facebook visible is useeffect ", linkVisible3)
    console.log("My linkedin visible is  useeffect", linkVisible4)
  }, [linkVisible, linkVisible2])

  if (isloading == false)
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
        >

          <View style={{ marginTop: StatusBar.currentHeight, backgroundColor: '#212120', borderBottomRightRadius: moderateScale(20), borderBottomLeftRadius: moderateScale(20) }}>
            <View style={{ flexDirection: 'row', paddingVertical: moderateScale(5), paddingLeft: moderateScale(5) }}>
              <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center', paddingLeft: moderateScale(5) }}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                  <Icons
                    name="arrow-back"
                    size={moderateScale(25)}
                    color="white" />
                </TouchableWithoutFeedback>
                <Text style={{ color: 'white', fontSize: moderateScale(20) }}> {username}

                </Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback
                  onPress={() => { refthreedots.current.open() }}
                >
                  <MaterialIcons
                    name="dots-vertical"
                    size={moderateScale(25)}
                    color="white"
                  />
                  <RBSheet
                    ref={refthreedots}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                      container: styles.bottomSheetContainer,
                      wrapper: styles.bottomSheetWrapper,
                      draggableIcon: styles.bottomSheetDraggableIcon,
                    }}
                  >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 1, width: '100%', borderBottomColor: '#dcdcdc', borderBottomWidth: 2 }}>
                        <Text style={{ color: 'black', textAlign: 'center', marginTop: '5%', marginBottom: '5%', height: normalize(100) }}>Give us feedback</Text>
                      </View>
                      <View style={{ flex: 1, width: '100%', borderBottomColor: '#dcdcdc', borderBottomWidth: 2 }}>
                        <Text style={{ color: 'black', textAlign: 'center', marginTop: '5%', marginBottom: '5%', height: normalize(100) }}>Deactivate Account</Text>
                      </View>
                      <View style={{ flex: 1, width: '100%' }}>
                        <TouchableOpacity onPress={handlelogout}>
                          <Text style={{ color: 'black', textAlign: 'center', marginTop: '5%', marginBottom: '5%', height: normalize(1000) }}>Logout</Text>
                        </ TouchableOpacity>
                      </View>
                    </View>


                    {/* <View style={{ flex: 1, alignItems: 'center' }}>

                    <View style={{flex:1,}}>
                      <Text style={{color:'black'}}>Give us feedback </Text>
                    </View>
                    <View style={{flex:1}}>
                      <Text style={{color:'black'}}>Deactivate Account </Text>
                    </View>
                    <View style={{flex:1}}>
                      <Text style={{color:'black'}}>Logout </Text>
                    </View>
                  </View> */}
                  </RBSheet>
                </TouchableWithoutFeedback>
              </View>
            </View>


            <View style={{ marginTop: moderateScale(20) }}>
              <View style={{ position: 'relative', }}>
                {/* Grey Part */}
                <View
                  style={{
                    backgroundColor: 'grey',
                    marginHorizontal: moderateScale(20),
                    marginTop: moderateScale(30),
                    marginBottom: moderateScale(20),
                    borderRadius: moderateScale(10),

                    minHeight: greyPartHeight || moderateScale(90), // Use minHeight to dynamically adjust the height
                  }}
                  onLayout={handleGreyPartLayout}
                >
                  <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 9 }}></View>
                    <View style={{ position: 'relative', flex: 1, paddingTop: moderateScale(5), }}>
                      <TouchableWithoutFeedback onPress={() => { refprofileinfo.current.open() }}>
                        <EvilIcons name="pencil" size={moderateScale(25)} color="white" />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  <View style={{ paddingLeft: moderateScale(5), marginTop: moderateScale(15) }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      style={{ fontSize: moderateScale(17), width: '75%', color: 'white' }}>
                      {fullName}
                    </Text>
                  </View>
                </View>
                {/* profile info bottom sheet  */}
                <RBSheet
                  ref={refprofileinfo}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  customStyles={{
                    container: styles.profile_bottomSheetContainer,
                    wrapper: styles.bottomSheetWrapper,
                    draggableIcon: styles.bottomSheetDraggableIcon,
                  }}
                >

                  <ScrollView >
                    <View style={styles.bottomSheetContainer}>

                      {/* <Text style={styles.pickerText}>Image Picker</Text> */}
                      <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
                        <TouchableOpacity onPress={handleImagePicker}>

                          <View style={{
                            width: moderateScale(70), height: moderateScale(70),
                            borderRadius: moderateScale(35), backgroundColor: 'grey', zIndex: 1, overflow: 'hidden'
                          }}>
                            {/* Add your image component here */}
                            {imageSource != null &&
                              <Image
                                source={{
                                  uri: imageSource
                                }} // Replace with the actual path to your image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover" // Adjust the resizeMode property as needed
                              />
                            }
                          </View>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.labelText}>Full Name</Text>
                      <TextInput
                        style={styles.inputField}
                        value={fullName}
                        onChangeText={handleFullNameChange}
                      />

                      <Text style={styles.labelText}>Headline</Text>
                      <TextInput
                        textAlignVertical='top'
                        style={styles.headline_inputField}
                        value={headline}
                        onChangeText={handleHeadlineChange}
                      />

                      <Text style={styles.labelText}>Username</Text>
                      <TextInput
                        style={styles.inputField}
                        value={username}
                        onChangeText={handleUsernameChange}
                      />
                    </View>
                  </ScrollView>

                  <TouchableOpacity
                    onPress={handleupdateprofile}
                    style={{
                      backgroundColor: '#516af6', alignItems: 'center',
                      paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                      marginVertical: moderateScale(10), borderRadius: moderateScale(20),
                    }}>
                    <Text style={{ color: 'white' }}>Done</Text>
                  </TouchableOpacity>

                </RBSheet>
                {/* Circle Image Viewer */}
                <View style={{
                  position: 'absolute', top: moderateScale(0), left: moderateScale(30), width: moderateScale(70), height: moderateScale(70),
                  borderRadius: moderateScale(35), backgroundColor: 'white', zIndex: 1, overflow: 'hidden'
                }}>
                  {imageSource != null &&
                    <Image
                      source={{ uri: imageSource }}
                      // Replace with the actual path to your image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover" // Adjust the resizeMode property as needed
                    />
                  }
                </View>
              </View>
            </View>


            {/* about me bottom sheet  */}
          </View>
          <View style={{ flexDirection: 'row', marginVertical: moderateScale(20), paddingLeft: moderateScale(15), }}>
            <View style={{ flex: 8 }}>
              <Text style={{ color: 'black', fontSize: moderateScale(17) }}>About Me</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={() => {


                setIsAboutMe(true);
                setisLocationVisible(false);
                setisEducationVisible(false);
                refaboutme.current.open()


              }}>
                <EvilIcons name="pencil" size={moderateScale(26)} color="black" />
                <RBSheet
                  ref={refaboutme}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  customStyles={{
                    container: styles.aboutme_bottomSheetContainer,
                    wrapper: styles.bottomSheetWrapper,
                    draggableIcon: styles.bottomSheetDraggableIcon,
                  }}
                >

                  <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', height: '1%', justifyContent: 'space-around', marginHorizontal: moderateScale(10) }}>
                      <View style={{ flex: 1, height: '100%', backgroundColor: '#706f6f', borderRadius: moderateScale(10) }} />
                      <View style={{ flex: 1, height: '100%', backgroundColor: (isLocationVisible || isEducationVisible) ? '#706f6f' : '#dcdcdc', marginHorizontal: moderateScale(10), borderRadius: moderateScale(10) }} />
                      <View style={{ flex: 1, height: '100%', backgroundColor: isEducationVisible ? '#706f6f' : '#dcdcdc', borderRadius: moderateScale(10) }} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 8 }}>

                      </View>
                      <TouchableWithoutFeedback onPress={() => {
                        console.log("does on close method call  ");
                        refaboutme.current.close()
                      }}
                        style={{ flex: 1 }}
                      >
                        <View style={{ flex: 1, marginVertical: moderateScale(15) }}>
                          <Text style={{ color: 'black', fontSize: moderateScale(15) }}>X</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    {IsAboutMe && (
                      <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, paddingTop: moderateScale(50) }}>
                          <View style={{ flexDirection: 'row', paddingHorizontal: moderateScale(10) }}>
                            <View style={{ flex: 3 }}>
                              <Text style={{ color: 'black', fontSize: moderateScale(17), fontWeight: '500' }}>About  me</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={{ color: '#b5b3b3' }}></Text>
                            </View>
                          </View>
                          <View style={{ marginVertical: moderateScale(10) }}>
                            <Text style={{ color: '#b5b3b3', paddingHorizontal: moderateScale(10) }}>
                              Talk about your interests,goals, achievements or anything else
                            </Text>
                          </View>
                          <View style={{ borderWidth: 1, marginVertical: moderateScale(10), borderColor: '#b5b3b3', marginHorizontal: moderateScale(10), paddingVertical: moderateScale(20) }}>
                            <TextInput
                              style={{ color: 'black' }}
                              multiline={true}
                              numberOfLines={3}
                              ellipsizeMode='tail'
                              value={abouteme}
                              onChangeText={(text) => { setAboutMe(text) }}
                            />
                          </View>


                        </View>


                        <TouchableOpacity
                          onPress={handleNextButton}

                        >
                          <View style={{
                            backgroundColor: '#516af6', alignItems: 'center',
                            paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                            marginVertical: moderateScale(20), borderRadius: moderateScale(20)
                          }}>
                            <Text style={{ color: 'white' }}>Save & next: Location</Text>
                          </View>

                        </TouchableOpacity>

                      </View>
                    )}

                    {isLocationVisible && (
                      <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, paddingTop: moderateScale(50) }}>
                          <View style={{ flexDirection: 'row', paddingHorizontal: moderateScale(10) }}>
                            <View style={{ flex: 1 }}>
                              <Text style={{ color: 'black', fontSize: moderateScale(20), fontWeight: '500' }}>Location</Text>
                            </View>

                          </View>
                          <View style={{ flexDirection: 'row', paddingHorizontal: moderateScale(10), marginVertical: moderateScale(10), }}>
                            <View style={{ flex: 1, }}>
                              <Text style={{ color: 'black', fontSize: moderateScale(13), fontWeight: '500' }}>Where do you live ?</Text>
                            </View>
                            {/* <View style={{ marginEnd: moderateScale(5) }}>
                            <Text style={{ color: '#516af6', fontSize: moderateScale(12), fontWeight: '500' }}>Skip Location</Text>
                          </View> */}

                          </View>

                          {/* <View style={{ marginHorizontal: moderateScale(20), backgroundColor: 'white', borderRadius: moderateScale(25), flexDirection: 'row' ,borderColor:'green',borderWidth:2}}>
                          <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: moderateScale(7) }}>
                            <Icons name="search" size={20} color="grey" />
                          </View>
                          <TouchableWithoutFeedback >
                            <View style={{ flex: 1,borderWidth:1,borderColor:'yellow'

                             }}>
                              <TextInput

                                placeholder='Search members '
                                placeholderTextColor="white"
                                style={{ paddingVertical: moderateScale(4), paddingLeft: moderateScale(7), }}
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        </View> */}

                          <View

                            style={{ marginHorizontal: moderateScale(20), backgroundColor: 'white', borderRadius: moderateScale(25), flexDirection: 'row', borderColor: 'grey', borderWidth: 1, }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: moderateScale(7) }}>
                              <Icons name="search" size={20} color="grey" />
                            </View>
                            <TouchableOpacity onPress={() =>
                              textInputRef.focus()}
                              style={{ flex: 1, borderTopRightRadius: moderateScale(18), borderBottomEndRadius: moderateScale(18) }}>
                              <TextInput
                                ref={ref => { textInputRef = ref }}
                                style={{ paddingVertical: moderateScale(4), paddingLeft: moderateScale(7), color: 'black' }}
                                value={my_location}
                                onChangeText={(text) => { setMyLocation(text) }}
                              />
                            </TouchableOpacity >

                          </View>

                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={closeBottomSheet}

                          >
                            <View style={{
                              backgroundColor: '#516af6', alignItems: 'center',
                              paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                              marginVertical: moderateScale(10), borderRadius: moderateScale(20)
                            }}>
                              <Text style={{ color: 'white' }}>Save & next: Education</Text>
                            </View>

                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={handlelocationbackbutton}

                          >
                            <View style={{
                              backgroundColor: 'white', alignItems: 'center',
                              paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                              marginBottom: moderateScale(10), borderRadius: moderateScale(20),
                              borderWidth: moderateScale(0.5)
                            }}>
                              <Text style={{ color: '#516af6' }}>Back</Text>
                            </View>

                          </TouchableOpacity>
                        </View>
                      </View>

                    )}

                    {
                      isEducationVisible && (
                        <View style={{ flex: 1 }}>
                          <View style={{ flex: 1, paddingTop: moderateScale(50) }}>
                            <View style={{ paddingHorizontal: moderateScale(10), marginBottom: moderateScale(15) }}>
                              <Text style={{ color: 'black', fontSize: moderateScale(17), fontWeight: '500' }}>Education</Text>
                            </View>
                            <View style={{ paddingHorizontal: moderateScale(10), marginVertical: moderateScale(10) }}>
                              <Text style={{ color: 'black', fontSize: moderateScale(14), fontWeight: '400' }}>Studied in </Text>
                            </View>
                            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                              <TextInput
                                style={{ borderWidth: 0.5, borderColor: 'gray', padding: 10, borderRadius: moderateScale(10), color: 'black' }}
                                value={my_college}
                                onChangeText={(text) => { setMycollege(text) }}
                              />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <View style={{ marginHorizontal: moderateScale(15), marginVertical: moderateScale(10), flex: 1 }}>
                                <Text style={{ color: 'black', fontSize: moderateScale(14) }}>Year of graduation </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Picker
                                  selectedValue={selectedYear}
                                  onValueChange={handleYearChange}
                                  style={{ color: 'black' }}
                                  dropdownIconColor={"black"}
                                >
                                  {/* Render the list of available years */}
                                  {years.map((year) => (
                                    <Picker.Item key={year} label={year.toString()} value={year} />
                                  ))}
                                </Picker>
                              </View>
                            </View>
                          </View>
                          <View>
                            <TouchableOpacity
                              onPress={doneaboutmebottomsheet}

                            >
                              <View style={{
                                backgroundColor: '#516af6', alignItems: 'center',
                                paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                                marginVertical: moderateScale(10), borderRadius: moderateScale(20)
                              }}>
                                <Text style={{ color: 'white' }}>Done </Text>
                              </View>

                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={handleeducationbackbutton}

                            >
                              <View style={{
                                backgroundColor: 'white', alignItems: 'center',
                                paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                                marginBottom: moderateScale(10), borderRadius: moderateScale(20),
                                borderWidth: moderateScale(0.5)
                              }}>
                                <Text style={{ color: '#516af6' }}>Back</Text>
                              </View>

                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    }

                  </View>
                </RBSheet>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {/* End of about me  */}

          {/* location data in main screen  */}
          {(my_location != null && my_location != "") &&
            <View style={{ paddingLeft: moderateScale(10), flexDirection: 'row', }}>
              <Icons
                name="location-outline"
                size={moderateScale(25)}
                color="black" />
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ color: "black", }}>{my_location}</Text>
              </View>
            </View>
          }
          {/* End of the location  */}
          <View style={{ height: moderateScale(120), flex: 1, backgroundColor: '#d7e4fc', marginHorizontal: moderateScale(15), marginVertical: moderateScale(20), padding: normalize(15) }}>
            {(abouteme != null && abouteme != '') ?
              <Text

                ellipsizeMode='tail'
                style={{
                  color: 'black', fontSize: normalize(15),

                }}>{abouteme}</Text> :
              <Text style={{ color: 'black', fontSize: normalize(15), }}>Write Something About Yourself in the About Me Section </Text>


            }
          </View>


          {/* <View style={{ height: moderateScale(60), flex: 1, backgroundColor: '#d5d7db', marginHorizontal: moderateScale(15), marginVertical: moderateScale(40) }}>

        </View> */}

          <View style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 8, paddingLeft: moderateScale(15) }}>
                <Text style={{ fontSize: moderateScale(18), fontWeight: '500', color: 'black' }}>Skills</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <EvilIcons name="pencil" size={moderateScale(27)} color="black" />
              </View>

            </View>
          </View>
          <View style={{ height: moderateScale(70), flex: 1, backgroundColor: '#d7e4fc', marginHorizontal: moderateScale(15), marginVertical: moderateScale(10) }}>
          </View>
          <View style={{ height: moderateScale(70), flex: 1, backgroundColor: '#aeebb9', marginHorizontal: moderateScale(15), marginVertical: moderateScale(10) }}>
          </View>
          <View style={{ height: moderateScale(70), flex: 1, backgroundColor: '#f5f781', marginHorizontal: moderateScale(15), marginVertical: moderateScale(10) }}>
          </View>
          <View style={{ height: moderateScale(70), flex: 1, backgroundColor: '#e0b4ed', marginHorizontal: moderateScale(15), marginVertical: moderateScale(10) }}>
          </View>


          {/* Proof of work */}
          <View style={{ flexDirection: 'row', padding: moderateScale(16) }}>
            <View style={{ flex: 8 }}>
              <Text style={{ color: 'black', fontSize: moderateScale(18), fontWeight: '500' }}>Proof Of Work</Text>
            </View>


            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => {


                refproofofwork.current.open();


              }}>
                <EvilIcons name="pencil" size={moderateScale(28)} color="black" />
                <RBSheet
                  ref={refproofofwork}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  customStyles={{
                    container: styles.proofofwork_bottomSheetContainer,
                    wrapper: styles.bottomSheetWrapper,
                    draggableIcon: styles.bottomSheetDraggableIcon,
                  }}
                >
                  <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}></View>
                      <TouchableOpacity onPress={() => { refproofofwork.current.close() }}>
                        <View style={{ marginRight: moderateScale(25) }}>
                          <Text style={{ color: "black", fontSize: moderateScale(15) }}>X</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: moderateScale(10) }}>
                      <Text style={{ color: 'black', fontSize: moderateScale(20), fontWeight: '600' }}>Add your proof of work </Text>
                    </View>
                    <View style={{ marginHorizontal: moderateScale(10), marginVertical: moderateScale(12) }}>
                      <Text style={{ color: 'grey', fontSize: moderateScale(13), fontWeight: '400' }}>Your proof of work can be github links, or individual projects</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, flex: 1 }}>
                      {/* Tab bar */}
                      <View style={{}}>
                        <View style={{ flexDirection: 'row', paddingVertical: moderateScale(10), borderWidth: 1, marginHorizontal: moderateScale(35), borderRadius: moderateScale(20), backgroundColor: '#516af6' }}>
                          <TouchableOpacity onPress={() => handleTabChange('link')} style={{ flex: 1, alignItems: 'center', }}>
                            <View
                              style={{
                                backgroundColor: selectedTab === 'link' ? 'white' : '#516af6',
                                borderRadius: 16,
                                paddingHorizontal: moderateScale(14),
                                paddingVertical: moderateScale(12),
                              }}
                            >
                              <Text style={{ color: selectedTab === 'link' ? 'black' : 'white' }}>Add Link</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleTabChange('attachment')}
                            style={{ flex: 1, alignItems: 'center' }}
                          >
                            <View
                              style={{
                                backgroundColor: selectedTab === 'attachment' ? 'white' : '#516af6',
                                borderRadius: 16,
                                paddingHorizontal: moderateScale(14),
                                paddingVertical: moderateScale(12),
                              }}
                            >
                              <Text style={{ color: selectedTab === 'attachment' ? 'black' : 'white' }}>Add Attachment</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Content based on selected tab */}
                      {renderContent()}
                    </View>
                  </ScrollView>
                </RBSheet>
              </TouchableWithoutFeedback>
            </View>



          </View>
          {
            visbleproofofworklink == true ?
              <View style={{ height: moderateScale(120), flex: 1, backgroundColor: '#d7e4fc', marginHorizontal: moderateScale(15), marginVertical: moderateScale(20) }}>
                <TouchableOpacity onPress={handleproofofworklink}
                  style={{ margin: normalize(20), backgroundColor: '#516af6', alignItems: 'center' }}
                >
                  <Text style={{
                    padding: normalize(10),
                    fontSize: normalize(14),
                    color: 'white'
                  }}>Visit Project</Text>
                </TouchableOpacity>
              </View> :
              <View></View>
              
          }



          {/* Socail links  */}
          <View style={{ backgroundColor: '#f2f2f2', paddingTop: moderateScale(25), }}>
            <View style={{ flexDirection: 'row', paddingLeft: moderateScale(15) }}>
              <View style={{ flex: 8, }}>
                <Text style={{ fontSize: moderateScale(18), fontWeight: 'bold', color: 'black', }}>Social Links</Text>
              </View>

              <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                onPress={() => { refsociallink.current.open() }}
              >
                <EvilIcons name="pencil" size={moderateScale(27)} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: moderateScale(5), fontSize: moderateScale(15), paddingLeft: moderateScale(15) }}>
              <Text style={{ color: 'black' }}>So people can know you better </Text>
            </View>
            <View style={{ backgroundColor: 'white', marginHorizontal: moderateScale(15), borderRadius: 15, marginVertical: moderateScale(10), paddingHorizontal: moderateScale(20), paddingVertical: moderateScale(10), paddingBottom: moderateScale(10) }}>
              {/* instagram link */}

              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: moderateScale(10) }}>
                <View >
                  <Image source={require('../../assets/logos/instagram.png')}
                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  />
                </View>
                {(linkVisible == false) ?
                  (
                    <>

                      <TouchableOpacity
                        onPress={() => { refsociallink.current.open() }}
                        style={{
                          backgroundColor: '#f2f2f2', flex: 1, marginLeft: moderateScale(15), paddingVertical: moderateScale(10), paddingLeft: moderateScale(10), borderRadius: moderateScale(5)
                        }}>
                        <View

                        >
                          <Text style={{ fontSize: moderateScale(13), fontWeight: '300', color: '#5a5c5a' }}>Add Your instagram username</Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  ) :
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#516af6', marginHorizontal: normalize(20) }}>
                    <TouchableOpacity onPress={handleinsta} >
                      <Text style={{
                        padding: normalize(10),
                        fontSize: normalize(14),
                        color: 'white'
                      }}>Visit</Text>
                    </TouchableOpacity>
                  </View>

                }
              </View>

              {/* twitter link  */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: moderateScale(10) }}>
                <View >

                  <Image source={require('../../assets/logos/twitter.png')}
                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  />
                </View>
                {(linkVisible2) ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#516af6', marginHorizontal: normalize(20) }}>
                    <TouchableOpacity onPress={handletwiiter} >
                      <Text style={{
                        padding: normalize(10),
                        fontSize: normalize(14),
                        color: 'white'
                      }}>Visit</Text>
                    </TouchableOpacity>
                  </View>

                  :
                  <TouchableOpacity onPress={() => { refsociallink.current.open() }}
                    style={{ backgroundColor: '#f2f2f2', flex: 1, marginLeft: moderateScale(15), paddingVertical: moderateScale(10), paddingLeft: moderateScale(10), borderRadius: moderateScale(5) }}>
                    <View

                    >
                      <Text style={{ fontSize: moderateScale(13), fontWeight: '300', color: '#5a5c5a' }}>Add Your twitter username</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>
              {/*linkedin  */}

              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: moderateScale(10) }}>
                <View style={{}} >
                  <Image source={require('../../assets/logos/linkedin.png')}
                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  />
                </View>
                {(linkVisible4 == true) ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#516af6', marginHorizontal: normalize(20) }}>
                    <TouchableOpacity onPress={handlelinkedin} >
                      <Text style={{
                        padding: normalize(10),
                        fontSize: normalize(14),
                        color: 'white'
                      }}>Visit</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <TouchableOpacity onPress={() => { refsociallink.current.open() }}
                    style={{ backgroundColor: '#f2f2f2', flex: 1, marginLeft: moderateScale(15), paddingVertical: moderateScale(10), paddingLeft: moderateScale(10), borderRadius: moderateScale(5) }}>
                    <View

                    >
                      <Text style={{ fontSize: moderateScale(13), fontWeight: '300', color: '#5a5c5a' }}>Add Your linkedin username</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>

              {/* facebook link */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: moderateScale(10) }}>
                <View style={{}}>

                  <Image source={require('../../assets/logos/Facebook_Logo.png')}
                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  />
                </View>
                {(linkVisible3 == true) ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#516af6', marginHorizontal: normalize(20) }}>
                    <TouchableOpacity onPress={handlefacebook} >
                      <Text style={{
                        padding: normalize(10),
                        fontSize: normalize(14),
                        color: 'white'
                      }}>Visit</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <TouchableOpacity onPress={() => { refsociallink.current.open() }}
                    style={{ backgroundColor: '#f2f2f2', flex: 1, marginLeft: moderateScale(15), paddingVertical: moderateScale(10), paddingLeft: moderateScale(10), borderRadius: moderateScale(5) }}>
                    <View

                    >
                      <Text style={{ fontSize: moderateScale(13), fontWeight: '300', color: '#5a5c5a' }}>Add Your facebook username</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>
            </View>
            {/* <View style={{ flexDirection: 'row', padding: moderateScale(16) }}>
            <View style={{ flex: 8 }}>
              <Text style={{ color: 'black', fontSize: moderateScale(15), fontWeight: '500' }}>Ice breakers</Text>
            </View>


            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => {


                reficebreakers.current.open();


              }}>
                <EvilIcons name="pencil" size={moderateScale(25)} color="black" />
                <RBSheet
                  ref={reficebreakers}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  customStyles={{
                    container: styles.icebreakers_bottomSheetContainer,
                    wrapper: styles.bottomSheetWrapper,
                    draggableIcon: styles.bottomSheetDraggableIcon,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}></View>
                      <TouchableOpacity onPress={() => { reficebreakers.current.close() }}>
                        <View style={{ marginRight: moderateScale(25) }}>
                          <Text style={{ color: "black", fontSize: moderateScale(15) }}>X</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{marginHorizontal:moderateScale(10)}}>
                      <Text style={{color:'black',fontSize:moderateScale(17),fontWeight:'600'}}> Icebreakers</Text>
                    </View>
                    <View style={{marginHorizontal:moderateScale(10),marginVertical:moderateScale(10)}}>
                      <Text style={{color:'grey',fontSize:moderateScale(13),fontWeight:'400'}}> So people can get to know you better</Text>
                    </View>

                  </View>
                </RBSheet>
              </TouchableWithoutFeedback>
            </View>

          </View> */}
            {/* <View style={{ height: 100, }}>
            <View style={{ backgroundColor: 'white', flex: 5 }}>

            </View>
            <View style={{ flex: 1 }}>

            </View>
          </View> */}

            <RBSheet
              ref={refsociallink}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                container: styles.social_bottomSheetContainer,
                wrapper: styles.bottomSheetWrapper,
                draggableIcon: styles.bottomSheetDraggableIcon,
              }}
            >
              <View style={{ flex: 1 }}>
                <ScrollView
                  keyboardShouldPersistTaps={'always'}
                  style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity onPress={() => { refsociallink.current.close() }}>
                      <View style={{ marginRight: moderateScale(25) }}>
                        <Text style={{ color: "black", fontSize: moderateScale(15) }}>X</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginHorizontal: moderateScale(15), marginVertical: moderateScale(10) }}>
                    <Text style={{ fontSize: moderateScale(18), fontWeight: '600', color: 'black' }}>My Links</Text>
                  </View>
                  <View style={{ marginHorizontal: moderateScale(15) }}>
                    <Text style={{ fontSize: moderateScale(13), fontWeight: '400', color: 'grey' }}>So people can get to know you better.</Text>
                  </View>
                  <View style={{ marginHorizontal: moderateScale(15), marginVertical: moderateScale(20) }}>
                    <Text style={{ fontSize: moderateScale(16), fontWeight: '600', color: 'black' }}>Add username</Text>
                  </View>
                  {/* insta inside bottom sheet */}

                  <View style={styles.instagram_container}>
                    <Image
                      source={require('../../assets/logos/instagram.png')}
                      style={styles.logo}
                    />


                    <View style={styles.borderView}>
                      <Text style={styles.atSymbol}>@</Text>

                      <TextInput
                        style={styles.input}
                        placeholder="E.g: keyut_shah_1"
                        placeholderTextColor="black"
                        value={my_insta_link}
                        onChangeText={(text) => { setMyinsta(text) }}
                      />
                    </View>



                  </View>
                  <View style={styles.instagram_container}>
                    <Image
                      source={require('../../assets/logos/twitter.png')}
                      style={styles.logo}
                    />
                    <View style={styles.borderView}>
                      <Text style={styles.atSymbol}>@</Text>

                      <TextInput
                        style={styles.input}
                        placeholder="E.g: KeyutS"
                        placeholderTextColor="black"
                        value={my_twitter}
                        onChangeText={(text) => { setMytwitter(text) }}
                      />
                    </View>
                  </View>


                  <View style={{ marginHorizontal: moderateScale(15), marginVertical: moderateScale(20) }}>
                    <Text style={{ fontSize: moderateScale(16), fontWeight: '600', color: 'black' }}>Add profile link</Text>
                  </View>

                  <View style={styles.instagram_container}>
                    <Image
                      source={require('../../assets/logos/Facebook_Logo.png')}
                      style={styles.logo}
                    />
                    <View style={styles.borderView}>


                      <TextInput
                        style={styles.input}
                        placeholder=""
                        value={my_facebook}
                        onChangeText={(text) => { setMyfacebook(text) }}
                      />
                    </View>
                  </View>
                  <View style={styles.instagram_container}>
                    <Image
                      source={require('../../assets/logos/linkedin.png')}
                      style={styles.logo}
                    />
                    <View style={styles.borderView}>


                      <TextInput
                        style={styles.input}
                        placeholder=""
                        value={my_linkedin}
                        onChangeText={(text) => { setMylinkedin(text) }}
                      />
                    </View>
                  </View>


                </ScrollView>
                <TouchableOpacity
                  onPress={donesocaillinksbottomsheet}

                >
                  <View style={{
                    backgroundColor: '#516af6', alignItems: 'center',
                    paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10),
                    marginVertical: moderateScale(10), borderRadius: moderateScale(20)
                  }}>
                    <Text style={{ color: 'white' }}>Done </Text>
                  </View>

                </TouchableOpacity>
              </View>

            </RBSheet>
          </View>
          <View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ marginVertical: moderateScale(10) }}>
                <Text style={{ color: 'black' }}> Created By Keyut Shah </Text>
              </View>
              <View style={{ marginBottom: moderateScale(10) }}>
                <Text style={{ color: 'black' }}>Contact Us: keyutshah1@gmail.com </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

    );
  else {
    return <Loader visible={true} />;
  }
}

const styles = {
  box: {
    width: moderateScale(100),
    height: moderateScale(120),
    backgroundColor: 'white',
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScale(10)
  },
  bottomSheetContainer: {
    height: '30%',
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
    width: '15%',
    backgroundColor: '#dcdcdc',
  },
  aboutme_bottomSheetContainer: {
    height: '95%',
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
  social_bottomSheetContainer: {
    height: '95%',
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
  proofofwork_bottomSheetContainer: {
    height: '95%',
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
  year_container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  year_box: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearText: {
    color: 'white',
    fontSize: 18,
  },
  instagram_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(20),
    marginHorizontal: moderateScale(20)

  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  borderView: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  atSymbol: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(5),
    color: 'black'
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: 'black'
  },
  profile_bottomSheetContainer: {
    height: '95%',
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
  bottomSheetContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  labelText: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    marginBottom: moderateScale(8),
    color: 'black'
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    color: 'black'
  },
  headline_inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    height: moderateScale(100),
    color: 'black'
  },
  saveButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  pickerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Added alignItems property
    marginBottom: 16,
  },
  circularImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Adjust the value to make it a perfect circle
    overflow: 'hidden',
  },
  selectedImage: {
    flex: 1,
    width: 60,
    height: 200,
  },
};
export default ProfileScreen;
