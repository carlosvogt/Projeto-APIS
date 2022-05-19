/* eslint-disable sonarjs/cognitive-complexity */
import React, { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Dropdown, useToast } from '@components';
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
import { Title1, Title2 } from '@components/typography';
import Geolocation from 'react-native-geolocation-service';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '@theme';

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
  const netInfo = useNetInfo();
  const [totalQtd, setTotalQtd] = useState(0);
  const { colors } = useTheme();
  const toast = useToast();

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
    viewTitle: {
      marginTop: 24,
      marginBottom: 16,
    },
    marginButton: { marginBottom: 8 },
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

  function validQuantity(value) {
    const qtd = parseInt(value, 10);
    if (qtd > totalQtd) {
      return false;
    }
    return true;
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(t('translations:requiredError')),
    owner: Yup.string().required(t('translations:requiredError')),
    phone: Yup.string().test(
      'validPhone',
      t('translations:phoneError'),
      (value) => {
        if (value) {
          return validPhone(value);
        }
        return true;
      },
    ),
    totalPlaces: Yup.string()
      .required(t('translations:requiredError'))
      .test('totalPlacesQuantity', (value) => {
        setTotalQtd(parseInt(value, 10));
        return true;
      }),
    quantityFull: Yup.string()
      .required(t('translations:requiredError'))
      .test('validQuantity', t('translations:quantityError'), (value) => {
        if (value) {
          return validQuantity(value);
        }
        return true;
      }),
    ownerPercent: Yup.string().test(
      'validPercent',
      t('translations:percentageError'),
      (value) => {
        if (value) {
          return validPercentage(value);
        }
        return true;
      },
    ),
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
    mortality: Yup.string(),
    city: Yup.string().required(t('translations:requiredError')),
    state: Yup.string().required(t('translations:requiredError')),
    mortalityDescription: Yup.string(),
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
      mortalityDescription: defaultData?.mortalityDescription || '',
    },
  });

  const formValues = getValues();
  const defaultState = formValues.state.toLocaleLowerCase();
  const defaultMortality = formValues.mortality;

  const handleSetState = (value) => {
    setSelectedState(value);

    if (value) {
      setValue('state', value.toLocaleUpperCase(), {
        shouldValidate: true,
      });
    }
  };

  const handleSetMortality = (value) => {
    setSelectedMortality(value);

    if (value) {
      setValue('mortality', value, {
        shouldValidate: true,
      });
    }
  };

  useEffect(() => {
    handleSetState(defaultState);
    handleSetMortality(defaultMortality);
  }, []);

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

  const options = [
    { label: t('translations:yes'), value: 'true' },
    { label: t('translations:not'), value: 'false' },
  ];

  return (
    <>
      <Form.TextInput
        name="name"
        label={t('translations:requiredApiaryName')}
        placeholder={t('translations:apiaryNamePlaceholder')}
        errorMessage={errors.name?.message}
        control={control}
        returnKeyType="next"
        autoCapitalize="words"
        onSubmitEditing={() => owner.current.focus()}
      />
      <Form.TextInput
        inputRef={owner}
        name="owner"
        autoCapitalize="words"
        label={t('translations:requiredOwnerName')}
        placeholder={t('translations:ownerPlaceholder')}
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
        label={t('translations:ownerPhone')}
        placeholder={t('translations:ownerPhonePlaceholder')}
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
        label={t('translations:requiredQuantity')}
        placeholder={t('translations:quantityPlaceholder')}
        errorMessage={errors.totalPlaces?.message}
        control={control}
        onSubmitEditing={() => quantityFull.current.focus()}
      />
      <Form.TextInput
        inputRef={quantityFull}
        name="quantityFull"
        keyboardType="numeric"
        returnKeyType="next"
        label={t('translations:requiredQuantityFull')}
        placeholder={t('translations:quantityFullPlaceholder')}
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
        label={t('translations:ownerPercent')}
        placeholder={t('translations:ownerPercentPlaceholder')}
        errorMessage={errors.ownerPercent?.message}
        control={control}
      />
      <Dropdown
        name="mortality"
        label={t('translations:mortality')}
        value={selectedMortality}
        setValue={(value) => handleSetMortality(value)}
        data={options}
        error={errors.mortality?.message}
        control={control}
        mode="bottom"
        defaultValue={defaultMortality}
      />
      {formValues.mortality === 'true' && (
        <>
          <View style={styles.marginButton}>
            <Title2 color={colors.error}>
              {t('translations:mortalityInfo')}
            </Title2>
          </View>
          <Form.TextInput
            name="mortalityDescription"
            label={t('translations:mortalityDescription')}
            placeholder={t('translations:mortalityDescriptionPlaceholder')}
            errorMessage={errors.mortalityDescription?.message}
            control={control}
            multiline
            height={300}
            clearButtonMode="disabled"
          />
        </>
      )}

      <View style={styles.viewTitle}>
        <Title1 color={colors.primary} family="medium">
          {t('translations:address')}
        </Title1>
      </View>
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
          loading={loadingZipCode}
          disabled={formValues?.zipCode.length !== 10}
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

      <Dropdown
        name="state"
        label={t('translations:requiredState')}
        value={selectedState}
        setValue={(value) => handleSetState(value)}
        data={states}
        error={errors.state?.message}
        control={control}
        search
        searchPlaceholder={t('translations:searchState')}
        mode="top"
        defaultValue={defaultState}
      />

      <Form.TextInput
        name="city"
        label={t('translations:requiredCity')}
        placeholder={t('translations:cityPlaceholder')}
        errorMessage={errors.city?.message}
        control={control}
        returnKeyType="next"
      />

      <Footer style={{ marginTop: 16 }}>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={
            isSubmitting ? t('translations:saving') : t('translations:save')
          }
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
