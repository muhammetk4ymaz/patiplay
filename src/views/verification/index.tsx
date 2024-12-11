import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Theme} from '../../utils/theme';
import {VerificationIcon} from '../../../assets/icons';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';

import {useNavigation} from '@react-navigation/native';
import networkService from '../../helpers/networkService';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import InputErrorText from '../../components/shared/Texts/InputErrorText';

const VerificationView = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const uuid = route.params.uuid;

  const dispatch = useAppDispatch();

  const inputRefs = Array.from({length: 6}, () => useRef(null));

  const getTimer = 60;
  const [counter, setCounter] = useState(getTimer);
  const [code, setCode] = useState(Array(6).fill(''));
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [invalidInputs, setInvalidInputs] = useState(Array(6).fill(false));
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputEnabledList, setInputEnabledList] = useState([
    'false',
    'false',
    'false',
    'false',
    'false',
    'false',
  ]);

  // Add state for focused input index
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [counter]);

  const handleTextChange = (text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = numericText;
    setCode(newCode);

    const newInvalidInputs = [...invalidInputs];
    newInvalidInputs[index] = numericText === '';
    setInvalidInputs(newInvalidInputs);

    if (numericText.length === 1 && inputRefs[index + 1]) {
      const newEditableInputList = [...inputEnabledList];
      newEditableInputList[index + 1] = true;
      setInputEnabledList(newEditableInputList);
      setTimeout(() => {
        inputRefs[index + 1].current.focus();
      }, 1);
    } else if (numericText.length === 0 && inputRefs[index - 1]) {
      const newEditableInputList = [...inputEnabledList];
      newEditableInputList[index] = false;
      setInputEnabledList(newEditableInputList);
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const newInvalidInputs = code.map(value => value === '');
    setInvalidInputs(newInvalidInputs);

    if (newInvalidInputs.every(isValid => !isValid)) {
      const verificationCode = code.join('');
      // Add your verification logic here
      console.log('Verification code:', verificationCode);
      /*  try {
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
      } */
    }
  };

  const sendCode = () => {
    // networkService.post(`send-mail/`, {uuid: uuid});
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
                focusedIndex === index && styles.inputCardFocused,
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
                onFocus={() => setFocusedIndex(index)} // Set focused index
                onBlur={() => setFocusedIndex(null)} // Reset focused index
                onPress={() => {
                  const empty = '';
                  const newCode = [...code];
                  for (let i = index; i < newCode.length; i++) {
                    newCode[i] = empty;
                  }
                  setCode(newCode);

                  setInvalidInputs(new Array(6).fill(false));

                  const newEditableInputList = [...inputEnabledList];
                  for (
                    let i = index + 1;
                    i < newEditableInputList.length;
                    i++
                  ) {
                    newEditableInputList[i] = false;
                  }

                  setInputEnabledList(newEditableInputList);
                }}
                style={styles.input}
                value={code[index]}
                editable={inputEnabledList[index]}
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
    borderRadius: 72,
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
  inputCardFocused: {
    borderColor: Theme.colors.primary, // Focused input border color
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
