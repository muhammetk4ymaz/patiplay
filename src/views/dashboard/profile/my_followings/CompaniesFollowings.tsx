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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/routes';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {};

const SPACE = Theme.spacing.columnGap;

const CompaniesFollowings = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [companiesFollowingsData, setCompaniesFollowingsData] =
    React.useState<any>();

  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await networkService.post(
          'title/api/user-follow-list-view/',
          {
            tab: 'Companies',
          },
        );
        console.log(response.data);
        setCompaniesFollowingsData(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <LoadingWidget />;
  }

  return (
    <ScrollView
      contentContainerStyle={{gap: Theme.spacing.columnGap}}
      removeClippedSubviews={true}
      style={{
        flex: 1,
      }}>
      <MyFollowingList myFollowings={companiesFollowingsData.my_follow} />
      <FollowerList
        title="My Network Follows"
        list={companiesFollowingsData.my_occupation.users}
      />
      <FollowerList
        title={companiesFollowingsData.my_occupation.name + ' Follows'}
        list={companiesFollowingsData.my_occupation.users}
      />
      <FollowerList
        title={companiesFollowingsData.my_city.name + ' Follows'}
        list={companiesFollowingsData.my_city.users}
      />
      <FollowerList
        title={companiesFollowingsData.my_state.name + ' Follows'}
        list={companiesFollowingsData.my_state.users}
      />
      <FollowerList
        title={companiesFollowingsData.my_country.name + ' Follows'}
        list={companiesFollowingsData.my_country.users}
      />
      <FollowerList
        title="Everyone Follows"
        list={companiesFollowingsData.my_country.users}
      />
      <FollowerList
        title="For Me"
        list={companiesFollowingsData.my_country.users}
      />
    </ScrollView>
  );
};

export default CompaniesFollowings;

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
        keyExtractor={item => item.user.id}
        renderItem={({item}) => {
          return (
            <CircularAvatar
              imagePath={{
                uri: item.user.logo,
              }}
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
              type: 'Companies',
            });
          }}
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            // backgroundColor: 'red',
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
          return <AvatarComponent item={item} />;
        }}
        initialNumToRender={6}
      />
    </View>
  );
};

const AvatarComponent = React.memo(({item}: {item: any}) => (
  <Avatar size={'xl'} source={{uri: item.logo}} />
));
