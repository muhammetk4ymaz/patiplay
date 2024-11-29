import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../constants/Theme';
import CustomText from '../CustomText';

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
};

const ContentWithIconCard = (props: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>{props.icon}</View>
      {props.children}

      <View
        style={
          {
            // position: 'absolute',
            // bottom: -20,
            // alignSelf: 'center',
            // backgroundColor: Theme.colors.sambucus,
            // borderRadius: 100,
          }
        }>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            padding: 12,
            bottom: -20,
          }}
          onPress={() => {
            console.log('Learn More');
          }}>
          <CustomText
            text="Terms | Privacy "
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.xs,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContentWithIconCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.sambucus,
    paddingHorizontal: 16,
    borderRadius: 72,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    paddingBottom: 30,
    paddingTop: 90,
  },
  icon: {
    position: 'absolute',
    top: -64,
    alignSelf: 'center',
    backgroundColor: Theme.colors.sambucus,
    borderColor: '#7F838D',
    borderWidth: 2,
    padding: 12,
    borderRadius: 100,
  },
});
