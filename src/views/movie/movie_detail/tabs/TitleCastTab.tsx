import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../constants/Theme';
import DicussionNew from '../../../../components/shared/DicussionNew';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import {ImageManager} from '../../../../constants/ImageManager';
import CustomText from '../../../../components/shared/CustomText';

type Props = {};

const width = Dimensions.get('window').width;

const TitleCastTab = (props: Props) => {
  const casts = useSelector((state: RootState) => state.titleDetail.casts);
  const castsInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.castsInitialLoading,
  );

  return (
    <FlatList
      data={casts}
      scrollEnabled={false}
      initialNumToRender={5}
      numColumns={4}
      columnWrapperStyle={{
        gap: Theme.spacing.columnGap,
      }}
      ListHeaderComponent={() => {
        return (
          castsInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={castsInitialLoading}
              />
            </View>
          )
        );
      }}
      contentContainerStyle={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: Theme.spacing.rowGap,
      }}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return (
          <View
            style={{
              alignItems: 'center',
              width:
                (Dimensions.get('window').width -
                  2 * Theme.paddings.viewHorizontalPadding -
                  3 * Theme.spacing.columnGap) /
                4,
            }}>
            <CircularAvatar imagePath={ImageManager.IMAGE_NAMES.MANAVATAR} />
            <CustomText
              text="Muhammet Kaymaz"
              style={{
                color: Theme.colors.white,
                textAlign: 'center',
                fontSize: Theme.fontSizes.xs,
              }}
            />
            <CustomText
              text="Tom"
              style={{
                color: Theme.colors.white,
                textAlign: 'center',
                opacity: 0.5,
                fontSize: Theme.fontSizes['2xs'],
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default React.memo(TitleCastTab);

const styles = StyleSheet.create({});
