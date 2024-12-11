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
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      ) : (
        <CustomTextButton
          text="Kayıt Ol"
          paddingHorizontal={48}
          onPress={() => {
            props.handleSubmit();
          }}
        />
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
