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
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  function validPhone(value) {
    const cellphone = value.replace(/\D/g, '');
    if (cellphone.length < 10) {
      return false;
    }
    return true;
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(t('translations:requiredError')),
    email: Yup.string()
      .email(t('translations:emailError'))
      .required(t('translations:requiredError')),
    phone: Yup.string()
      .required(t('translations:requiredError'))
      .test('validPhone', t('translations:phoneError'), (value) => {
        if (value) {
          return validPhone(value);
        }
        return true;
      }),
    password: Yup.string()
      .required(t('translations:requiredError'))
      .min(6, t('translations:passwordLengthError')),
    confirmPassword: Yup.string()
      .required(t('translations:requiredError'))
      .oneOf([Yup.ref('password'), null], t('translations:passwordError')),
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
        label={t('translations:requiredName')}
        placeholder={t('translations:namePlaceholder')}
        errorMessage={errors.name?.message}
        control={control}
        returnKeyType="next"
        autoCapitalize="words"
        onSubmitEditing={() => email.current.focus()}
      />
      <Form.TextInput
        inputRef={email}
        name="email"
        label={t('translations:requiredEmail')}
        placeholder={t('translations:emailPlaceholder')}
        errorMessage={errors.email?.message}
        control={control}
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="email-address"
        onSubmitEditing={() => phone.current.focus()}
      />
      <Form.TextInput
        name="phone"
        inputRef={phone}
        maskType="phone"
        maxLength={15}
        label={t('translations:requiredPhone')}
        placeholder={t('translations:phonePlaceholder')}
        errorMessage={errors.phone?.message}
        control={control}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => password.current.focus()}
      />
      <Form.PasswordInput
        inputRef={password}
        name="password"
        returnKeyType="next"
        label={t('translations:requiredPassword')}
        placeholder={t('translations:passwordPlaceholder')}
        errorMessage={errors.password?.message}
        control={control}
        onSubmitEditing={() => confirmPassword.current.focus()}
      />
      <Form.PasswordInput
        inputRef={confirmPassword}
        name="confirmPassword"
        returnKeyType="done"
        label={t('translations:requiredConfirmPassword')}
        placeholder={t('translations:confirmPasswordPlaceholder')}
        errorMessage={errors.confirmPassword?.message}
        control={control}
      />

      <Footer>
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
