import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import networkService from '../../../../helpers/networkService';
import CircularAvatar from '../../../../components/shared/CircularAvatar';
import CustomText from '../../../../components/shared/CustomText';
import {Theme} from '../../../../utils/theme';
import ScrollableRow from '../../../../components/shared/ScrollableRow';
import {Avatar} from 'native-base';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {faker} from '@faker-js/faker';
import {ImageManager} from '../../../../constants/ImageManager';
import {RootStackParamList} from '../../../../navigation/routes';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {};

const SPACE = Theme.spacing.columnGap;

const CastFollowings = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [castFollowingsData, setCastFollowingsData] = React.useState<any>();

  React.useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await networkService.post(
          'title/api/user-follow-list-view/',
          {
            tab: 'Cast',
          },
        );
        console.log(response.data);
        setCastFollowingsData(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: Dimensions.get('window').width,
          backgroundColor: 'black',
        }}>
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          animating={loading}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{gap: Theme.spacing.columnGap}}
      removeClippedSubviews={true}
      style={{
        flex: 1,
      }}>
      <MyFollowingList myFollowings={castFollowingsData.my_follow} />
      <FollowerList
        title="My Network Follows"
        list={castFollowingsData.my_occupation.users}
      />
      <FollowerList
        title={castFollowingsData.my_occupation.name + ' Follows'}
        list={castFollowingsData.my_occupation.users}
      />
      <FollowerList
        title={castFollowingsData.my_city.name + ' Follows'}
        list={castFollowingsData.my_city.users}
      />
      <FollowerList
        title={castFollowingsData.my_state.name + ' Follows'}
        list={castFollowingsData.my_state.users}
      />
      <FollowerList
        title={castFollowingsData.my_country.name + ' Follows'}
        list={castFollowingsData.my_country.users}
      />
      <FollowerList
        title="Everyone Follows"
        list={castFollowingsData.my_country.users}
      />
      <FollowerList title="For Me" list={castFollowingsData.my_country.users} />
    </ScrollView>
  );
};

export default CastFollowings;

const styles = StyleSheet.create({});

type FollowerListProps = {
  title: string;
  list: any[];
};

const FollowerList = (props: FollowerListProps) => {
  console.log(props.list);
  return (
    <View style={{gap: SPACE}}>
      <View
        style={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <CustomText
          text={props.title}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.md,
          }}
          weight="medium"
        />
      </View>
      <ScrollableRow
        data={props.list}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <CircularAvatar
              imagePath={
                item.image
                  ? {uri: item.image}
                  : ImageManager.IMAGE_NAMES.MANAVATAR
              }
            />
          );
        }}
        initialNumToRender={8}
      />
    </View>
  );
};

type MyFollowingListProps = {
  myFollowings: any[];
};

const MyFollowingList = (props: MyFollowingListProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditFollowings', {
              data: props.myFollowings,
              type: 'Cast',
            });
          }}
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <IconMaterialIcons
            name="mode-edit-outline"
            size={24}
            color={Theme.colors.white}
          />
          <CustomText text="Edit" weight="medium" style={{color: 'white'}} />
        </TouchableOpacity>
      </View>
      <ScrollableRow
        data={props.myFollowings}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Avatar
              size={'xl'}
              backgroundColor={'transparent'}
              source={
                item.image
                  ? {uri: item.image}
                  : ImageManager.IMAGE_NAMES.MANAVATAR
              }
            />
          );
        }}
        initialNumToRender={6}
      />
    </View>
  );
};
