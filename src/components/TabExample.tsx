import React from 'react';
import {View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
import TitlesChartsView from '../views/dashboard/patiplay/charts/TitlesChartsView';
import CompaniesChartsView from '../views/dashboard/patiplay/charts/CompaniesChartsView';

const {width: WINDOW_WIDTH} = Dimensions.get('window');

export class TabExample extends React.PureComponent {
  state = {
    activeTab: 0,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(WINDOW_WIDTH),
    tabsHeights: [0, 0],
  };

  handleSlide = type => {
    const {translateX, translateXTabOne, translateXTabTwo} = this.state;

    Animated.spring(translateX, {
      toValue: type,
      useNativeDriver: true,
    }).start();

    if (type === this.state.xTabOne) {
      this.setState({activeTab: 0});
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateXTabTwo, {
          toValue: WINDOW_WIDTH,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      this.setState({activeTab: 1});
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -WINDOW_WIDTH,
          useNativeDriver: true,
        }),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  render() {
    const {
      activeTab,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      tabsHeights,
    } = this.state;

    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 36,
            position: 'relative',
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              width: '50%',
              height: 2,
              bottom: 0,
              left: 0,
              backgroundColor: '#007aff',
              transform: [{translateX}],
            }}
          />
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onLayout={event =>
              this.setState({xTabOne: event.nativeEvent.layout.x})
            }
            onPress={() => this.handleSlide(xTabOne)}>
            <Text style={{color: activeTab === 0 ? 'black' : 'silver'}}>
              Tab One
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onLayout={event =>
              this.setState({xTabTwo: event.nativeEvent.layout.x})
            }
            onPress={() => this.handleSlide(xTabTwo)}>
            <Text style={{color: activeTab === 1 ? 'black' : 'silver'}}>
              Tab Two
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: 'red',
            height: tabsHeights[activeTab],
          }}>
          <Animated.View
            style={{transform: [{translateX: translateXTabOne}]}}
            onLayout={event =>
              this.setState({
                tabsHeights: [
                  event.nativeEvent.layout.height,
                  this.state.tabsHeights[1],
                ],
              })
            }>
            <TitlesChartsView title="red" />
          </Animated.View>

          <Animated.View
            style={{
              transform: [{translateX: translateXTabTwo}],
            }}
            onLayout={event =>
              this.setState({
                tabsHeights: [
                  this.state.tabsHeights[0],
                  event.nativeEvent.layout.height,
                ],
              })
            }>
            <CompaniesChartsView />
          </Animated.View>
        </View>
      </View>
    );
  }
}
