import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import CustomText from '../../../../components/shared/CustomText';
import LoadingWidget from '../../../../components/shared/LoadingWidget';
import {ImageManager} from '../../../../constants/ImageManager';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import {Theme} from '../../../../utils/theme';

type Props = {
  crewData: any[];
};

const TitleCrewTab = (props: Props) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log('Rendered CrewTab', props.crewData);
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <FlatList
        data={props.crewData}
        scrollEnabled={false}
        numColumns={3}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        keyExtractor={index => index.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                width: calculateGridItemWidth(3),
              }}>
              <CircularAvatar
                imagePath={
                  item.image
                    ? {uri: item.occupationImage}
                    : ImageManager.IMAGE_NAMES.MANAVATAR
                }
              />
              <CustomText
                text={item.name}
                style={{
                  color: Theme.colors.white,
                  textAlign: 'center',
                  fontSize: Theme.fontSizes.xs,
                }}
              />
              <CustomText
                text={item.occupation.label}
                style={{
                  color: Theme.colors.white,
                  textAlign: 'center',
                  opacity: 0.5,
                  fontSize: Theme.fontSizes.xs,
                }}
              />
            </View>
          );
        }}
      />
    );
  }
};

export default React.memo(TitleCrewTab);

const styles = StyleSheet.create({});
