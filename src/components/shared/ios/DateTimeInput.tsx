import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

const DateTimeInputIos = (props: Props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState(
    new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
  );

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 30,
        borderColor: Theme.colors.primary,
        gap: 10,
      }}>
      <IconMaterialIcons name="date-range" size={32} color="white" />

      <CustomText
        text={`${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`}
        style={{color: Theme.colors.white}}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.centeredView}>
          <View
            style={{
              borderColor: Theme.colors.primary,
              borderWidth: 2,
              backgroundColor: Theme.colors.sambucus,
              borderRadius: 36,
            }}>
            <Pressable
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingTop: 12,
                paddingRight: 12,
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  padding: 4,
                  backgroundColor: Theme.colors.primary,
                  borderRadius: 100,
                }}>
                <IconMaterialIcons name="close" size={18} color="white" />
              </TouchableOpacity>
            </Pressable>
            <DateTimePicker
              value={date}
              display={Platform.select({ios: 'inline', android: 'calendar'})}
              onChange={(
                event: DateTimePickerEvent,
                selectedDate: Date | undefined,
              ) => {
                const newDate = selectedDate || date;
                setDate(newDate);
              }}
              themeVariant="dark"
              accentColor={Theme.colors.primary}
              maximumDate={
                new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000)
              }
            />
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
};

export default DateTimeInputIos;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
