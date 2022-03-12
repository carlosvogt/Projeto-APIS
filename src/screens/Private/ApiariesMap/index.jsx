/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  Text,
} from 'react-native';
import { useTheme } from '@theme';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { Header } from '@components/layout';
import { useTranslation } from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import { useToast } from '@components';
import { useNavigation } from '@react-navigation/native';

function ApiariesMapScreen() {
  const { t } = useTranslation();
  const toast = useToast();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [userLocalization, setUserLocalization] = useState({});
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

  // Dados mocados
  const apiaries = [
    {
      code: 0,
      type: 'home',
      name: 'Casa do mel',
      latitude: '-29.541942',
      longitude: '-52.514808',
    },
    {
      code: 1,
      type: 'apiary',
      name: 'Erni',
      latitude: '-29.544985',
      longitude: '-52.512835',
      city: 'Sinimbu',
      coordinates: '1000000019000',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '2000',
      totalPayed: '300',
      mortality: 'Sim',
      notes: [
        {
          code: 1,
          name: 'Anotação 1',
          note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
        },
        {
          code: 2,
          name: 'Anotação 2',
          note: 'Aqui o texto será escrito de forma integral',
        },
        {
          code: 3,
          name: '',
          note: 'Aqui o texto será escrito de forma integral aaa',
        },
      ],
      production: [
        {
          code: 1,
          name: 'Safra 2019',
          date: '15/01/2020',
          qtd: '500',
          payed: 'Sim',
          payedQtd: '150',
        },
        {
          code: 2,
          name: 'Safra 2020',
          date: '15/01/2020',
          qtd: '1500',
          payed: 'Sim',
          payedQtd: '150',
        },
      ],
    },
    {
      code: 2,
      type: 'death',
      name: 'Valdir',
      latitude: '-29.543594',
      longitude: '-52.502483',
      city: 'Sinimbu',
      coordinates: '1000000019000',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '1000',
      totalPayed: '50',
      mortality: 'Sim',
      notes: [
        {
          code: 1,
          name: 'Anotação 1',
          note: 'Aqui o texto será escrito de forma integral para facilitar a vida do apicultor',
        },
      ],
      production: [
        {
          code: 1,
          name: 'Safra 2019',
          date: '15/01/2020',
          qtd: '500',
          payed: '',
          payedQtd: '50',
        },
        {
          code: 2,
          name: 'Safra 2020',
          date: '15/01/2020',
          qtd: '500',
          payed: 'Sim',
          payedQtd: '',
        },
      ],
    },
    {
      code: 3,
      type: 'apiary',
      name: 'Nelson',
      latitude: '-29.544390',
      longitude: '-52.488364',
      city: 'Sinimbu',
      coordinates: '1000000019000',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '0',
      totalPayed: '0',
      mortality: 'Não',
      notes: [],
      production: [],
    },
    {
      code: 4,
      type: 'apiary',
      name: 'Klein',
      latitude: '-29.566150',
      longitude: '-52.575366',
      city: 'Sinimbu',
      coordinates: '1000000019000',
      zipCode: '96890000',
      state: 'RS',
      quantityFull: '50',
      totalPlaces: '55',
      owner: 'Carlos Vogt',
      phone: '(51) 9 9999-9999',
      ownerPercent: '5',
      total: '0',
      totalPayed: '0',
      mortality: 'Não',
      notes: [],
      production: [],
    },
  ];

  const handleToApiary = (type, index) => {
    if (type === 'home') {
      navigation.navigate('ProfileNavigator', {
        screen: 'UpdatePersonalInfo',
      });
    } else {
      navigation.navigate('ApiaryNavigation', {
        screen: 'ApiaryHome',
        params: { ...apiaries[index] },
      });
    }
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocalization({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setUserLocalization({});
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, [apiaries, toast]);

  function onRegionChange(region) {
    setUserLocalization(region);
  }

  return (
    <>
      <Header title={t('apiariesMap:name')} />
      <View style={styles.container}>
        {userLocalization.latitude && (
          <MapView
            style={{ flex: 1 }}
            showsUserLocation
            initialRegion={userLocalization}
            onRegionChange={onRegionChange}
          >
            {apiaries.map((item, index) => {
              return (
                <View key={item.code}>
                  <Marker
                    coordinate={{
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude),
                    }}
                    pinColor={
                      item.type === 'apiary'
                        ? colors.primary
                        : item.type === 'home'
                        ? colors.success
                        : colors.error
                    }
                  >
                    <Callout onPress={() => handleToApiary(item.type, index)}>
                      <Text style={{ color: colors.primary }}>{item.name}</Text>
                    </Callout>
                  </Marker>
                  {item.type !== 'home' && (
                    <Circle
                      center={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                      }}
                      radius={1500}
                      fillColor={
                        item.type === 'apiary'
                          ? colors.primaryLight
                          : colors.errorLight
                      }
                      strokeColor={
                        item.type === 'apiary' ? colors.primary : colors.error
                      }
                    />
                  )}
                </View>
              );
            })}
          </MapView>
        )}
      </View>
    </>
  );
}
export default ApiariesMapScreen;
