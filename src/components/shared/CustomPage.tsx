import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Theme} from '../../utils/theme';
import HeaderBackWithTitle from './ios/HeaderBackWithTitle';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {height} = Dimensions.get('window');

type Props = {
  pageName: string;
  children: React.ReactNode;
  titleInitialOpacity: number;
  animationMultiplier: number;
  isBackButton?: boolean;
  titleCenter?: boolean;
};

const CustomPage = ({
  pageName,
  children,
  titleInitialOpacity,
  animationMultiplier,
  isBackButton = false,
  titleCenter = false,
}: Props) => {
  const handleScroll = (event: any) => {
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
      useNativeDriver: false,
    })(event);
  };

  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      navigation.setOptions({
        headerTitle: titleCenter ? pageName : '',
        headerLeft: () => {
          if (isBackButton) {
            if (titleCenter) {
              return null;
            }
            return <HeaderBackWithTitle title={pageName} />;
          }
          return (
            <Animated.Text
              style={{
                fontFamily: 'HelveticaNeue-Medium',
                fontSize: Theme.appBarTitleFontSize,
                color: 'white',
                textAlign: 'left',
                opacity: scrollY.interpolate({
                  inputRange: [0, height * 0.2],
                  outputRange: [titleInitialOpacity, 1],
                  extrapolate: 'extend',
                }),
              }}>
              {pageName}
            </Animated.Text>
          );
        },
      });
    } else {
      navigation.setOptions({
        headerTitleAlign: 'left',
        headerTitle: () => (
          <Animated.Text
            style={{
              fontFamily: 'HelveticaNeue-Medium',
              fontSize: Theme.appBarTitleFontSize,
              color: 'white',
              textAlign: 'left',
              opacity: scrollY.interpolate({
                inputRange: [0, height * 0.2],
                outputRange: [titleInitialOpacity, 1],
                extrapolate: 'extend',
              }),
            }}>
            {pageName}
          </Animated.Text>
        ),
      });
    }

    navigation.setOptions({
      headerBackground() {
        return (
          <Animated.View
            style={{
              backgroundColor: 'black',
              opacity: scrollY.interpolate({
                inputRange: [0, height * animationMultiplier],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
              flex: 1,
            }}
          />
        );
      },
    });
  }, [scrollY]);

  return (
    <ScrollView
      removeClippedSubviews={true}
      style={styles.view}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
      }}
      scrollEventThrottle={16}
      overScrollMode="never"
      onScroll={handleScroll}>
      {children}
    </ScrollView>
  );
};

export default CustomPage;

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors.background,
    flex: 1,
  },
});
