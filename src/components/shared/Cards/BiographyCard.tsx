import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Theme} from '../../../constants/Theme';
import {calculateGridItemWidth} from '../../../utils/calculateGridItemWidth';
import CustomText from '../CustomText';

type Props = {
  title: string;
  value: string;
  supText?: string;
};

const SPACING = 8;

const BiographyCard = (props: Props) => {
  return (
    <View style={styles.biographyCard}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <CustomText
          text={props.value}
          weight="bold"
          style={styles.biographyValue}
        />
        {props.supText && (
          <CustomText
            text={props.supText}
            weight="bold"
            style={styles.biographySupText}
          />
        )}
      </View>
      <CustomText
        text={props.title}
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.biographyTitle}
      />
    </View>
  );
};

export default BiographyCard;

const styles = StyleSheet.create({
  biographyCard: {
    backgroundColor: Theme.colors.sambucus,
    paddingHorizontal: 4,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    width: calculateGridItemWidth(4),
  },
  biographyValue: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  biographyTitle: {
    color: Theme.colors.primary,
    textAlign: 'center',
    fontSize: 10,
  },
  biographySupText: {
    color: 'white',
    fontSize: 6,
    textAlignVertical: 'top',
  },
});
