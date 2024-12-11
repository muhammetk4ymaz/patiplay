import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '../../../utils/theme';
import SearchField from '../../../views/auth/components/SearchField';
import CustomText from '../CustomText';

export type Filter = {
  name: string;
  id: number;
};

type FilterItemProps = {
  name: string;
  id: number;
  onPress: (isSelected: boolean) => void;
  isSelected: boolean;
};

type FilterCollapseProps = {
  isCollapsed: boolean;
  title: string;
  filterValues: Filter[];
  getFilteredValue: (appliedFilters: number[]) => void;
};

export const FilterCollapse = (props: FilterCollapseProps) => {
  const [collapsed, setCollapsed] = React.useState(props.isCollapsed);
  const [searchText, setSearchText] = React.useState('');

  const filterTitle = props.title;
  const filterValues: Filter[] = props.filterValues;

  const [filteredValues, setFilteredValues] = React.useState(filterValues);

  const [appliedFilters, setAppliedFilters] = React.useState([
    filterValues[0].id,
  ]);

  useEffect(() => {
    props.getFilteredValue(appliedFilters);
  }, [appliedFilters]);

  useEffect(() => {
    const newFilterValues = filterValues.filter(filter =>
      filter.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredValues(newFilterValues);
  }, [searchText]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={{
          padding: 8,
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CustomText
          text={filterTitle}
          weight="bold"
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.md,
          }}
        />
        <IconMaterialCommunityIcons
          name={collapsed ? 'chevron-down' : 'chevron-up'}
          size={24}
          color="white"
          onPress={() => setCollapsed(!collapsed)}
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} renderChildrenCollapsed>
        <SearchField onChangeText={setSearchText} value={searchText} />
        <FlatList
          data={filteredValues}
          scrollEnabled={false}
          style={styles.list}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}: {item: Filter}) => {
            return (
              <View>
                <FilterItem
                  name={item.name}
                  id={item.id}
                  isSelected={appliedFilters.includes(item.id)}
                  onPress={(isSelected: boolean) => {
                    if (isSelected) {
                      // Eğer yeni bir seçim yapılıyorsa
                      if (item.id === 1) {
                        // "All" seçildiyse diğer her şeyi kaldır
                        setAppliedFilters([1]);
                      } else {
                        // "Film" veya "TvShow" seçildiyse "All" seçimini kaldır ve yeni seçimi ekle
                        setAppliedFilters(prevAppliedFilters => {
                          const withoutAll = prevAppliedFilters.filter(
                            filter => filter !== 1,
                          );
                          return [...withoutAll, item.id];
                        });
                      }
                    } else {
                      // Eğer seçim kaldırılıyorsa
                      if (item.id === 1) {
                        // "All" kaldırılmaya çalışılırsa bunu engelle
                        console.log('Cannot unselect All');
                      } else {
                        // "Film" veya "TvShow" kaldırılırsa
                        setAppliedFilters(prevAppliedFilters => {
                          const newFilters = prevAppliedFilters.filter(
                            filter => filter !== item.id,
                          );
                          // Hiçbir şey seçili değilse "All" seçili olsun
                          return newFilters.length > 0 ? newFilters : [1];
                        });
                      }
                    }
                  }}
                />
                {item.id === 1 && <View style={styles.separator} />}
              </View>
            );
          }}
        />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    padding: 8,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    color: 'white',
  },
  list: {
    paddingLeft: 18,
  },
  filterItem: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  filterText: {
    color: 'white',
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    width: '100%',
    opacity: 0.5,
    marginVertical: 4,
  },
});

const FilterItem = React.memo(
  (props: FilterItemProps) => {
    console.log(props.name);

    return (
      <TouchableOpacity
        onPress={() => {
          props.onPress(!props.isSelected);
        }}
        style={{
          padding: 8,
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CustomText
          text={props.name}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.sm,
          }}
        />
        {props.isSelected && (
          <IconMaterialCommunityIcons
            name="check-bold"
            size={16}
            color="white"
          />
        )}
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.id === nextProps.id
    );
  },
);
