import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextButton from '../../../components/shared/Buttons/CustomTextButton';
import {Theme} from '../../../utils/theme';

type Props = {
  handleSubmit: () => void;
};

const RegisterButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.registerButton}>
      {loading ? (
        <View
          style={{
            backgroundColor: 'black',
            paddingHorizontal: 24,
          }}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      ) : (
        <View style={{backgroundColor: 'black'}}>
          <CustomTextButton
            border={true}
            text="Register"
            backgroundColor="black"
            paddingHorizontal={48}
            onPress={async () => {
              props.handleSubmit();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default RegisterButton;

const styles = StyleSheet.create({
  registerButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 6,
  },
});
