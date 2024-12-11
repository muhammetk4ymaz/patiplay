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

const FollowButton = (props: Props) => {
  const [followed, setFollowed] = React.useState(props.initialValue);
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          const response = await networkService.post(
            `title/api/${props.endpoint}-action/`,
            {
              network: followed ? 'remove' : 'add',
              name: props.uuid,
            },
          );

          if (response.status === 200) {
            console.log('Follow', response.data);
            setFollowed(!followed);
          }
        } catch (error) {
          console.log(error);
        }
      }}>
      <LinearGradient
        colors={!followed ? ['#8b5cf6', '#a855f7'] : ['transparent']} // from violet-500 to purple-500
        style={{
          borderColor: followed ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
          borderWidth: followed ? 1 : 0,
          paddingHorizontal: 12,
          paddingVertical: 12,
          borderRadius: 36,
        }}>
        <CustomText
          text={followed ? 'Remove to Follow' : 'Follow'}
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

export default FollowButton;

const styles = StyleSheet.create({});
