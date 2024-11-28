import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import CustomText from '../../../../components/shared/CustomText';
import React from 'react';
import {Theme} from '../../../../constants/Theme';

type Props = {};

const TeamTabs = (props: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const tabs = [
    {
      title: 'Cast',
      index: 0,
    },
    {
      title: 'Writer',
      index: 1,
    },
    {
      title: 'Director',
      index: 2,
    },
  ];

  const actors = [
    {
      name: 'Morgan Freeman',
      role: 'Ellis Boyd Redding',
      image:
        'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/47162_v9_bc.jpg',
    },
    {
      name: 'Tim Robbins',
      role: 'Andy Dufresne',
      image:
        'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/47162_v9_bc.jpg',
    },
    {
      name: 'Bob Gunton',
      role: 'Warden Norton',
      image:
        'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/47162_v9_bc.jpg',
    },
    {
      name: 'William Sadler',
      role: 'Heywood',
      image:
        'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/47162_v9_bc.jpg',
    },
    {
      name: 'Clancy Brown',
      role: 'Captain Hadley',
      image:
        'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/47162_v9_bc.jpg',
    },
    {
      name: 'Gil Bellows',
      role: 'Tommy',
      image:
        'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/47162_v9_bc.jpg',
    },
  ];
  return (
    <View style={{gap: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 18,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {tabs.map((tab, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              <Pressable
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                }}
                onPress={() => {
                  setCurrentIndex(index);
                }}>
                <CustomText
                  text={tab.title}
                  weight="bold"
                  style={{
                    color: 'white',
                  }}
                />
                <View
                  style={{
                    backgroundColor:
                      currentIndex === index ? 'white' : 'transparent',
                    height: 2,
                  }}></View>
              </Pressable>
              {index !== tabs.length - 1 && (
                <View style={styles.tabSeperator}></View>
              )}
            </View>
          ))}
        </View>
        <Pressable>
          <CustomText
            text="See All"
            style={{
              color: Theme.colors.white,
              fontSize: Theme.fontSizes.xs,
            }}
            weight="light"
          />
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
        }}>
        {actors.map((actor, index) => (
          <View style={{gap: 5, width: 105}} key={index}>
            <Image
              source={{
                uri: actor.image,
              }}
              style={{
                borderRadius: 12,
                width: 105,
                height: 100,
                resizeMode: 'stretch',
              }}
            />
            <View>
              <CustomText
                text={actor.name}
                style={{color: 'white', fontSize: Theme.fontSizes.xs}}
              />
              <CustomText
                text={actor.role}
                style={{
                  color: Theme.colors.gray,
                  fontSize: Theme.fontSizes['2xs'],
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TeamTabs;

const styles = StyleSheet.create({
  tabSeperator: {
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: Theme.colors.gray,
    width: 3,
    height: 3,
    borderRadius: 3,
    marginVertical: 3,
  },
});
