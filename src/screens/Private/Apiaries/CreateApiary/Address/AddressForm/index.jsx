import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Steps, Dropdown, Modal } from '@components';
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

function AddressForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(false);
  const [loadingZipCode, setLoadingZipCode] = useState(false);
  const [loadingCoordinates, setLoadingCoordinates] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const netInfo = useNetInfo();

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
      t('formErrors:zipCode'),
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
    city: Yup.string().required(t('formErrors:required')),
    state: Yup.string().required(t('formErrors:required')),
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
      width: 120,
      marginTop: 16,
    },
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
          setValue('city', data.localidade, {
            shouldValidate: true,
          });
          handleSetState(data.uf.toLocaleLowerCase());
        });
    } else {
      setDescription(t('updatePersonalInfo:noInternet'));
      setShowModal(true);
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
      ToastAndroid.show(t('createApiary:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('createApiary:revokedPermission'), ToastAndroid.LONG);
    }

    return false;
  };

  const handleCoordinates = async () => {
    setLoadingCoordinates(true);
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setValue('coordinates', t('createApiary:noPermission'));
      setValue('latitude', '');
      setValue('longitude', '');
      setDescription(t('createApiary:gpsPermission'));
      setLoadingCoordinates(false);
      setShowModal(true);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setValue(
          'coordinates',
          `${t('createApiary:lat')}${position.coords.latitude} ${t(
            'createApiary:long',
          )}${position.coords.longitude}`,
        );
        setValue('latitude', position.coords.latitude);
        setValue('longitude', position.coords.latitude);
      },
      (error) => {
        setDescription(
          `${t('createApiary:code')} ${error.code} - ${error.message}`,
        );
        setShowModal(true);
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
      <Modal
        title={t('createAccount:attention')}
        cancelFunction={() => setShowModal(false)}
        cancelText={t('createAccount:ok')}
        description={description}
        mode="alert"
        showModal={showModal}
      />
      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="zipCode"
            label={t('createApiary:zipCode')}
            placeholder={t('createApiary:zipCodePlaceholder')}
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
          title={loadingZipCode ? '' : t('createApiary:research')}
        />
      </View>

      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="coordinates"
            label={t('createApiary:coordinates')}
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
          title={loadingCoordinates ? '' : t('createApiary:research')}
        />
      </View>

      <Dropdown
        name="state"
        label={t('createApiary:state')}
        value={selectedOption}
        setValue={(value) => handleSetState(value)}
        data={states}
        error={errors.state?.message}
        control={control}
        search
        searchPlaceholder={t('createApiary:search')}
        mode="top"
      />

      <Form.TextInput
        name="city"
        label={t('createApiary:city')}
        placeholder={t('createApiary:cityPlaceholder')}
        errorMessage={errors.city?.message}
        control={control}
        returnKeyType="next"
      />

      <Footer>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={
            isSubmitting ? t('createApiary:creating') : t('createApiary:create')
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
