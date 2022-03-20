import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form, Steps } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';

function PersonalInfoForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const owner = useRef();
  const phone = useRef();
  const totalPlaces = useRef();
  const quantityFull = useRef();
  const ownerPercent = useRef();

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
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <>
      <Form.TextInput
        name="name"
        label={t('createApiary:apiaryName')}
        errorMessage={errors.name?.message}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => owner.current.focus()}
      />
      <Form.TextInput
        inputRef={owner}
        name="owner"
        label={t('createApiary:owner')}
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
        label={t('createApiary:phone')}
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
        label={t('createApiary:quantity')}
        errorMessage={errors.totalPlaces?.message}
        control={control}
        onSubmitEditing={() => quantityFull.current.focus()}
      />
      <Form.TextInput
        inputRef={quantityFull}
        name="quantityFull"
        keyboardType="numeric"
        returnKeyType="next"
        label={t('createApiary:quantityFull')}
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
        label={t('createApiary:ownerPercent')}
        errorMessage={errors.ownerPercent?.message}
        control={control}
      />

      <Footer>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={t('createApiary:continue')}
        />
        <Steps total={2} active={0} />
      </Footer>
    </>
  );
}

PersonalInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

PersonalInfoForm.defaultProps = {
  isSubmitting: false,
};

export default PersonalInfoForm;
