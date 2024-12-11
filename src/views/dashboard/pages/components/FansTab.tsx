import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import {ImageManager} from '../../../../constants/ImageManager';
import CustomText from '../../../../components/shared/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  data: any;
};

const FansTab = (props: Props) => {
  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    console.log(props.data);
  }, []);

  const fans = props.data.fans;

  return (
    <FlatList
      data={fans}
      scrollEnabled={false}
      numColumns={3}
      columnWrapperStyle={{
        columnGap: Theme.spacing.columnGap,
      }}
      contentContainerStyle={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        rowGap: Theme.spacing.rowGap,
        paddingBottom: insets.bottom,
      }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <View
            style={{
              alignItems: 'center',
              width: calculateGridItemWidth(3),
              gap: 5,
            }}>
            <CircularAvatar
              imagePath={
                item.image
                  ? {uri: item.image}
                  : ImageManager.IMAGE_NAMES.MANAVATAR
              }
            />
            <View>
              <CustomText
                text={item.name_surname}
                numberOfLines={1}
                style={{
                  color: Theme.colors.white,
                  textAlign: 'center',
                  fontSize: Theme.fontSizes.xs,
                }}
              />
              <CustomText
                text={'@' + item.username}
                numberOfLines={1}
                style={{
                  color: Theme.colors.white,
                  textAlign: 'center',
                  fontSize: Theme.fontSizes.xs,
                  opacity: 0.5,
                }}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

export default FansTab;

const styles = StyleSheet.create({});
