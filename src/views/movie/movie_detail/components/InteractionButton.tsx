import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconButton from '../../../../components/shared/IconButton';
import {Theme} from '../../../../constants/Theme';

type Props = {
  icon: React.JSX.Element;
  initialActive: boolean;
};

const InteractionButton = (props: Props) => {
  const [active, setActive] = React.useState(props.initialActive);
  return (
    <View>
      <IconButton
        onPress={() => {
          setActive(!active);
        }}
        style={{
          padding: 10,
          backgroundColor: active ? Theme.colors.primary : '#222121FF',
          borderColor: active ? Theme.colors.primary : Theme.colors.gray,
        }}
        icon={props.icon}
      />
    </View>
  );
};

export default InteractionButton;

const styles = StyleSheet.create({});
