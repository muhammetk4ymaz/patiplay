import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import {ImageManager} from '../../constants/ImageManager';
import networkService from '../../helpers/networkService';
import {RootStackParamList} from '../../navigation/routes';
import {Theme} from '../../utils/theme';

type Props = {};

const PackagesView = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(true);
  const [packages, setPackages] = React.useState<any[]>([]);
  const [selectedPackageIndex, setSelectedPackageIndex] =
    React.useState<number>();

  React.useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await networkService.get('title/api/package/');
        setPackages(response.data.packages);
      } catch (error) {}
    };

    fetchPackages();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.view,
        {paddingTop: insets.top + 50, paddingBottom: insets.bottom},
      ]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard
        icon={
          <Image
            source={ImageManager.IMAGE_NAMES.PATILOGOWHIE}
            style={{height: 100, width: 100}}
          />
        }>
        <View style={{gap: 24}}>
          <View
            style={{
              gap: 8,
              flexDirection: 'row',
            }}>
            {packages.map((packageItem, index) => (
              <PackagesItem
                packageItem={packageItem}
                key={index}
                active={selectedPackageIndex === index}
                onPress={() => setSelectedPackageIndex(index)}
              />
            ))}
          </View>
          {selectedPackageIndex !== undefined && (
            <View style={{gap: 24}}>
              <CustomText
                text={'All Packages'}
                style={{color: 'white', textAlign: 'center', opacity: 0.5}}
              />
              <View style={{gap: 8}}>
                {packages[selectedPackageIndex].features.map(
                  (feature: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        backgroundColor: 'rgba(40,40,40,0.8)',
                      }}>
                      <CustomText
                        text={feature.value}
                        style={{color: 'white'}}
                      />
                    </View>
                  ),
                )}
              </View>
            </View>
          )}
          <View style={{gap: 8}}>
            <View style={{alignSelf: 'center'}}>
              <CustomTextButton
                text={'Continue'}
                onPress={() => {}}
                textColor="white"
                paddingHorizontal={36}
                paddingVertical={8}
              />
            </View>
            <View style={{alignSelf: 'center'}}>
              <CustomTextButton
                text={'Previous'}
                backgroundColor="transparent"
                onPress={() => {
                  navigation.goBack();
                }}
                textColor="rgba(255,255,255,0.5)"
                paddingHorizontal={36}
                paddingVertical={8}
              />
            </View>
          </View>
        </View>
      </ContentWithIconCard>
    </ScrollView>
  );
};

export default PackagesView;

type PackagesItemProps = {
  packageItem: any;
  active: boolean;
  onPress: () => void;
};

const PackagesItem = (props: PackagesItemProps) => {
  return (
    <View style={{gap: 12, flex: 1}}>
      <LinearGradient
        colors={
          props.active ? ['#8b5cf6', '#a855f7'] : ['transparent', 'transparent']
        }
        style={{
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: props.active ? 'transparent' : 'white',
          borderRadius: 36,
          alignItems: 'center',
        }}>
        <CustomText text={props.packageItem.type} style={{color: 'white'}} />
      </LinearGradient>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}>
        <LinearGradient
          colors={
            props.active
              ? ['#8b5cf6', '#a855f7']
              : ['rgba(40,40,40,1)', 'rgba(40,40,40,0.8))']
          }
          style={{
            alignItems: 'center',
            borderRadius: 8,
            paddingVertical: 24,
          }}>
          <CustomText
            text={props.packageItem.hours + '\nWatch Hours'}
            style={{color: 'white', textAlign: 'center'}}
          />
          <CustomText
            text={'$' + props.packageItem.price}
            weight="bold"
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          />
        </LinearGradient>
      </TouchableOpacity>
      <CustomText
        text={props.packageItem.campain}
        style={{color: 'white', textAlign: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
  },
});
