import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import {RouteProp, useRoute} from '@react-navigation/native';
import CustomText from '../../../../components/shared/CustomText';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import {characterLimited} from '../favorite_companies';
import LinearGradient from 'react-native-linear-gradient';
import {ImageManager} from '../../../../constants/ImageManager';

type Props = {};

type RouteParams = {
  EditFollowings: {
    data: any[];
    type: 'Companies' | 'Cast' | 'Crew';
  };
};

const EditFollowingsView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const route = useRoute<RouteProp<RouteParams, 'EditFollowings'>>();
  const [data, setData] = React.useState<any[]>(route.params.data);

  React.useEffect(() => {
    console.log('Edit Datas', route.params.data);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FlatList
        data={data}
        numColumns={3}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: Theme.spacing.rowGap,
          rowGap: Theme.spacing.rowGap * 2,
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: calculateGridItemWidth(3),
                alignItems: 'center',
                gap: 10,
              }}>
              <CircularAvatar
                imagePath={
                  route.params.type === 'Companies'
                    ? {uri: item.logo}
                    : item.image
                    ? {uri: item.image}
                    : ImageManager.IMAGE_NAMES.MANAVATAR
                }
              />
              <CustomText
                numberOfLines={1}
                text={characterLimited(
                  route.params.type === 'Companies'
                    ? item.legalName
                    : item.name,
                  12,
                )}
                weight="medium"
                style={{
                  color: 'white',
                  textAlign: 'center',

                  fontSize: Theme.fontSizes.sm,
                }}
              />
              <FollowingsFollowButton
                initialValue={true}
                data={item}
                endpoint={route.params.type}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default EditFollowingsView;

const styles = StyleSheet.create({});

type FollowingsFollowButtonProps = {
  initialValue: boolean;
  data: any;
  endpoint: string;
};

const FollowingsFollowButton = (props: FollowingsFollowButtonProps) => {
  const [followed, setFollowed] = React.useState(props.initialValue);
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          const response = await networkService.post(
            `title/api/follow-page-process/`,
            {
              type: props.endpoint,
              data: props.data,
              my_follow: true,
            },
          );

          if (response.status === 200) {
            console.log('Followed', response.data);
            setFollowed(!followed);
          }
        } catch (error) {
          console.log(error);
        }
      }}>
      <LinearGradient
        colors={!followed ? ['#8b5cf6', '#a855f7'] : ['transparent']} // from violet-500 to purple-500
        style={{
          borderColor: followed ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
          borderWidth: followed ? 1 : 0,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 36,
        }}>
        <CustomText
          text={followed ? 'Unfollow' : 'Follow'}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.xs,
            textAlign: 'center',
          }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};
