import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RestaurantService, StaticImageService} from '../services';
import {Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, Fonts, Images} from '../constants';
import {Display} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {AuthenticationService} from '../services';
import AnimatedLottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';

const inputStyle = state => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.SECONDARY_GREEN,
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

const showMarker = state => {
  switch (state) {
    case 'valid':
      return (
        <AntDesign
          name="checkcircleo"
          color={Colors.SECONDARY_GREEN}
          size={18}
          style={{marginLeft: 5}}
        />
      );
    case 'invalid':
      return (
        <AntDesign
          name="closecircleo"
          color={Colors.DEFAULT_RED}
          size={18}
          style={{marginLeft: 5}}
        />
      );
    default:
      return null;
  }
};

const RestaurantAddScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [typeErrorMessage, setTypeErrorMessage] = useState('');
  const [tagsErrorMessage, setTagsErrorMessage] = useState('');
  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [emailState, setEmailState] = useState('default');
  const [usernameState, setUsernameState] = useState('default');
  const [imageButton1, setImageButton1] = useState(null);
  const [imageButton2, setImageButton2] = useState(null);
  const [imageButton3, setImageButton3] = useState(null);

  const register = () => {
    let user = {
      username,
      email,
      password,
    };
    setIsLoading(true);
    AuthenticationService.register(user).then(response => {
      setIsLoading(false);
      console.log(response);
      if (!response?.status) {
        setErrorMessage(response?.message);
      }
    });
  };

  const selectImage = buttonNumber => {
    ImagePicker.showImagePicker({title: 'Select Image'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        switch (buttonNumber) {
          case 1:
            setImageButton1(selectedImage);
            break;
          case 2:
            setImageButton2(selectedImage);
            break;
          case 3:
            setImageButton3(selectedImage);
            break;
          default:
            break;
        }
      }
    });
  };
  const checkUserExist = async (type, value) => {
    console.log('In user Exist');
    if (value?.length > 0) {
      // AuthenticationService.checkUserExist(type, value).then(response => {
      //   if (response?.status) {
      //     type === 'email' && emailErrorMessage
      //       ? setEmailErrorMessage('')
      //       : null;
      //     type === 'username' && usernameErrorMessage
      //       ? setUsernameErrorMessage('')
      //       : null;
      //     type === 'email' ? setEmailState('valid') : null;
      //     type === 'username' ? setUsernameState('valid') : null;
      //   } else {
      //     type === 'email' ? setEmailErrorMessage(response?.message) : null;
      //     type === 'username'
      //       ? setUsernameErrorMessage(response?.message)
      //       : null;
      //     type === 'email' ? setEmailState('invalid') : null;
      //     type === 'username' ? setUsernameState('invalid') : null;
      //   }
      // });
    } else {
      type === 'id' ? setIdErrorMessage('invalid') : null;
      type === 'name' ? setNameErrorMessage('invalid') : null;
      type === 'type' ? setTypeErrorMessage('invalid') : null;
      type === 'tags' ? setTagsErrorMessage('invalid') : null;
      type === 'location' ? setLocationErrorMessage('invalid') : null;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Add Restaurant Details</Text>
      </View>
      <View style={inputStyle(usernameState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Id"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
            onEndEditing={({nativeEvent: {text}}) => checkUserExist('id', text)}
          />
          {showMarker(usernameState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{idErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('name', text)
            }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{idErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Mobile No"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('name', text)
            }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{nameErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Type"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('type', text)
            }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{typeErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Tags"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('tags', text)
            }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{tagsErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Location"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('location', text)
            }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{locationErrorMessage}</Text>
      <View>
        <Button
          title="Pick/Capture Image For Logo"
          onPress={() => selectImage(1)}
        />
        {imageButton1 && (
          <Image
            source={{uri: imageButton1.uri}}
            style={{width: 100, height: 100}}
          />
        )}

        <Button
          title="Pick/Capture Image For Poster"
          onPress={() => selectImage(2)}
        />
        {imageButton2 && (
          <Image
            source={{uri: imageButton2.uri}}
            style={{width: 100, height: 100}}
          />
        )}

        <Button
          title="Pick/Capture Image For Cover"
          onPress={() => selectImage(3)}
        />
        {imageButton3 && (
          <Image
            source={{uri: imageButton3.uri}}
            style={{width: 100, height: 100}}
          />
        )}
      </View>
      <TouchableOpacity style={styles.signinButton} onPress={() => register()}>
        {isLoading ? (
          <AnimatedLottieView source={Images.LOADING} autoPlay />
        ) : (
          <Text style={styles.signinButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: Colors.FABEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialSigninButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  signinButtonLogoContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginVertical: 3,
  },
});
