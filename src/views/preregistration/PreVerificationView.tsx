import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {VerificationIcon} from '../../../assets/icons';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import InputErrorText from '../../components/shared/Texts/InputErrorText';
import networkService from '../../helpers/networkService';
import {RootStackParamList} from '../../navigation/routes';
import {Theme} from '../../utils/theme';

type Props = {};

type RouteParams = {
  PreVerification: {
    uuid: string;
  };
};

const PreVerificationView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const route = useRoute<RouteProp<RouteParams, 'PreVerification'>>();

  const [inputEnabledList, setInputEnabledList] = React.useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const inputRefs = Array.from({length: 6}, () => React.useRef(null));

  const getTimer = 60;
  const [counter, setCounter] = useState(getTimer);
  const [code, setCode] = useState(Array(6).fill(''));
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [invalidInputs, setInvalidInputs] = useState(Array(6).fill(false));
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  let numericText = '';

  // Add state for focused input index
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
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
    numericText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = numericText;
    setCode(newCode);

    const newInvalidInputs = [false, false, false, false, false, false];
    setInvalidInputs(newInvalidInputs);
    // const newInvalidInputs = [...invalidInputs];
    // newInvalidInputs[index] = numericText === '';
    // setInvalidInputs(newInvalidInputs);

    if (numericText.length === 1 && inputRefs[index + 1]) {
      const newEditableInputList = [...inputEnabledList];
      newEditableInputList[index + 1] = true;
      setInputEnabledList(newEditableInputList);
      setTimeout(() => {
        inputRefs[index + 1].current.focus();
      }, 1);
    }
  };

  const handleVerify = async () => {
    const newInvalidInputs = code.map(value => value === '');
    setInvalidInputs(newInvalidInputs);

    if (newInvalidInputs.every(isValid => !isValid)) {
      const verificationCode = code.join('');
      // Add your verification logic here
      console.log('Verification code:', verificationCode);

      try {
        setLoading(true);
        const response = await networkService.post('api/user/verification/', {
          code: verificationCode,
          uuid: route.params.uuid,
        });
        console.log(response.data);

        navigation.dispatch(StackActions.replace('AlmostHere'));
      } catch (error) {
        setErrorMessage('An error occurred. Please try again later.');
        if (axios.isAxiosError(error)) {
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
        }

        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const sendCode = () => {
    networkService.post(`api/user/send-mail/`, {uuid: route.params.uuid});
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
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard icon={<VerificationIcon size={100} />}>
        <View style={{gap: 24}}>
          <CustomText
            text="We've just sent a 6-digit code to your email. Please check your inbox and enter the code to join the party!"
            style={{
              color: 'white',
              opacity: 0.5,
            }}
          />
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
                  onKeyPress={({nativeEvent}) => {
                    if (code[index] === '' && inputRefs[index - 1]) {
                      if (nativeEvent.key === 'Backspace') {
                        inputRefs[index - 1].current.focus();
                        setCode(prev => {
                          const newCode = [...prev];
                          newCode[index - 1] = '';
                          return newCode;
                        });
                        // setInvalidInputs(prev => {
                        //   const newInvalidInputs = [...prev];
                        //   newInvalidInputs[index - 1] = true;
                        //   return newInvalidInputs;
                        // });
                      }
                    }
                  }}
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
          {error && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {<InputErrorText errorMessage={errorMessage} />}
            </View>
          )}
          {isButtonVisible && (
            <View
              style={{
                alignSelf: 'center',
              }}>
              <CustomTextButton
                onPress={handleVerify}
                text="VERIFY"
                paddingHorizontal={32}
              />
            </View>
          )}
        </View>
      </ContentWithIconCard>
    </ScrollView>
  );
};

export default PreVerificationView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
    paddingVertical: 100,
  },
  informationText: {
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
    opacity: 0.5,
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
    paddingHorizontal: Platform.select({ios: 0, android: 12}),
    width: Platform.OS === 'ios' ? 40 : 'auto',
    height: Platform.OS === 'ios' ? 40 : 'auto',

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
