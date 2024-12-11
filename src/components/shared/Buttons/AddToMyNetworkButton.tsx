import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../CustomText';
import {Theme} from '../../../utils/theme';
import networkService from '../../../helpers/networkService';

type Props = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

const AddToMyNetworkButton = (props: Props) => {
  const [added, setAdded] = React.useState(props.initialValue);
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          const response = await networkService.post(
            `title/api/${props.endpoint}-action/`,
            {
              network: added ? 'remove' : 'add',
              name: props.uuid,
            },
          );

          if (response.status === 200) {
            console.log('Network', response.data);
            setAdded(!added);
          }
        } catch (error) {
          console.log(error);
        }
      }}>
      <LinearGradient
        colors={!added ? ['#8b5cf6', '#a855f7'] : ['transparent']} // from violet-500 to purple-500
        style={{
          borderColor: added ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
          borderWidth: added ? 1 : 0,
          paddingHorizontal: 12,
          paddingVertical: 12,
          borderRadius: 36,
        }}>
        <CustomText
          text={added ? 'Remove To My Network' : 'Add To My Network'}
          style={{
            color: 'white',
            fontSize: Theme.fontSizes.sm,
            textAlign: 'center',
          }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AddToMyNetworkButton;

const styles = StyleSheet.create({});
