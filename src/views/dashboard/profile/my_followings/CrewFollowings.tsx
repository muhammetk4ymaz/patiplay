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
import {ImageManager} from '../../../../constants/ImageManager';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/routes';

type Props = {};

const SPACE = Theme.spacing.columnGap;

const CrewFollowings = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [crewFollowingsData, setCrewFollowingsData] = React.useState<any>();

  React.useEffect(() => {
    const fetchCrew = async () => {
      try {
        const response = await networkService.post(
          'title/api/user-follow-list-view/',
          {
            tab: 'Crew',
          },
        );
        console.log(response.data);
        setCrewFollowingsData(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCrew();
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
      <MyFollowingList myFollowings={crewFollowingsData.my_follow} />
      <FollowerList
        title="My Network Follows"
        list={crewFollowingsData.my_occupation.users}
      />
      <FollowerList
        title={crewFollowingsData.my_occupation.name + ' Follows'}
        list={crewFollowingsData.my_occupation.users}
      />
      <FollowerList
        title={crewFollowingsData.my_city.name + ' Follows'}
        list={crewFollowingsData.my_city.users}
      />
      <FollowerList
        title={crewFollowingsData.my_state.name + ' Follows'}
        list={crewFollowingsData.my_state.users}
      />
      <FollowerList
        title={crewFollowingsData.my_country.name + ' Follows'}
        list={crewFollowingsData.my_country.users}
      />
      <FollowerList
        title="Everyone Follows"
        list={crewFollowingsData.my_country.users}
      />
      <FollowerList title="For Me" list={crewFollowingsData.my_country.users} />
    </ScrollView>
  );
};

export default CrewFollowings;

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
            <View style={{gap: 8, alignItems: 'center'}}>
              <CircularAvatar
                imagePath={
                  item.image
                    ? {uri: item.image}
                    : ImageManager.IMAGE_NAMES.MANAVATAR
                }
              />
              <FollowingsFollowButton endpoint="" initialValue={true} uuid="" />
            </View>
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
              type: 'Crew',
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

type FollowingsFollowButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

const FollowingsFollowButton = (props: FollowingsFollowButtonProps) => {
  const [followed, setFollowed] = React.useState(props.initialValue);
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          const response = await networkService.post(
            `title/api/${props.endpoint}-action/`,
            {
              network: followed ? 'remove' : 'add',
              name: props.uuid,
            },
          );

          if (response.status === 200) {
            console.log('Network', response.data);
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
          paddingVertical: 4,
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
