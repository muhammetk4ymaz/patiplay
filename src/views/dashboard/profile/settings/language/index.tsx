import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../../constants/Theme';
import {useTranslation} from 'react-i18next';
import '../../../index';
import CustomText from '../../../../../components/shared/CustomText';
import i18n from '../../../../../i18n';

type Props = {};

const LanguageView = (props: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={{
          padding: 12,
        }}
        onPress={() => {
          i18n.changeLanguage('tr');
        }}>
        <CustomText
          text={t('common:actions.toggleToTurkish')}
          style={{
            color: Theme.colors.white,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 12,
        }}
        onPress={() => {
          i18n.changeLanguage('en');
        }}>
        <CustomText
          text={t('common:actions.toggleToEnglish')}
          style={{
            color: Theme.colors.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LanguageView;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 12,
  },
});
