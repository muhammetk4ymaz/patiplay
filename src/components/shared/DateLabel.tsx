import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {Theme} from '../../constants/Theme';

type Props = {
  date: string;
  month: string;
  backgroundColor: string;
  dateFontSize: number;
  dateFontWeight?: 'bold' | 'medium';
  monthFontSize: number;
  monthFontWeight?: 'bold' | 'medium';
};

const DateLabel = (props: Props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <View
        style={{
          backgroundColor: props.backgroundColor,
          padding: 5,
          borderTopLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}>
        <CustomText
          text={props.month}
          weight={props.monthFontWeight}
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: props.monthFontSize,
          }}
        />
        <CustomText
          text={props.date}
          weight={props.dateFontWeight}
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: props.dateFontSize,
          }}
        />
      </View>
    </View>
  );
};

export default DateLabel;

const styles = StyleSheet.create({});
