import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';

type Props = {};

const PeopleLabel = (props: Props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderTopLeftRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}>
          <IconIonicons name="person" size={8} color={Theme.colors.white} />
          <CustomText
            text="12"
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes['2xs'],
            }}
            weight="medium"
          />
        </View>
      </View>
    </View>
  );
};

export default PeopleLabel;

const styles = StyleSheet.create({});
