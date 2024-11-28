import React from 'react';
import {Dimensions, Image, View} from 'react-native';

import {SceneMap} from 'react-native-tab-view';
import CustomTabBar from '../../../../components/CustomTabBar';
import {CLipsListView} from './ClipsListView';
import {EpisodesListView} from './EpisodesListView';
import {TitleListView} from './TitleListView';
import {useHeaderHeight} from '@react-navigation/elements';
import {useAppSelector} from '../../../../redux/hooks';
import {RootState} from '../../../../redux/store';
import PreRegistrationView from '../../../preregistration/PreRegistrationView';

const {width} = Dimensions.get('window');

type Props = {};

const renderScene = SceneMap({
  first: TitleListView,
  second: EpisodesListView,
  third: CLipsListView,
});

const routes = [
  {key: 'first', title: 'Titles'},
  {key: 'second', title: 'Episodes'},
  {key: 'third', title: 'Clips'},
];

const ListsView = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const headerHeight = useHeaderHeight();

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Lists from Cinephiles?'} />;
  }

  return (
    <View style={{paddingTop: headerHeight, flex: 1}}>
      <CustomTabBar
        routes={routes}
        renderScene={renderScene}
        swipeEnabled={false}
      />
    </View>
  );
};

export default ListsView;

const TitlePosterItem = ({
  poster_path,
  backdrop_path,
}: {
  poster_path: string;
  backdrop_path: string;
}) => {
  return (
    <Image
      source={{
        uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
      }}
      style={{
        width: (width - 36) / 4,
        resizeMode: 'stretch',
      }}
    />
  );
};

// const TrendingListsAmongOccupation = React.memo(() => {
//   return (
//     <View>
//       <View
//         style={{
//           paddingHorizontal: 18,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           gap: 24,
//         }}>
//         <CustomText
//           numberOfLines={1}
//           text={'Lists from Software Engineers'}
//           style={{
//             color: Theme.colors.white,
//             fontSize: Theme.fontSizes.lg,
//             flex: 1,
//           }}
//           weight="medium"
//         />
//         <TouchableOpacity onPress={() => {}} style={{alignItems: 'center'}}>
//           <CustomText text={'See All'} style={{color: Theme.colors.white}} />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={[
//           popularTitles.slice(0, 3),
//           popularTitles.slice(3, 6),
//           popularTitles.slice(6, 9),
//           popularTitles.slice(9, 12),
//           popularTitles.slice(12, 15),
//           popularTitles.slice(12, 15),
//           popularTitles.slice(12, 15),
//           popularTitles.slice(12, 15),
//         ]}
//         scrollEnabled={false}
//         numColumns={4}
//         columnWrapperStyle={{
//           gap: 12,
//         }}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingHorizontal: 18,
//           paddingVertical: 12,
//           gap: 12,
//         }}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item, index}) => {
//           return (
//             <PosterStack
//               posters={item}
//               listName={
//                 index % 2 == 0 ? 'Network List Item 1 ' : 'Favorite List Titles'
//               }
//               updatedDate="Updated 1 minutes ago"
//               posterWidth={otherListsPosterWidth}
//               posterContainerWidth={otherListsPosterContainerWidth}
//             />
//           );
//         }}
//       />
//     </View>
//   );
// });
