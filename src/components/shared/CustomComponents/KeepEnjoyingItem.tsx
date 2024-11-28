import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Theme} from '../../../constants/Theme';
import CustomText from '../CustomText';
import TitleWithProgress from './TitleWithProgress';

type Props = {
  item: any;
  index: number;
};

const KeepEnjoyingItem = (props: Props) => {
  return (
    <View
      style={{
        width:
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            2 * Theme.spacing.rowGap) /
          2,
        gap: 5,
      }}>
      <TitleWithProgress
        backdropPath={props.item.backdrop_path}
        percentage={50}
        runtime={120}
      />
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <CustomText
            numberOfLines={1}
            text={props.item.title}
            style={{color: 'white', fontSize: Theme.fontSizes.sm}}
            weight="light"
          />

          {props.index % 2 === 1 && (
            <CustomText
              numberOfLines={1}
              text={
                'S4 E18 • Entrance Entrance Entrance Entrance Entrance Entrance Entrance'
              }
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
                opacity: 0.5,
              }}
              weight="light"
            />
          )}

          <CustomText
            numberOfLines={1}
            text={'1h 30m left'}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
              opacity: 0.5,
            }}
            weight="light"
          />
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            padding: 4,
            right: -4,
          }}>
          <IconIonicons name="ellipsis-vertical" color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(KeepEnjoyingItem);

const styles = StyleSheet.create({});
