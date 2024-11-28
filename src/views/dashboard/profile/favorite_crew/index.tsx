import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {Theme} from '../../../../constants/Theme';
import FavoriteItem from '../../../../components/shared/CustomComponents/FavoriteItem';

export const characterLimited = (text: string, limit: number) => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

const SPACE = 12;

const FavoriteCrewView = () => {
  const renderItem = useCallback(({item}: {item: any}) => {
    return (
      <FavoriteItem
        image={
          'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
        }
        name={'Alejandro Escamilla'}
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
        data={[1, 2, 3, 5, 6]}
        numColumns={3}
        columnWrapperStyle={{
          gap: SPACE,
        }}
        contentContainerStyle={{
          paddingHorizontal: 4,
          paddingVertical: 12,
          gap: SPACE * 2,
        }}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => renderItem({item})}></FlatList>
    </View>
  );
};

export default FavoriteCrewView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
