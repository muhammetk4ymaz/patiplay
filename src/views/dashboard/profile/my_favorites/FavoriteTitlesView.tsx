import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import {Theme} from '../../../../utils/theme';
import FavoriteItemComponent from './components/FavoriteItemComponent';
import RemoveFavoriteModal from './components/RemoveFavoriteModal';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

const {width} = Dimensions.get('window');

type Props = {
  data: any[];
};

const FavoriteTitlesView = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={props.data}
          numColumns={3}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            rowGap: Theme.spacing.rowGap,
          }}
          columnWrapperStyle={{
            columnGap: Theme.spacing.columnGap,
          }}
          keyExtractor={item => item.uuid.toString()}
          renderItem={({item}) => (
            <FavoriteItemComponent
              onPressButton={() => {
                bottomSheetModalRef.current?.present();
              }}
              source={{uri: item.verticalPhotos__0__url}}
              type="movie"
            />
          )}></FlatList>
        <RemoveFavoriteModal bottomSheetModalRef={bottomSheetModalRef} />
      </View>
    );
  }
};

export default FavoriteTitlesView;
