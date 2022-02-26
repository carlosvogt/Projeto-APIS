import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';
import { View, StyleSheet } from 'react-native';
import states from '@utils/states';
import { Button, Form, Dropdown } from '@components';
import { Title1, Title2 } from '@components/typography';

function UpdatePersonalInfoForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const email = useRef();
  const phone = useRef();
  const zipCodeRef = useRef();

  const [selectedOption, setSelectedOption] = useState(false);
  const [loadingZipCode, setLoadingZipCode] = useState(false);
  const [defaultState, setDefaultState] = useState('RS');
  const [loadingCoordinates, setLoadingCoordinates] = useState(false);

  function validZipCode(value) {
    const zipCode = value.replace(/\D/g, '');
    if (zipCode.length < 8) {
      return false;
    }
    return true;
  }

  function validPhone(value) {
    const cellphone = value.replace(/\D/g, '');
    if (cellphone.length < 11) {
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: 'Carlos Rodrigo Vogt',
      email: 'carlosvogt15@gmail.com',
      phone: '51996882190',
      zipCode: '96890000',
      coordinates: '00000000000',
      city: 'Sinimbu',
      state: 'RS',
    },
  });

  const handleSetState = (value) => {
    setSelectedOption(value);
    setDefaultState(null);
    setValue('state', value.toLocaleUpperCase(), {
      shouldValidate: true,
    });
  };

  // Dado mocado
  const handleCoordinates = () => {
    setLoadingCoordinates(true);
    console.log('Buscando coordenadas');
    setLoadingCoordinates(false);
  };

  // Dado mocado
  const handleZipCode = () => {
    setLoadingZipCode(true);
    console.log('Buscando CEP');
    setLoadingZipCode(false);
  };

  return (
    <>
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
          loading={loadingCoordinates}
          onPress={() => handleCoordinates()}
          title={loadingCoordinates ? null : t('createAccount:research')}
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
            multilane
          />
        </View>
        <Button
          style={styles.button}
          loading={loadingZipCode}
          onPress={() => handleZipCode()}
          title={loadingZipCode ? null : t('createAccount:research')}
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
