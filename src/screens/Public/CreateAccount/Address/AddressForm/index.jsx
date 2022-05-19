import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Steps, Dropdown, useToast } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import states from '@utils/states';
import Geolocation from 'react-native-geolocation-service';
import { useNetInfo } from '@react-native-community/netinfo';
import { Title2 } from '@components/typography';
import { useTheme } from '@theme';

function AddressForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(false);
  const [loadingZipCode, setLoadingZipCode] = useState(false);
  const [loadingCoordinates, setLoadingCoordinates] = useState(false);
  const netInfo = useNetInfo();
  const toast = useToast();
  const { colors } = useTheme();

  function validZipCode(value) {
    const zipCode = value.replace(/\D/g, '');
    if (zipCode.length < 8) {
      return false;
    }
    return true;
  }

  const schema = Yup.object().shape({
    zipCode: Yup.string().test(
      'validZipCode',
      t('translations:zipCodeError'),
      (value) => {
        if (value) {
          return validZipCode(value);
        }
        return true;
      },
    ),
    coordinates: Yup.string(),
    latitude: Yup.string(),
    longitude: Yup.string(),
    city: Yup.string().required(t('translations:requiredError')),
    state: Yup.string().required(t('translations:requiredError')),
  });

  const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      paddingRight: 8,
      flex: 1,
    },
    button: {
      width: 160,
      marginTop: 16,
    },
    marginButton: { marginBottom: 8 },
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      zipCode: '',
      coordinates: '',
      latitude: '',
      longitude: '',
      city: '',
      state: '',
    },
  });

  const formValues = getValues();

  const handleSetState = (value) => {
    setSelectedOption(value);
    if (value) {
      setValue('state', value.toLocaleUpperCase(), {
        shouldValidate: true,
      });
    }
  };

  const handleZipCode = async () => {
    setLoadingZipCode(true);
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      const zipCode = formValues.zipCode.replace(/\D/g, '');
      await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro === 'true') {
            toast.error(t('translations:invalidZipCode'));
          } else {
            setValue('city', data.localidade, {
              shouldValidate: true,
            });
            handleSetState(data.uf.toLocaleLowerCase());
          }
        });
    } else {
      toast.error(t('translations:noInternet'));
    }
    setLoadingZipCode(false);
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
      ToastAndroid.show(t('translations:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('translations:revokedPermission'), ToastAndroid.LONG);
    }

    return false;
  };

  const handleCoordinates = async () => {
    setLoadingCoordinates(true);
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setValue('coordinates', t('translations:noPermission'));
      setValue('latitude', '');
      setValue('longitude', '');
      toast.error(t('translations:gpsPermission'));
      setLoadingCoordinates(false);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setValue(
          'coordinates',
          `${t('translations:lat')}${position.coords.latitude} ${t(
            'translations:long',
          )}${position.coords.longitude}`,
        );
        setValue('latitude', position.coords.latitude);
        setValue('longitude', position.coords.longitude);
      },
      (error) => {
        if (error.code !== 3) {
          toast.error(
            `${t('translations:code')} ${error.code} - ${error.message}`,
          );
        }
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
    setLoadingCoordinates(false);
  };

  return (
    <>
      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="zipCode"
            label={t('translations:zipCode')}
            placeholder={t('translations:zipCodePlaceholder')}
            errorMessage={errors.zipCode?.message}
            control={control}
            keyboardType="numeric"
            returnKeyType="done"
            maskType="zipCode"
            maxLength={10}
          />
        </View>
        <Button
          style={styles.button}
          disabled={formValues?.zipCode.length !== 10}
          loading={loadingZipCode}
          onPress={() => handleZipCode()}
          title={loadingZipCode ? '' : t('translations:research')}
        />
      </View>

      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="coordinates"
            label={t('translations:coordinates')}
            errorMessage={errors.coordinates?.message}
            control={control}
            editable={false}
            multiline
          />
        </View>
        <Button
          style={styles.button}
          loading={loadingCoordinates}
          onPress={() => handleCoordinates()}
          title={loadingCoordinates ? '' : t('translations:research')}
        />
      </View>
      <View style={styles.marginButton}>
        <Title2 color={colors.primary}>
          {t('translations:houseCoordinates')}
        </Title2>
      </View>
      <Dropdown
        name="state"
        label={t('translations:requiredState')}
        value={selectedOption}
        setValue={(value) => handleSetState(value)}
        data={states}
        error={errors.state?.message}
        control={control}
        search
        searchPlaceholder={t('translations:searchState')}
        mode="top"
      />

      <Form.TextInput
        name="city"
        label={t('translations:requiredCity')}
        placeholder={t('translations:cityPlaceholder')}
        errorMessage={errors.city?.message}
        control={control}
        returnKeyType="next"
      />

      <Footer>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={
            isSubmitting
              ? t('translations:creatingAccount')
              : t('translations:createAccount')
          }
        />
        <Steps total={2} active={1} />
      </Footer>
    </>
  );
}

AddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

AddressForm.defaultProps = {
  isSubmitting: false,
};

export default AddressForm;
