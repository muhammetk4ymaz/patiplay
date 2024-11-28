import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../constants/Theme';
import IconIonicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onChangeText: (text: string) => void;
  value: string;
};

const SearchField = (props: Props) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <View style={[styles.inputStyle]}>
      <IconIonicons name={'search'} size={20} color={Theme.colors.lightgray} />
      <TextInput
        onChangeText={text => props.onChangeText(text)}
        value={props.value}
        multiline={false}
        placeholder={'Search...'}
        placeholderTextColor={Theme.colors.lightgray}
        cursorColor={Theme.colors.white}
        style={{
          color: Theme.colors.white,
          flex: 1,
          fontFamily: 'HelveticaNeue-Medium',
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  inputStyle: {
    // backgroundColor: 'red',
    backgroundColor: '#030713FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    borderRadius: 24,
    paddingVertical: Platform.select({ios: 10, android: 6}),
    gap: 12,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: Theme.fontSizes.sm,
  },
});
