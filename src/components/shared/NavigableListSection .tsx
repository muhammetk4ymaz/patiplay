import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Theme} from '../../utils/theme';
import CustomText from './CustomText';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ScrollableRow from './ScrollableRow';

const SPACING = 8;

type Props = {
  title: string;
  pressHandler: () => void;
  data: any[];
  renderItem: ({item}: {item: any}) => JSX.Element;
  keyExtractor: (item: any) => string;
  initialNumToRender?: number;
};

const NavigableListSection = (props: Props) => {
  const renderItem = useCallback(
    ({item}: {item: any}) => props.renderItem({item}),
    [],
  );

  return (
    <View style={{gap: SPACING}}>
      <ListTitle title={props.title} onPress={props.pressHandler} />
      <ScrollableRow
        data={props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        initialNumToRender={4}
      />
    </View>
  );
};

export default NavigableListSection;

const styles = StyleSheet.create({
  listTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
  },
  listTitleText: {
    color: 'white',
    fontSize: Theme.fontSizes.md,
  },
});

export const ListTitle = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.listTitle} onPress={onPress}>
      <CustomText text={title} style={styles.listTitleText} weight="medium" />
      <IconIonicons
        name="chevron-forward"
        size={16}
        style={{position: 'absolute', right: 18}}
        color={Theme.colors.white}
      />
    </TouchableOpacity>
  );
};
