import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Theme} from '../../../constants/Theme';
import CustomText from '../CustomText';

type Props = {
  title: string;
};

const HeaderLeftTitle = (props: Props) => {
  if (Platform.OS === 'ios') {
    return (
      <CustomText
        text={props.title}
        style={{
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: Theme.appBarTitleFontSize,
          color: Theme.colors.white,
        }}
      />
    );
  }
};

export default HeaderLeftTitle;

const styles = StyleSheet.create({});
