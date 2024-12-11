import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import {decrement, increment} from '../../redux/features/counter/counterSlice';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';

type Props = {};

const ExampleView = (props: Props) => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CustomTextButton
        text="Arttır"
        onPress={() => {
          dispatch(increment());
        }}
      />
      <Text>{count}</Text>
      <CustomTextButton
        text="Azalt"
        onPress={() => {
          dispatch(decrement());
        }}
      />
    </View>
  );
};

export default ExampleView;

const styles = StyleSheet.create({});
