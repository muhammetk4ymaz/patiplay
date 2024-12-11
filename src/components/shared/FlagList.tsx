import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {RootStackParamList} from '../../navigation/routes';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../utils/theme';
import {GlobeIcon} from '../../../assets/icons';
import FlagComponent from './FlagComponent';

type FlagListProps = {
  flags?: string[];
  onPress?: (iso2: string) => void;
};

export const FlagList = (props: FlagListProps) => {
  console.log('flags', props.flags);
  const flags = props.flags || [
    'Us',
    'Tr',
    'Br',
    'De',
    'Cn',
    'Gb',
    'Tr',
    'Br',
    'De',
  ];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingLeft: Theme.paddings.viewHorizontalPadding,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Countries');
        }}
        style={{
          alignSelf: 'center',
        }}>
        <GlobeIcon size={45} />
      </TouchableOpacity>
      <View
        style={{
          marginVertical: 12,
          width: 1.5,
          height: 'auto',
          backgroundColor: 'gray',
          marginLeft: 5,
        }}
      />
      <FlatList
        horizontal
        nestedScrollEnabled
        keyExtractor={(item, index) => `flagitem-${index}`}
        contentContainerStyle={{
          gap: 5,
          paddingRight: 18,
          paddingLeft: 5,
          paddingVertical: 12,
        }}
        data={flags}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              props.onPress && props.onPress(item);
            }}>
            <FlagComponent isoCode={item} width={45} height={45} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
