import React, {useCallback, useRef} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import nowPlayMovies from '../../../../models/now_play_movies';
import {Theme} from '../../../../constants/Theme';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../../../../components/shared/CustomBottomSheetModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../../../../components/shared/CustomText';
import FavoriteItemComponent from './components/FavoriteItemComponent';
import RemoveFavoriteModal from './components/RemoveFavoriteModal';

const {width} = Dimensions.get('window');

const FavoriteTitlesView = React.memo(() => {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          animating={loading}
        />
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          data={nowPlayMovies}
          numColumns={3}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 12,
          }}
          columnWrapperStyle={{
            gap: 12,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <FavoriteItemComponent
              onPressButton={() => {
                bottomSheetModalRef.current?.present();
              }}
              poster_path={item.poster_path}
              type="movie"
            />
          )}></FlatList>
        <RemoveFavoriteModal bottomSheetModalRef={bottomSheetModalRef} />
      </View>
    );
  }
});

export default FavoriteTitlesView;
