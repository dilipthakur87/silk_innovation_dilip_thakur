import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { setToken, getToken } from '../../utils/LocalStorage'
import { validate_email_phone, validate_pin } from '../../utils/validator'
import { doLogin } from '../../services/loginService'
import FullScreenLoader from '../../components/FullScreenLoader';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('nitish.atom@gmail.com');
  const [userPassword, setUserPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken()
        if(token) {
          navigation.replace("Dashboard")
        } else {
          // pass
        }
      } catch(err) {
        // pass
      }
    })()
  }, [])

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail || !userPassword) {
      alert('All the fields are required');
      return;
    } else {
      const emailValidator = validate_email_phone(userEmail)
      const pinPassValidator = validate_pin(userPassword)
      if(emailValidator[0] && pinPassValidator[0]) {
        if(emailValidator[1].includes("email") && pinPassValidator[1].includes("pin")) {
          // user has entered email and pin
          login({
            email: userEmail,
            pin: userPassword,
            desktop_fcm: "no_fcm"
          })
        } else {
          login({
            [emailValidator[1]]: userEmail,
            [pinPassValidator[1]]: userPassword,
            fcm_token: "no_fcm"
          })
        }
      } else {
        if(!emailValidator[0]) {
          alert(`Invalid ${emailValidator[1]}`)
          return;
        } else {
          alert(`Invalid ${pinPassValidator[1]}`)
          return;
        }
      }
    }

  };

  const login = (logindata) => {
    setLoading(true);

    doLogin(logindata).then((res) => {
      setLoading(false);
      // set Token to local storage
      if(res?.access_token) {
        setToken(res.access_token)
        navigation.replace('Dashboard')
      }
    }).catch((err) => {
      setLoading(false);
      if(err?.message) {
        setErrortext(err?.response?.data?.message || "Internal Error")
      } else {
        setErrortext(err)
      }
    })
  }

  return (
    <View style={styles.mainBody}>
      <FullScreenLoader isFetching={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userEmail}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email or Mobile Number" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userPassword}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password or Pin" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});