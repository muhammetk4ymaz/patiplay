import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard, {
  TermAndPrivacyText,
} from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import CustomTextInput from '../../components/shared/Inputs/CustomTextInput';
import {ImageManager} from '../../constants/ImageManager';
import {Theme} from '../../utils/theme';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';

type Props = {};

const PaymentView = (props: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.view,
        {paddingTop: insets.top + 50, paddingBottom: insets.bottom},
      ]}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        style={{flex: 1, justifyContent: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ContentWithIconCard
          button={
            <View style={{backgroundColor: 'black'}}>
              <CustomTextButton
                text={'Subscribe'}
                onPress={() => {
                  navigation.dispatch(StackActions.replace('WelcomePati'));
                }}
                textColor="white"
                paddingHorizontal={36}
                backgroundColor="transparent"
                border={true}
              />
            </View>
          }
          icon={
            <Image
              source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
              style={{height: 80, width: 80}}
            />
          }>
          <View style={{gap: 24, paddingBottom: 24}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText
                text="Payment"
                style={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  flex: 1,
                }}
              />
              <View style={{position: 'absolute', right: 0}}>
                <CustomText
                  text="3/3"
                  style={{
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                    opacity: 0.7,
                  }}
                />
              </View>
            </View>

            <View style={{gap: 12}}>
              <CardNameInput
                onChangeText={text => {
                  console.log(text);
                }}
              />
              <CardNumberInput
                onChangeText={text => {
                  console.log(text);
                }}
              />
              <View style={{flexDirection: 'row', gap: 8}}>
                <View style={{flex: 1}}>
                  <CardExpiryDateMonthInput
                    onChangeText={text => {
                      console.log(text);
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <CardExpiryDateYearInput
                    onChangeText={text => {
                      console.log(text);
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <CardCvvInput
                    onChangeText={text => {
                      console.log(text);
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomText
                  text="By clicking ‘Subscribe’, you agree to our "
                  style={{color: 'white', opacity: 0.7}}
                />
                <CustomText
                  text="Terms"
                  weight="bold"
                  style={{
                    color: 'white',
                    opacity: 0.7,
                    textDecorationLine: 'underline',
                  }}
                />
                <CustomText
                  text=" and acknowledge our "
                  style={{color: 'white', opacity: 0.7}}
                />
                <CustomText
                  text="Privacy"
                  weight="bold"
                  style={{
                    color: 'white',
                    opacity: 0.7,
                    textDecorationLine: 'underline',
                  }}
                />
                <CustomText text="." style={{color: 'white', opacity: 0.7}} />
              </View>
            </View>
          </View>
        </ContentWithIconCard>
        <View style={{marginTop: 28, alignSelf: 'center'}}>
          <CustomTextButton
            text={'Previous'}
            backgroundColor="transparent"
            onPress={() => {}}
            textColor="rgba(255,255,255,0.7)"
            paddingHorizontal={36}
          />
        </View>
      </KeyboardAvoidingView>
      <TermAndPrivacyText />
    </ScrollView>
  );
};

export default PaymentView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
  },
});

type CardNameInputProps = {
  onChangeText: (text: string) => void;
};

const CardNameInput = (props: CardNameInputProps) => {
  const [cardName, setCardName] = React.useState('');
  return (
    <CustomTextInput
      onChangeText={text => {
        setCardName(text);
        props.onChangeText(text);
      }}
      placeholder="Name on Card"
      value={cardName}
    />
  );
};

type CardNumberInputProps = {
  onChangeText: (text: string) => void;
};

const CardNumberInput = (props: CardNumberInputProps) => {
  const [cardNumber, setCardNumber] = React.useState('');
  return (
    <CustomTextInput
      onChangeText={text => {
        let value = text.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(value);
      }}
      placeholder="Card Number"
      value={cardNumber}
      keyboardType="numeric"
      maxLength={19}
    />
  );
};

type CardExpiryDateMonthInputProps = {
  onChangeText: (text: string) => void;
};

const CardExpiryDateMonthInput = (props: CardExpiryDateMonthInputProps) => {
  const [cardNumber, setCardNumber] = React.useState('');
  return (
    <CustomTextInput
      onChangeText={text => {
        let value = text.replace(/\D/g, '');
        setCardNumber(value);
      }}
      placeholder="MM"
      value={cardNumber}
      keyboardType="numeric"
      maxLength={2}
    />
  );
};

type CardExpiryDateYearInputProps = {
  onChangeText: (text: string) => void;
};

const CardExpiryDateYearInput = (props: CardExpiryDateYearInputProps) => {
  const [cardNumber, setCardNumber] = React.useState('');
  return (
    <CustomTextInput
      onChangeText={text => {
        let value = text.replace(/\D/g, '');
        setCardNumber(value);
      }}
      placeholder="YY"
      value={cardNumber}
      keyboardType="numeric"
      maxLength={2}
    />
  );
};

type CardCvvInputProps = {
  onChangeText: (text: string) => void;
};

const CardCvvInput = (props: CardCvvInputProps) => {
  const [cardNumber, setCardNumber] = React.useState('');
  return (
    <CustomTextInput
      onChangeText={text => {
        let value = text.replace(/\D/g, '');
        setCardNumber(value);
      }}
      placeholder="CVV"
      value={cardNumber}
      keyboardType="numeric"
      maxLength={3}
    />
  );
};
