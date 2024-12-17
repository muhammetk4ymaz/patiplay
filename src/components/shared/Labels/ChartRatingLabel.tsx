import React from 'react';
import CustomText from '../CustomText';
import {View} from 'native-base';

export const ChartRatingLabel = React.memo((props: {rating: number}) => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 28,
        width: 28,
        borderRadius: 14,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        top: -8,
        right: -8,
      }}>
      <CustomText
        text={props.rating.toString()}
        weight="medium"
        style={{
          color: 'white',
          fontSize: 18,
        }}
      />
    </View>
  );
});
