import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {Theme} from '../../../../constants/Theme';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../../components/shared/CustomText';
import {faker} from '@faker-js/faker';
import CustomTextButton from '../../../../components/shared/CustomTextButton';
import CircularAvatar from '../../../../components/shared/CircularAvatar';

export const characterLimited = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

const SPACE = 12;

const users: User[] = Array(10)
  .fill(null)
  .map(() => ({
    fullName: faker.person.fullName(),
    avatar: faker.image.avatar(),
  }));

interface User {
  fullName: string;
  avatar: string;
}

const MyNetworkView = () => {
  const renderItem = useCallback(({item}: {item: User}) => {
    return <MyNetworkItem user={item} />;
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.container}
        data={users}
        numColumns={3}
        removeClippedSubviews={true}
        columnWrapperStyle={{
          gap: SPACE,
        }}
        contentContainerStyle={{
          paddingHorizontal: SPACE,
          paddingVertical: 12,
          gap: SPACE * 2,
        }}
        keyExtractor={item => item.fullName}
        renderItem={({item}) => renderItem({item})}></FlatList>
    </View>
  );
};

export default MyNetworkView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

const MyNetworkItem = ({user}: {user: User}) => {
  return (
    <View style={{gap: SPACE, alignItems: 'center', flex: 1 / 3}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: -4,
          top: -4,
          padding: 4,
        }}>
        <IconIonicons name="ellipsis-vertical" color={'white'} size={20} />
      </TouchableOpacity>
      <CircularAvatar
        imagePath={{
          uri: user.avatar,
        }}
      />
      <View>
        <CustomText
          numberOfLines={1}
          text={characterLimited(user.fullName, 12)}
          weight="medium"
          style={{
            color: 'white',
            textAlign: 'center',

            fontSize: Theme.fontSizes.sm,
          }}
        />
        <CustomText
          text="@muhammetk4ymaz"
          numberOfLines={1}
          weight="medium"
          style={{
            fontSize: Theme.fontSizes.sm,
            textAlign: 'center',
            color: 'white',
            opacity: 0.5,
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <CustomTextButton
            text="Slay Together"
            paddingVertical={6}
            borderRadius={36}
            paddingHorizontal={16}
            backgroundColor={'#202124'}
            onPress={() => {}}
            textStyle={{
              fontSize: Theme.fontSizes.sm,
            }}
          />
        </View>
      </View>
    </View>
  );
};
