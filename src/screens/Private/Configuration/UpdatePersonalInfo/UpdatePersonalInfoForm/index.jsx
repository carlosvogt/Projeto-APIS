import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
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
import { Button, Form, Dropdown, Modal } from '@components';
import { Title1, Title2 } from '@components/typography';
import Geolocation from 'react-native-geolocation-service';
import { useNetInfo } from '@react-native-community/netinfo';

function UpdatePersonalInfoForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const email = useRef();
  const phone = useRef();
  const zipCodeRef = useRef();
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

  function validPhone(value) {
    const cellphone = value.replace(/\D/g, '');
    if (cellphone.length < 10) {
      return false;
    }
    return true;
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(t('formErrors:required')),
    email: Yup.string()
      .email(t('formErrors:email'))
      .required(t('formErrors:required')),
    phone: Yup.string()
      .required(t('formErrors:required'))
      .test('validPhone', t('formErrors:phone'), (value) => {
        if (value) {
          return validPhone(value);
        }
        return true;
      }),
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
    viewTitle: {
      marginTop: 24,
      marginBottom: 16,
    },
    viewInstruction: {
      marginBottom: 24,
    },
  });

  // Dados mocados
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
      name: 'Carlos Rodrigo Vogt',
      email: 'carlosvogt15@gmail.com',
      phone: '(51) 99688-2190',
      zipCode: '96.890-000',
      coordinates: 'Latitude:-29.5420433 Longitude:-52.5148017',
      latitude: '-29.5420433',
      longitude: '-52.5148017',
      city: 'Sinimbu',
      state: 'RS',
    },
  });

  const formValues = getValues();

  const [defaultState, setDefaultState] = useState(
    formValues.state.toLocaleLowerCase(),
  );

  const handleSetState = (value) => {
    setSelectedOption(value);
    setDefaultState(null);
    setValue('state', value.toLocaleUpperCase(), {
      shouldValidate: true,
    });
  };

  useState(() => {
    handleSetState(defaultState);
  }, []);

  const handleZipCode = () => {
    setLoadingZipCode(true);
    const hasInternet = netInfo.isConnected;

    if (hasInternet) {
      const zipCode = formValues.zipCode.replace(/\D/g, '');
      fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
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
      ToastAndroid.show(
        t('updatePersonalInfo:locationDenied'),
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        t('updatePersonalInfo:revokedPermission'),
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const handleCoordinates = async () => {
    setLoadingCoordinates(true);
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setValue('coordinates', t('updatePersonalInfo:noPermission'));
      setValue('latitude', '');
      setValue('longitude', '');
      setDescription(t('updatePersonalInfo:gpsPermission'));
      setLoadingCoordinates(false);
      setShowModal(true);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setValue(
          'coordinates',
          `${t('updatePersonalInfo:lat')}${position.coords.latitude} ${t(
            'updatePersonalInfo:long',
          )}${position.coords.longitude}`,
        );
        setValue('latitude', position.coords.latitude);
        setValue('longitude', position.coords.latitude);
      },
      (error) => {
        setDescription(
          `${t('updatePersonalInfo:code')} ${error.code} - ${error.message}`,
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
        title={t('updatePersonalInfo:attention')}
        cancelFunction={() => setShowModal(false)}
        cancelText={t('updatePersonalInfo:ok')}
        description={description}
        mode="alert"
        showModal={showModal}
      />
      <View style={styles.viewTitle}>
        <Title1 family="medium">{t('updatePersonalInfo:personalData')}</Title1>
      </View>
      <View style={styles.viewInstruction}>
        <Title2>{t('createAccount:requiredInfo')}</Title2>
      </View>

      <Form.TextInput
        name="name"
        label={t('createAccount:name')}
        errorMessage={errors.name?.message}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => email.current.focus()}
      />
      <Form.TextInput
        inputRef={email}
        name="email"
        label={t('createAccount:email')}
        errorMessage={errors.email?.message}
        control={control}
        returnKeyType="next"
        keyboardType="email-address"
        onSubmitEditing={() => phone.current.focus()}
      />
      <Form.TextInput
        name="phone"
        inputRef={phone}
        maskType="phone"
        maxLength={15}
        keyboardType="numeric"
        label={t('createAccount:phone')}
        errorMessage={errors.phone?.message}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => zipCodeRef.current.focus()}
      />
      <View style={styles.viewTitle}>
        <Title1 family="medium">{t('updatePersonalInfo:address')}</Title1>
      </View>

      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            inputRef={zipCodeRef}
            name="zipCode"
            label={t('createAccount:zipCode')}
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
          title={loadingZipCode ? '' : t('createAccount:research')}
        />
      </View>

      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="coordinates"
            label={t('createAccount:coordinates')}
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
          title={loadingCoordinates ? '' : t('createAccount:research')}
        />
      </View>

      <Form.TextInput
        name="city"
        label={t('createAccount:city')}
        errorMessage={errors.city?.message}
        control={control}
        returnKeyType="next"
      />

      <Dropdown
        name="state"
        label={t('createAccount:state')}
        value={selectedOption}
        setValue={(value) => handleSetState(value)}
        data={states}
        error={errors.state?.message}
        control={control}
        search
        searchPlaceholder={t('createAccount:search')}
        mode="top"
        defaultValue={defaultState}
      />

      <Footer>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={
            isSubmitting
              ? t('updatePersonalInfo:saving')
              : t('updatePersonalInfo:save')
          }
        />
      </Footer>
    </>
  );
}

UpdatePersonalInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

UpdatePersonalInfoForm.defaultProps = {
  isSubmitting: false,
};

export default UpdatePersonalInfoForm;
