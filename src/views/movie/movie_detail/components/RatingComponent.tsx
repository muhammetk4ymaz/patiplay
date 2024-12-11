import {StyleSheet, View} from 'react-native';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../utils/theme';
import {Rating} from 'react-native-ratings';
import React from 'react';

const RatingComponent = (props: {rating: number}) => {
  const {rating} = props;
  const [ratingValue, setRatingValue] = React.useState(0);
  return (
    <View style={styles.raitingComponent}>
      <View style={styles.ratingContainer}>
        <CustomText text="Overall Rating" style={styles.ratingTitle} />
        <CustomText text={rating.toString() || ''} style={styles.rating} />
        <Rating
          startingValue={rating / 2}
          ratingBackgroundColor="white"
          tintColor="black"
          fractions={2}
          imageSize={24}
          type="custom"
          showRating={false}
          // ratingColor={Theme.colors.primary}
          readonly={true}
        />
      </View>
      <View
        style={{
          width: 1,
          backgroundColor: Theme.colors.white,
          height: 'auto',
        }}></View>
      <View style={styles.ratingContainer}>
        <CustomText text="Your Rating" style={styles.ratingTitle} />
        <CustomText
          text={Number(ratingValue.toFixed(1)).toString()}
          style={styles.rating}
        />
        <Rating
          startingValue={ratingValue}
          ratingBackgroundColor="white"
          tintColor="black"
          imageSize={24}
          fractions={2}
          type="custom"
          onFinishRating={(rating: number) => {
            setRatingValue(rating);
          }}
          showRating={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  raitingComponent: {
    marginTop: 8,
    flexDirection: 'row',
  },
  ratingContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 5,
  },
  ratingTitle: {
    color: Theme.colors.gray,
    fontSize: Theme.fontSizes.sm,
    fontWeight: 'bold',
  },
  rating: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes['2xl'],
    fontWeight: 'bold',
  },
});
