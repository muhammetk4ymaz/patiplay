import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {Theme} from '../../../utils/theme';

import {Drawer} from 'react-native-drawer-layout';
import VideoPlayer from '../../../components/shared/VideoPlayer/VideoPlayer';
import {setInteractionSectionVisible} from '../../../redux/features/interaction/interactionSlice';
import InteractionInputs from './components/InteractionInputs';
import InteractionSection from './components/InteractionSection';
import LoadingWidget from '../../../components/shared/LoadingWidget';

const MovieView = () => {
  const [loading, setLoading] = useState(true);

  const interactionSectionVisible = useAppSelector(
    state => state.interaction.interactionSectionVisible,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <View style={{flex: 1}}>
        <Drawer
          drawerPosition="right"
          drawerType="slide"
          open={interactionSectionVisible}
          onOpen={() => {
            dispatch(setInteractionSectionVisible(true));
          }}
          onClose={() => {
            dispatch(setInteractionSectionVisible(false));
          }}
          renderDrawerContent={() => {
            return <InteractionSection />;
          }}>
          <VideoPlayer />
        </Drawer>
        <InteractionInputs />
      </View>
    );
  }
};

export default MovieView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
  },
});
