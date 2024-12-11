import React, {useRef} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../../../utils/theme';
import {RouteProp, useRoute} from '@react-navigation/native';
import FavoriteItem from '../../../../components/shared/CustomComponents/FavoriteItem';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../../../../components/shared/CustomBottomSheetModal';
import networkService from '../../../../helpers/networkService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../../../../components/shared/CustomText';

export const characterLimited = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

const SPACE = Theme.spacing.columnGap;

type RouteParams = {
  FavoriteCompanies: {
    data: any[];
  };
};

const FavoriteCompaniesView = () => {
  const route = useRoute<RouteProp<RouteParams, 'FavoriteCompanies'>>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [selectedUser, setSelectedUser] = React.useState<string>();

  React.useEffect(() => {
    console.log('FavoriteCompanies', route.params.data);
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.container}
        data={route.params.data}
        numColumns={3}
        columnWrapperStyle={{
          gap: SPACE,
        }}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingVertical: 12,
          gap: SPACE * 2,
        }}
        keyExtractor={item => item.slug}
        renderItem={({item}) => (
          <FavoriteItem
            buttonText="Surprise Me"
            name={item.legalName}
            image={item.image}
            description="81 Titles"
            onPress={() => {
              setSelectedUser(item.slug);
              bottomSheetModalRef.current?.present();
            }}
          />
        )}></FlatList>
      <CustomBottomSheetModal bottomSheetModalRef={bottomSheetModalRef}>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            onPress={async () => {
              try {
                const response = await networkService.delete(
                  'title/api/my-network/',
                  {
                    data: {
                      username: selectedUser,
                    },
                  },
                );
                if (response.status === 200) {
                }
              } catch (error) {}
            }}
            style={{
              padding: 12,
              backgroundColor: 'transparent',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 4,
            }}>
            <MaterialIcons
              name="heart-broken"
              color="white"
              size={28}
              style={{marginRight: 8}}
            />
            <CustomText
              text="Remove from My Favorites"
              style={{
                color: 'white',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedUser('');
              bottomSheetModalRef.current?.dismiss();
            }}
            style={{padding: 12, backgroundColor: 'transparent'}}>
            <CustomText
              text="Cancel"
              style={{
                color: Theme.colors.primary,
                textAlign: 'center',
                fontSize: 16,
              }}
            />
          </TouchableOpacity>
        </View>
      </CustomBottomSheetModal>
    </View>
  );
};

export default FavoriteCompaniesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
