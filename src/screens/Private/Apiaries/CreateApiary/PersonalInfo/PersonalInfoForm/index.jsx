import React, { useEffect, useRef, useState } from 'react';
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
  const [totalQtd, setTotalQtd] = useState(0);

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
    totalPlaces: Yup.string().required(t('translations:requiredError')),
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
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const formValues = getValues();

  useEffect(() => {
    if (formValues.totalPlaces) {
      setTotalQtd(parseInt(formValues.totalPlaces, 10));
    }
  }, [formValues]);

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

      <Footer style={{ marginTop: 8 }}>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={t('translations:continue')}
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
