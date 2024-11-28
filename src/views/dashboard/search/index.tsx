import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {Theme} from '../../../constants/Theme';
import SearchField from '../../auth/components/SearchField';
import topMovies from '../../../models/topMovies';
import FilterModal from './components/FilterModal';
import DeviceInfo from 'react-native-device-info';
import SearchTitleCard from './components/SearchTitleCard';
import nowPlayMovies from '../../../models/now_play_movies';
import {Drawer} from 'react-native-drawer-layout';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  setSearchFilterVisible,
  setSearchList,
} from '../../../redux/features/search/searchSlice';
import {FilterCollapse} from '../../../components/shared/FilterCollapsible';
import upComingTitles from '../../../models/upcoming';
import PreRegistrationView from '../../preregistration/PreRegistrationView';

import {useHeaderHeight} from '@react-navigation/elements';

type Props = {};

const SearchView = (props: Props) => {
  const searchFilterVisible = useSelector(
    (state: RootState) => state.search.searchFilterVisible,
  );
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <PreRegistrationView title={'Unlimited Entertainment?'} />;
  }

  const headerHeight = useHeaderHeight();

  return (
    <View style={{flex: 1, paddingTop: headerHeight}}>
      <Drawer
        open={searchFilterVisible}
        onOpen={() => dispatch(setSearchFilterVisible(true))}
        onClose={() => dispatch(setSearchFilterVisible(false))}
        drawerPosition="right"
        drawerType="slide"
        drawerStyle={{backgroundColor: 'black'}}
        renderDrawerContent={() => {
          return (
            <ScrollView contentContainerStyle={{paddingVertical: 12}}>
              <FilterCollapse
                isCollapsed={false}
                title="Medium"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: 'Film', id: 2},
                  {name: 'TV Show', id: 3},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(upComingTitles))
                }
              />
              <FilterCollapse
                isCollapsed={true}
                title="Country"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: 'USA', id: 2},
                  {name: 'UK', id: 3},
                  {name: 'France', id: 4},
                  {name: 'Germany', id: 5},
                  {name: 'Japan', id: 6},
                  {name: 'Korea', id: 7},
                  {name: 'China', id: 8},
                  {name: 'India', id: 9},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(topMovies))
                }
              />
              <FilterCollapse
                isCollapsed={true}
                title="Year"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: '1996', id: 2},
                  {name: '1997', id: 3},
                  {name: '1998', id: 4},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(upComingTitles))
                }
              />
              <FilterCollapse
                isCollapsed={true}
                title="Genre"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: 'Action', id: 2},
                  {name: 'Adventure', id: 3},
                  {name: 'Animation', id: 4},
                  {name: 'Comedy', id: 5},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(upComingTitles))
                }
              />
              <FilterCollapse
                isCollapsed={true}
                title="Cast"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: 'Tom Cruise', id: 2},
                  {name: 'Will Smith', id: 3},
                  {name: 'Angelina Jolie', id: 4},
                  {name: 'Brad Pitt', id: 5},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(upComingTitles))
                }
              />
              <FilterCollapse
                isCollapsed={true}
                title="Crew"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: 'Christopher Nolan', id: 2},
                  {name: 'Steven Spielberg', id: 3},
                  {name: 'James Cameron', id: 4},
                  {name: 'Quentin Tarantino', id: 5},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(upComingTitles))
                }
              />
              <FilterCollapse
                isCollapsed={true}
                title="Audio"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: 'English', id: 2},
                  {name: 'Hindi', id: 3},
                  {name: 'Spanish', id: 4},
                  {name: 'French', id: 5},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(upComingTitles))
                }
              />
              <FilterCollapse
                isCollapsed={true}
                title="Subtitles"
                filterValues={[
                  {name: 'All', id: 1},
                  {name: 'English', id: 2},
                  {name: 'Hindi', id: 3},
                  {name: 'Spanish', id: 4},
                  {name: 'French', id: 5},
                ]}
                getFilteredValue={appliedFilters =>
                  dispatch(setSearchList(upComingTitles))
                }
              />
            </ScrollView>
          );
        }}>
        <ScrollView
          removeClippedSubviews={true}
          style={styles.view}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll={true}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingVertical: 16,
          }}>
          <SearchInput />
          <SearchTitleList />
        </ScrollView>
      </Drawer>
    </View>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
  },

  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SearchInput = React.memo(() => {
  console.log('SearchInput rendered');
  return (
    <View
      style={{
        backgroundColor: Theme.colors.background,
        paddingBottom: 12,
      }}>
      <SearchField onChangeText={() => {}} value="" />
    </View>
  );
});

const SearchTitleList = () => {
  const movie = topMovies[9];
  console.log(movie);

  const [loading, setLoading] = React.useState(true);

  const searchList = useSelector((state: RootState) => state.search.searchList);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          flex: 1,
        }}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={searchList}
      initialNumToRender={10}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={{height: 12}} />}
      renderItem={({item}) => {
        return (
          <SearchTitleCard
            title={item}
            width={DeviceInfo.isTablet() ? '33%' : '100%'}
          />
        );
      }}
    />
  );
};
