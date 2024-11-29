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
import React, {useEffect, useState} from 'react';
import {Theme} from '../../constants/Theme';
import {AuthIcon, VerificationIcon} from '../../../assets/icons';
import CustomText from '../../components/shared/CustomText';
import CustomTextButton from '../../components/shared/CustomTextButton';
import {
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setInputEnabledList} from '../../redux/features/verification/verificationSlice';
import InputErrorText from '../../components/shared/InputErrorText';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';

type Props = {};

const PreVerificationView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const route = useRoute();
  // const uuid = route.params.uuid;

  const {inputEnabledList} = useAppSelector(state => state.verification);
  const dispatch = useAppDispatch();

  const inputRefs = Array.from({length: 6}, () => React.useRef(null));

  const getTimer = 10;
  const [counter, setCounter] = useState(getTimer);
  const [code, setCode] = useState(Array(6).fill(''));
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [invalidInputs, setInvalidInputs] = useState(Array(6).fill(false));
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      dispatch(setInputEnabledList(newEditableInputList));
      setTimeout(() => {
        inputRefs[index + 1].current.focus();
      }, 1);
    } else if (numericText.length === 0 && inputRefs[index - 1]) {
      const newEditableInputList = [...inputEnabledList];
      newEditableInputList[index] = false;
      dispatch(setInputEnabledList(newEditableInputList));
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

      navigation.dispatch(StackActions.replace('AlmostHere'));
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

                    dispatch(setInputEnabledList(newEditableInputList));
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
