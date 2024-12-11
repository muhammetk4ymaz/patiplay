import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Theme} from '../../../utils/theme';
import AvatarGroupComponent from '../AvatarGroupComponent';
import CustomText from '../CustomText';
import VerticalPoster from '../VerticalPoster';

type Props = {
  item: any;
};

const OnlyHereItem = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
      }}>
      <View style={{flex: 5}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <VerticalPoster
            posterPath={props.item.poster_path}
            width={'80%'}
            style={{
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 10},
              shadowRadius: Theme.titlePosterRadius,
              elevation: 5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 7,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 24,
          }}>
          <CustomText
            text={props.item.title}
            weight="bold"
            style={{color: 'white', fontSize: Theme.fontSizes.lg}}
          />
          <CustomText
            numberOfLines={3}
            text={props.item.overview}
            style={{
              color: 'white',
              fontSize: Theme.fontSizes.sm,
              opacity: 0.5,
              marginBottom: 12,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
            }}>
            <AvatarGroupComponent />
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(OnlyHereItem);

const styles = StyleSheet.create({});
