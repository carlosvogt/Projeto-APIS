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
} from 'react-native';
import { useTheme } from '@theme';
import MapView, { Circle } from 'react-native-maps';
import { Header } from '@components/layout';
import { useTranslation } from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import { Title1 } from '@components/typography';

function MortalityMap() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [permission, setPermission] = useState(false);

  const [userLocalization, setUserLocalization] = useState({});
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    view: {
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });

  // Dados mocados
  const data = [
    {
      cod: '0',
      latitude: '-29.541942',
      longitude: '-52.514808',
    },
    {
      cod: '1',
      latitude: '-29.544985',
      longitude: '-52.512835',
    },
    {
      cod: '2',
      latitude: '-29.543594',
      longitude: '-52.502483',
    },
    {
      cod: '3',
      latitude: '-29.544390',
      longitude: '-52.488364',
    },
    {
      cod: '4',
      latitude: '-29.566150',
      longitude: '-52.575366',
    },
  ];

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      setPermission(true);
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(t('apiariesMap:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('apiariesMap:revokedPermission'), ToastAndroid.LONG);
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
  }, [data]);

  function onRegionChange(region) {
    setUserLocalization(region);
  }

  return (
    <>
      <Header title={t('apiariesMap:name')} />
      {permission ? (
        <View style={styles.container}>
          {userLocalization.latitude && (
            <MapView
              style={{ flex: 1 }}
              showsUserLocation
              initialRegion={userLocalization}
              onRegionChange={onRegionChange}
              moveOnMarkerPress={false}
            >
              {data.map((item) => {
                return (
                  <View key={item.cod}>
                    <Circle
                      center={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                      }}
                      radius={1500}
                      fillColor={colors.errorLight}
                      strokeColor={colors.error}
                    />
                  </View>
                );
              })}
            </MapView>
          )}
        </View>
      ) : (
        <View style={styles.view}>
          <Title1 centered color={colors.error} family="medium">
            {t('mortalityMap:noPermission')}
          </Title1>
        </View>
      )}
    </>
  );
}
export default MortalityMap;
