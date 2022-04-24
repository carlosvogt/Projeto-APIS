/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Text,
} from 'react-native';
import { useTheme } from '@theme';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { Header } from '@components/layout';
import { useTranslation } from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Title1 } from '@components/typography';
import { Modal, useToast } from '@components';
import { useNetInfo } from '@react-native-community/netinfo';
import { userUid } from '@store/auth';
import { useSelector } from 'react-redux';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '@services/firebase';
import { accountInfo } from '@store/accountData';

function ApiariesMapScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [userLocalization, setUserLocalization] = useState({});
  const [permission, setPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const netInfo = useNetInfo();
  const userUuid = useSelector(userUid);
  const [apiaries, setApiaries] = useState([]);
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const userInformation = useSelector(accountInfo);
  const originMap = true;
  const { params } = useRoute();
  const [controller, setController] = useState(false);

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
    legendItem: {
      marginHorizontal: 8,
      paddingBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    legendContainer: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    legendIcon: {
      width: 10,
      height: 10,
      borderRadius: 10,
      marginRight: 4,
    },
  });

  useEffect(() => {
    if (params?.reload === true) {
      setController(!controller);
    }
  }, [params]);

  const getData = async () => {
    setRefreshing(true);
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      try {
        const querySnapshot = query(
          collection(db, `users/${userUuid}/apiaries`),
        );
        const docsSnap = await getDocs(querySnapshot);
        setApiaries([]);
        docsSnap.forEach((item) => {
          setApiaries((oldArray) => [...oldArray, item.data()]);
        });
        setApiaries((oldArray) => [...oldArray, userInformation]);
      } catch (error) {
        toast.error(error.code);
      }
    } else {
      toast.error(t('translations:noInternet'));
    }
    setRefreshing(false);
  };

  useEffect(() => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet !== null) {
      getData();
    }
  }, [netInfo, controller]);

  const handleToApiary = (type, index) => {
    if (type === 'home') {
      navigation.navigate('ProfileNavigator', {
        screen: 'UpdatePersonalInfo',
      });
    } else {
      navigation.navigate('ApiaryNavigation', {
        screen: 'ApiaryHome',
        params: { ...apiaries[index], originMap },
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
      setPermission(true);
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      setPermission(true);
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(t('translations:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('translations:revokedPermission'), ToastAndroid.LONG);
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setDescription(t('translations:gpsPermission'));
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
        setDescription(
          `${t('translations:code')} ${error.code} - ${error.message}`,
        );
        setShowModal(true);
        setUserLocalization({});
      },
      {
        accuracy: {
          android: 'high',
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
  }, [apiaries]);

  function onRegionChange(region) {
    setUserLocalization(region);
  }

  return (
    <>
      <Modal
        title={t('translations:attention')}
        cancelFunction={() => setShowModal(false)}
        cancelText={t('translations:ok')}
        description={description}
        mode="alert"
        showModal={showModal}
      />
      <Header
        title={t('translations:apiariesMap')}
        showRefreshButton
        handleRefresh={() => getData()}
        isRefreshing={refreshing}
      />

      {permission ? (
        <>
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
                    <View key={index}>
                      {item.latitude !== '' && item.longitude !== '' && (
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
                            <Callout
                              onPress={() => handleToApiary(item.type, index)}
                            >
                              <Text style={{ color: colors.primary }}>
                                {item.name}
                              </Text>
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
                                item.type === 'apiary'
                                  ? colors.primary
                                  : colors.error
                              }
                            />
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
              </MapView>
            )}
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendIcon, { backgroundColor: colors.success }]}
              />
              <Text style={{ color: colors.success }}>
                {t('translations:homeHouse')}
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendIcon, { backgroundColor: colors.primary }]}
              />
              <Text style={{ color: colors.primary }}>
                {t('translations:apiary')}
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendIcon, { backgroundColor: colors.error }]}
              />
              <Text style={{ color: colors.error }}>
                {t('translations:death')}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.view}>
          <Title1 centered color={colors.error} family="medium">
            {t('translations:noPermission')}
          </Title1>
        </View>
      )}
    </>
  );
}
export default ApiariesMapScreen;
