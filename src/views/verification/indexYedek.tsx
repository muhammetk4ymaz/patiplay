import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Theme} from '../../constants/Theme';
import {VerificationIcon} from '../../../assets/icons';
import CustomTextButton from '../../components/shared/CustomTextButton';
import InputErrorText from '../../components/shared/InputErrorText';
import {TouchableNativeFeedback} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import networkService from '../../helpers/networkService';

const VerificationView = () => {
  const navigation = useNavigation();
  /*  const route = useRoute();
  const uuid = route.params.uuid; */
  const inputRefs = Array.from({length: 6}, () => useRef(null));

  const getTimer = 60;
  const [counter, setCounter] = useState(getTimer);
  const [code, setCode] = useState(Array(6).fill(''));
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [invalidInputs, setInvalidInputs] = useState(Array(6).fill(false));
  const [error, setError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState(errorMessage);

  useEffect(() => {
    let intervalId;
    if (counter > 0) {
      intervalId = setInterval(() => {
        setCounter(currentCounter => currentCounter - 1);
      }, 1000);
    } else {
      setIsButtonVisible(false);
      setError(false);
    }

    return () => clearInterval(intervalId); // Bu, component unmount olduğunda interval'i temizler
  }, [counter]);

  const handleTextChange = (text, index) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    const newInvalidInputs = [...invalidInputs];
    newInvalidInputs[index] = text === '';
    setInvalidInputs(newInvalidInputs);

    if (numericText.length === 1 && inputRefs[index + 1]) {
      inputRefs[index + 1].current.focus();
    } else if (numericText.length === 0 && inputRefs[index - 1]) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const newInvalidInputs = code.map(value => value === '');
    setInvalidInputs(newInvalidInputs);

    if (newInvalidInputs.every(isValid => !isValid)) {
      const verificationCode = code.join('');
      // Add your verification logic here

      try {
        const response = await networkService.post('verification/', {
          code: verificationCode,
          uuid: uuid,
        });
        console.log(response.data);

        navigation.navigate('Home');
      } catch (error) {
        setErrorMessage('An error occurred. Please try again later.');
        if (!error.response) {
          setErrorMessage(
            'Network error. Please check your internet connection.',
          );
        } else if (
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          setErrorMessage('Invalid verification code');
        } else if (error.response.status >= 500) {
          setErrorMessage('Server error. Please try again later.');
        }

        setError(true);
      }
    }
  };

  const sendCode = () => {
    // networkService.post(`send-mail/`, {uuid:uuid});
  };

  const handleResend = () => {
    Keyboard.dismiss();
    setCode(new Array(6).fill(''));
    setInvalidInputs(new Array(6).fill(false));
    setCounter(getTimer);
    setIsButtonVisible(true);
    sendCode();
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.view}>
        <View style={styles.card}>
          <View style={styles.authLogo}>
            <VerificationIcon size={100} />
          </View>
          <View style={styles.inputRow}>
            {inputRefs.map((ref, index) => (
              <View
                key={index}
                style={[
                  styles.inputCard,
                  code[index].length > 0 && styles.inputCardValid,
                  invalidInputs[index] && styles.inputCardInvalid,
                ]}>
                <TextInput
                  ref={ref}
                  textAlign="center"
                  maxLength={1}
                  keyboardType="numeric"
                  cursorColor={Theme.colors.white}
                  onChangeText={text => handleTextChange(text, index)}
                  style={styles.input}
                  value={code[index]}
                />
              </View>
            ))}
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            {counter > 0 ? (
              <Text style={{color: Theme.colors.white}}>
                Remaining time to resend code{' '}
                <Text
                  style={{
                    color: Theme.colors.lightGreen,
                  }}>
                  {counter}
                </Text>{' '}
                seconds
              </Text>
            ) : (
              <TouchableOpacity
                onPress={handleResend}
                style={styles.resendButton}>
                <Text
                  style={{
                    color: Theme.colors.white,
                  }}>
                  Resend code
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {error && <InputErrorText errorMessage={errorMessage} />}
          </View>
          {isButtonVisible && (
            <CustomTextButton onPress={handleVerify} text="VERIFY CODE" />
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default VerificationView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
  },
  card: {
    backgroundColor: Theme.colors.sambucus,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    paddingBottom: 30,
    paddingTop: 100,
    gap: 20,
  },
  authLogo: {
    position: 'absolute',
    top: -64,
    alignSelf: 'center',
    backgroundColor: Theme.colors.sambucus,
    borderColor: '#7F838D',
    borderWidth: 2,
    padding: 12,
    borderRadius: 100,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  inputCard: {
    borderRadius: 4,
    backgroundColor: Theme.colors.direWolf,
    borderColor: 'gray',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 12,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.white,
  },
  inputCardInvalid: {
    borderColor: Theme.colors.error,
  },
  inputCardValid: {
    borderColor: Theme.colors.lightGreen,
  },
  resendButton: {
    borderWidth: 1,
    borderColor: Theme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Theme.colors.direWolf,
  },
});
