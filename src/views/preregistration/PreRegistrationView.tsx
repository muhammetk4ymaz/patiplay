import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {Theme} from '../../constants/Theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/shared/CustomText';
import CustomTextButton from '../../components/shared/CustomTextButton';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SocialButton from '../../components/shared/SocialButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';

type Props = {
  title: string;
};

const PreRegistrationView = (props: Props) => {
  const headerHeight = useHeaderHeight();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingTop: headerHeight,
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        justifyContent: 'space-around',
      }}>
      <LinearGradient
        colors={['black', '#a855f7', 'black']}
        style={StyleSheet.absoluteFillObject}
      />
      <View>
        <CustomText
          text={props.title}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes['2xl'],
            fontWeight: '500',
          }}
        />
        <CustomText
          text="Here."
          style={{
            color: 'white',
            fontSize: Theme.fontSizes['4xl'],
            fontWeight: 'bold',
          }}
        />
      </View>

      <CustomText
        text={'Pre-Register Now \nEarn 25 Watch Hours!'}
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.lg,
          textAlign: 'right',
          fontWeight: '500',
        }}
      />

      <View>
        <CustomTextButton
          text="Sign Up"
          borderRadius={12}
          onPress={() => {
            console.log('Sign Up');
          }}
          backgroundColor="white"
          textColor={'#a855f7'}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 12,
          }}
          onPress={() => {
            navigation.navigate('AllReadyHaveAnAccount');
          }}>
          <CustomText
            text="Already have an account?"
            style={{
              color: 'black',
              fontSize: 13,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{gap: 8}}>
        <CustomText
          text="Discover More"
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: Theme.fontSizes.md,
          }}
        />

        <SocialButtons />
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          padding: 12,
        }}
        onPress={() => {
          console.log('Learn More');
        }}>
        <CustomText
          text="Terms | Privacy "
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.xs,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PreRegistrationView;

const styles = StyleSheet.create({});

const SocialButtons = () => {
  const socials = [
    {
      icon: 'instagram',
      url: 'https://www.instagram.com/patiplay/',
    },
    {
      icon: 'facebook',
      url: 'https://www.facebook.com/patiplay',
    },
    {
      icon: <IconFontAwesome6 name={'x-twitter'} size={28} color="black" />,
      url: 'https://twitter.com/patiplay',
    },
    {
      icon: 'linkedin',
      url: 'https://www.linkedin.com/company/patiplay',
    },
    {
      icon: 'youtube',
      url: 'https://www.youtube.com/channel/UC9J9Z',
    },
    {
      icon: <IconMaterialIcons name={'tiktok'} size={36} color="black" />,
      url: 'https://www.tiktok.com/@patiplay',
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        alignItems: 'center',
      }}>
      {socials.map((social, index) => (
        <SocialButton
          key={index}
          icon={social.icon}
          onpress={() => {
            console.log(social.url);
          }}
        />
      ))}
    </View>
  );
};
