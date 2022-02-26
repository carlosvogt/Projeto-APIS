import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Steps, Dropdown } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';
import { View, StyleSheet } from 'react-native';
import states from '@utils/states';

function AddressForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(false);
  const [loadingZipCode, setLoadingZipCode] = useState(false);
  const [loadingCoordinates, setLoadingCoordinates] = useState(false);

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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const handleSetState = (value) => {
    setSelectedOption(value);
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
      <View style={styles.view}>
        <View style={styles.input}>
          <Form.TextInput
            name="zipCode"
            label={t('createApiary:zipCode')}
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
          title={loadingCoordinates ? null : t('createApiary:research')}
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
            multilane
          />
        </View>
        <Button
          style={styles.button}
          loading={loadingZipCode}
          onPress={() => handleZipCode()}
          title={loadingZipCode ? null : t('createApiary:research')}
        />
      </View>

      <Form.TextInput
        name="city"
        label={t('createApiary:city')}
        errorMessage={errors.city?.message}
        control={control}
        returnKeyType="next"
      />

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
        mode="bottom"
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
