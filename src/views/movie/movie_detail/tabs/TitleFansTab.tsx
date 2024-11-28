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

const TitleFansTab = (props: Props) => {
  const fans = useSelector((state: RootState) => state.titleDetail.fans);
  const fansInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.fansInitialLoading,
  );

  return (
    <FlatList
      data={fans}
      scrollEnabled={false}
      initialNumToRender={5}
      numColumns={3}
      columnWrapperStyle={{
        gap: Theme.spacing.columnGap,
      }}
      ListHeaderComponent={() => {
        return (
          fansInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={fansInitialLoading}
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
                  2 * Theme.spacing.columnGap) /
                3,
            }}>
            <CircularAvatar imagePath={ImageManager.IMAGE_NAMES.MANAVATAR} />
            <CustomText
              text="@muhammetk4ymaz"
              numberOfLines={1}
              style={{
                color: Theme.colors.white,
                textAlign: 'center',
                fontSize: Theme.fontSizes.xs,
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default React.memo(TitleFansTab);

const styles = StyleSheet.create({});
