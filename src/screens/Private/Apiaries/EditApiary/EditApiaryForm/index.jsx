/* eslint-disable sonarjs/cognitive-complexity */
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Dropdown, Modal } from '@components';
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
import { Title1 } from '@components/typography';
import Geolocation from 'react-native-geolocation-service';
import { useNetInfo } from '@react-native-community/netinfo';

function EditApiaryForm({ onSubmit, isSubmitting, defaultData }) {
  const { t } = useTranslation();
  const owner = useRef();
  const phone = useRef();
  const totalPlaces = useRef();
  const quantityFull = useRef();
  const ownerPercent = useRef();
  const [selectedState, setSelectedState] = useState(false);
  const [selectedMortality, setSelectedMortality] = useState(false);
  const [loadingZipCode, setLoadingZipCode] = useState(false);
  const [loadingCoordinates, setLoadingCoordinates] = useState(false);
  const defaultMortality = defaultData?.mortality || '';
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const netInfo = useNetInfo();

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
  });

  function validPhone(value) {
    const cellphone = value.replace(/\D/g, '');
    if (cellphone.length < 10) {
      return false;
    }
    return true;
  }

  function validPercentage(value) {
    if (value > 100) {
      return false;
    }
    return true;
  }

  function validZipCode(value) {
    const zipCode = value.replace(/\D/g, '');
    if (zipCode.length < 8) {
      return false;
    }
    return true;
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(t('formErrors:required')),
    owner: Yup.string().required(t('formErrors:required')),
    phone: Yup.string().test('validPhone', t('formErrors:phone'), (value) => {
      if (value) {
        return validPhone(value);
      }
      return true;
    }),
    totalPlaces: Yup.string().required(t('formErrors:required')),
    quantityFull: Yup.string().required(t('formErrors:required')),
    ownerPercent: Yup.string().test(
      'validPercent',
      t('formErrors:percentage'),
      (value) => {
        if (value) {
          return validPercentage(value);
        }
        return true;
      },
    ),
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
    mortality: Yup.string(),
    city: Yup.string().required(t('formErrors:required')),
    state: Yup.string().required(t('formErrors:required')),
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
      name: defaultData?.name || '',
      owner: defaultData?.owner || '',
      phone: defaultData?.phone || '',
      totalPlaces: defaultData?.totalPlaces || '',
      quantityFull: defaultData?.quantityFull || '',
      ownerPercent: defaultData?.ownerPercent || '',
      zipCode: defaultData?.zipCode || '',
      coordinates: defaultData?.coordinates || '',
      latitude: defaultData?.latitude || '',
      longitude: defaultData?.longitude || '',
      mortality: defaultData?.mortality || '',
      city: defaultData?.city || '',
      state: defaultData?.state || '',
    },
  });

  const formValues = getValues();

  const [defaultState, setDefaultState] = useState(
    formValues.state.toLocaleLowerCase(),
  );

  const handleSetState = (value) => {
    setSelectedState(value);
    setDefaultState(null);
    setValue('state', value.toLocaleUpperCase(), {
      shouldValidate: true,
    });
  };

  useState(() => {
    handleSetState(defaultState);
  }, []);

  const handleSetMortality = (value) => {
    setSelectedMortality(value);
    setValue('mortality', value, {
      shouldValidate: true,
    });
  };

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
      ToastAndroid.show(t('editApiary:locationDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('editApiary:revokedPermission'), ToastAndroid.LONG);
    }

    return false;
  };

  const handleCoordinates = async () => {
    setLoadingCoordinates(true);
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setValue('coordinates', t('editApiary:noPermission'));
      setValue('latitude', '');
      setValue('longitude', '');
      setDescription(t('editApiary:gpsPermission'));
      setLoadingCoordinates(false);
      setShowModal(true);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setValue(
          'coordinates',
          `${t('editApiary:lat')}${position.coords.latitude} ${t(
            'editApiary:long',
          )}${position.coords.longitude}`,
        );
        setValue('latitude', position.coords.latitude);
        setValue('longitude', position.coords.latitude);
      },
      (error) => {
        setDescription(
          `${t('editApiary:code')} ${error.code} - ${error.message}`,
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

  const options = [
    { label: t('editApiary:yes'), value: t('editApiary:yes') },
    { label: t('editApiary:yes'), value: t('editApiary:yes') },
  ];

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
      <Form.TextInput
        name="name"
        label={t('editApiary:apiaryName')}
        errorMessage={errors.name?.message}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => owner.current.focus()}
      />
      <Form.TextInput
        inputRef={owner}
        name="owner"
        label={t('editApiary:owner')}
        errorMessage={errors.owner?.message}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => phone.current.focus()}
      />
      <Form.TextInput
        name="phone"
        inputRef={phone}
        maskType="phone"
        maxLength={15}
        label={t('editApiary:phone')}
        errorMessage={errors.phone?.message}
        control={control}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => totalPlaces.current.focus()}
      />
      <Form.TextInput
        inputRef={totalPlaces}
        name="totalPlaces"
        keyboardType="numeric"
        returnKeyType="next"
        label={t('editApiary:quantity')}
        errorMessage={errors.totalPlaces?.message}
        control={control}
        onSubmitEditing={() => quantityFull.current.focus()}
      />
      <Form.TextInput
        inputRef={quantityFull}
        name="quantityFull"
        keyboardType="numeric"
        returnKeyType="next"
        label={t('editApiary:quantityFull')}
        errorMessage={errors.quantityFull?.message}
        control={control}
        onSubmitEditing={() => ownerPercent.current.focus()}
      />
      <Form.TextInput
        inputRef={ownerPercent}
        name="ownerPercent"
        keyboardType="numeric"
        returnKeyType="done"
        maxLength={3}
        label={t('editApiary:ownerPercent')}
        errorMessage={errors.ownerPercent?.message}
        control={control}
      />
      <Dropdown
        name="mortality"
        label={t('editApiary:mortality')}
        value={selectedMortality}
        setValue={(value) => handleSetMortality(value)}
        data={options}
        error={errors.mortality?.message}
        control={control}
        mode="bottom"
        defaultValue={defaultMortality}
      />

      <View style={styles.viewTitle}>
        <Title1 family="medium">{t('editApiary:address')}</Title1>
      </View>
      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="zipCode"
            label={t('editApiary:zipCode')}
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
          loading={loadingZipCode}
          onPress={() => handleZipCode()}
          title={loadingZipCode ? '' : t('editApiary:research')}
        />
      </View>

      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="coordinates"
            label={t('editApiary:coordinates')}
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
          title={loadingCoordinates ? '' : t('editApiary:research')}
        />
      </View>

      <Form.TextInput
        name="city"
        label={t('editApiary:city')}
        errorMessage={errors.city?.message}
        control={control}
        returnKeyType="next"
      />

      <Dropdown
        name="state"
        label={t('editApiary:state')}
        value={selectedState}
        setValue={(value) => handleSetState(value)}
        data={states}
        error={errors.state?.message}
        control={control}
        search
        searchPlaceholder={t('editApiary:search')}
        mode="bottom"
        defaultValue={defaultState}
      />

      <Footer>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={isSubmitting ? t('editApiary:saving') : t('editApiary:save')}
        />
      </Footer>
    </>
  );
}

EditApiaryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

EditApiaryForm.defaultProps = {
  isSubmitting: false,
};

export default EditApiaryForm;
