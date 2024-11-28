import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {Theme} from '../../../../constants/Theme';
import {faker} from '@faker-js/faker';
import FavoriteItem from '../../../../components/shared/CustomComponents/FavoriteItem';

export const characterLimited = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

const SPACE = Theme.spacing.columnGap;

const companies: Company[] = Array(10)
  .fill(null)
  .map(() => ({
    name: faker.company.name(), // Şirket adını al
    logo: faker.image.urlPicsumPhotos(), // Avatar resmini al
  }));

interface Company {
  name: string;
  logo: string;
}

const FavoriteCompaniesView = () => {
  const renderItem = useCallback(({item}: {item: Company}) => {
    return (
      <FavoriteItem
        image={item.logo}
        name={item.name}
        description="82 Titles"
        buttonText="Surprise Me"
        onPress={() => {}}
      />
    );
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.container}
        data={companies}
        numColumns={3}
        columnWrapperStyle={{
          gap: SPACE,
        }}
        contentContainerStyle={{
          paddingHorizontal: SPACE,
          paddingVertical: 12,
          gap: SPACE * 2,
        }}
        keyExtractor={item => item.name}
        renderItem={({item}) => renderItem({item})}></FlatList>
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
