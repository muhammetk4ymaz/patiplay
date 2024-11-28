import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
// import {Modal} from 'react-native-paper';

const ModalComponent = (props: any) => {
  // console.log(ModalComponent.name, 'rendered');
  return (
    <Modal
      visible={props.modalVisible}
      transparent={true}
      animationType="slide"
      // contentContainerStyle={styles.modal}
      children={
        <TouchableWithoutFeedback onPress={() => props.onDismiss()}>
          <View style={styles.modal}>
            <View
              style={[
                styles.modalContent,
                {
                  width: props.width || '40%',
                },
              ]}>
              {props.children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      }></Modal>
  );
};

export default React.memo(ModalComponent);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 8,
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
