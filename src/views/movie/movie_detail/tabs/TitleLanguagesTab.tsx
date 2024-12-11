import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Theme} from '../../../../utils/theme';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import CustomText from '../../../../components/shared/CustomText';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootState} from '../../../../redux/store';
import {RootStackParamList} from '../../../../navigation/routes';

type Props = {
  dubLanguages: any[];
  subLanguages: any[];
};

const TitleLanguagesTab = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // English (EN): Mavi (#4A90E2)
  // Spanish (ES): Turuncu (#F5A623)
  // French (FR): Açık Mor (#BD10E0)
  // German (DE): Yeşil (#7ED321)
  // Italian (IT): Kırmızı (#D0021B)
  // Arabic (AR): Koyu Yeşil (#417505)
  // Chinese (ZH): Sarı (#F8E71C)

  return (
    <View style={{}}>
      <CustomText
        text="Audio Languages"
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.md,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="medium"
      />
      <FlatList
        data={props.dubLanguages || []}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.columnGap,
          paddingVertical: Theme.spacing.rowGap,
        }}
        keyExtractor={index => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LanguagesAudio');
              }}>
              <View
                style={{
                  height: 40,
                  aspectRatio: 1,
                  borderRadius: 40 / 2,
                  backgroundColor: 'black',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  elevation: 5,
                  shadowColor: 'rgba(255, 255, 255, 1)',
                  shadowOpacity: 1,
                  shadowOffset: {width: 0, height: 1},
                  // backgroundColor: '#4A90E2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomText
                  text={item.language.toUpperCase()}
                  weight="bold"
                  style={{
                    color: Theme.colors.white,
                    fontSize: Theme.fontSizes.md,
                    textAlign: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <CustomText
        text="Subtitles Languages"
        style={{
          color: 'white',
          fontSize: Theme.fontSizes.md,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}
        weight="medium"
      />
      <FlatList
        data={props.subLanguages || []}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.columnGap,
          paddingVertical: Theme.spacing.rowGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LanguagesSubtitles');
              }}>
              <View
                style={{
                  height: 40,
                  aspectRatio: 1,
                  borderRadius: 40 / 2,
                  backgroundColor: 'black',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  elevation: 5,
                  shadowColor: 'rgba(255, 255, 255, 1)',
                  shadowOpacity: 1,
                  shadowOffset: {width: 0, height: 1},
                  // backgroundColor: '#4A90E2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomText
                  text={item.sub_language.toUpperCase()}
                  weight="bold"
                  style={{
                    color: Theme.colors.white,
                    fontSize: Theme.fontSizes.md,
                    textAlign: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default React.memo(TitleLanguagesTab);

const styles = StyleSheet.create({});
