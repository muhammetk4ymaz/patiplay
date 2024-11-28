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
import {Theme} from '../../../../constants/Theme';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import CustomText from '../../../../components/shared/CustomText';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootState} from '../../../../redux/store';
import {RootStackParamList} from '../../../../navigation/routes';

type Props = {};

const TitleLanguagesTab = (props: Props) => {
  const languages = useSelector(
    (state: RootState) => state.titleDetail.languages,
  );
  const languagesInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.languagesInitialLoading,
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // English (EN): Mavi (#4A90E2)
  // Spanish (ES): Turuncu (#F5A623)
  // French (FR): Açık Mor (#BD10E0)
  // German (DE): Yeşil (#7ED321)
  // Italian (IT): Kırmızı (#D0021B)
  // Arabic (AR): Koyu Yeşil (#417505)
  // Chinese (ZH): Sarı (#F8E71C)

  return (
    <View
      style={{
        paddingVertical: 12,
      }}>
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
        data={languages.slice(0, 3)}
        scrollEnabled={false}
        numColumns={3}
        columnWrapperStyle={{
          gap: Theme.spacing.columnGap,
        }}
        ListHeaderComponent={() => {
          return (
            languagesInitialLoading && (
              <View
                style={{
                  paddingVertical: Theme.spacing.columnGap,
                }}>
                <ActivityIndicator
                  size="large"
                  color={Theme.colors.primary}
                  animating={languagesInitialLoading}
                />
              </View>
            )
          );
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.rowGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LanguagesAudio');
              }}>
              <View
                style={{
                  width: calculateGridItemWidth(4),
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <View
                  style={{
                    width: '50%',
                    height: '50%',
                    borderRadius: 100,
                    backgroundColor: '#4A90E2',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    text="EN"
                    weight="bold"
                    style={{
                      color: Theme.colors.white,
                      fontSize: Theme.fontSizes.md,
                      textAlign: 'center',
                    }}
                  />
                </View>
                <CustomText
                  text="English"
                  style={{
                    textAlign: 'center',
                    color: Theme.colors.white,
                    opacity: 0.7,
                    fontSize: Theme.fontSizes.sm,
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
        data={languages.slice(0, 3)}
        scrollEnabled={false}
        numColumns={3}
        columnWrapperStyle={{
          gap: Theme.spacing.columnGap,
        }}
        ListHeaderComponent={() => {
          return (
            languagesInitialLoading && (
              <View
                style={{
                  paddingVertical: Theme.spacing.columnGap,
                }}>
                <ActivityIndicator
                  size="large"
                  color={Theme.colors.primary}
                  animating={languagesInitialLoading}
                />
              </View>
            )
          );
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.rowGap,
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
                  width: calculateGridItemWidth(4),
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <View
                  style={{
                    width: '50%',
                    height: '50%',
                    borderRadius: 100,
                    backgroundColor: '#4A90E2',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    text="EN"
                    weight="bold"
                    style={{
                      color: Theme.colors.white,
                      fontSize: Theme.fontSizes.md,
                      textAlign: 'center',
                    }}
                  />
                </View>
                <CustomText
                  text="English"
                  style={{
                    textAlign: 'center',
                    color: Theme.colors.white,
                    opacity: 0.7,
                    fontSize: Theme.fontSizes.sm,
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
