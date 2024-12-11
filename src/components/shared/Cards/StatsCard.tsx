import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Theme} from '../../../utils/theme';
import {calculateGridItemWidth} from '../../../utils/calculateGridItemWidth';
import CustomText from '../CustomText';

type Props = {
  title: string;
  value: string;
  supText?: string;
};

const StatsCard = (props: Props) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <CustomText text={props.value} weight="bold" style={styles.value} />
        {props.supText && (
          <CustomText
            text={props.supText}
            weight="bold"
            style={styles.supText}
          />
        )}
      </View>
      <CustomText
        text={props.title}
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.key}
      />
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.sambucus,
    paddingHorizontal: 4,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    width: calculateGridItemWidth(4),
  },
  value: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  key: {
    color: Theme.colors.primary,
    textAlign: 'center',
    fontSize: 10,
  },
  supText: {
    color: 'white',
    fontSize: 6,
    textAlignVertical: 'top',
  },
});
