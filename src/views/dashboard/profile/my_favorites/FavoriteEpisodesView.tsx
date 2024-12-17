import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import popularTitles from '../../../../models/popular';
import FavoriteItemComponent from './components/FavoriteItemComponent';
import RemoveFavoriteModal from './components/RemoveFavoriteModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {};

const {width} = Dimensions.get('window');

const FavoriteEpisodesView = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  console.log('FavoriteEpisodesView');

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <View>
        <FlatList
          data={popularTitles.slice(0, 5)}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            rowGap: Theme.spacing.rowGap,
          }}
          columnWrapperStyle={{
            columnGap: Theme.spacing.columnGap,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <FavoriteItemComponent
              onPressButton={() => {
                bottomSheetModalRef.current?.present();
              }}
              poster_path={item.poster_path}
              type="episodes"
              title={item.title}
              backdropPath={item.backdrop_path}
              runtime={120}
              percentage={5}
            />
          )}></FlatList>
        <RemoveFavoriteModal bottomSheetModalRef={bottomSheetModalRef} />
      </View>
    );
  }
};

export default React.memo(FavoriteEpisodesView);

const styles = StyleSheet.create({});
