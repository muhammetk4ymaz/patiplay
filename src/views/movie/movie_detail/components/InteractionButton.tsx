import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Theme} from '../../../../utils/theme';
import IconButton from '../../../../components/shared/Buttons/IconButton';
import networkService from '../../../../helpers/networkService';

type Props = {
  icon: React.JSX.Element;
  value?: boolean;
  onPress?: () => void;
  uuid?: string;
  type: string;
  endpoint: string;
};

const InteractionButton = (props: Props) => {
  const [value, setValue] = React.useState(props.value);
  return (
    <View>
      <IconButton
        onPress={async () => {
          try {
            const response = await networkService.post(
              `title/api/${props.endpoint}-buttons/`,
              {
                type: props.type,
                uuid: props.uuid,
              },
            );

            if (response.status === 200) {
              console.log(props.type, response.data);
              setValue(!value);
            }
          } catch (error) {
            console.log(error);
          }
        }}
        style={{
          padding: Theme.paddings.interactionButtonPadding,
          backgroundColor: value ? Theme.colors.primary : '#222121FF',
          borderColor: value ? Theme.colors.primary : Theme.colors.gray,
        }}
        icon={props.icon}
      />
    </View>
  );
};

export default InteractionButton;

const styles = StyleSheet.create({});
