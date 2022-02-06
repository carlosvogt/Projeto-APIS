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

  const schema = Yup.object().shape({
    name: Yup.string().required(t('formErrors:required')),
    email: Yup.string()
      .email(t('formErrors:email'))
      .required(t('formErrors:required')),
    phone: Yup.string()
      .required(t('formErrors:required'))
      .length(15, t('formErrors:phone')),

    password: Yup.string()
      .required(t('formErrors:required'))
      .min(6, t('formErrors:passwordLength')),
    confirmPassword: Yup.string()
      .required(t('formErrors:required'))
      .oneOf([Yup.ref('password'), null], t('formErrors:password')),
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
        onSubmitEditing={() => password.current.focus()}
      />
      <Form.PasswordInput
        inputRef={password}
        name="password"
        keyboardType="numeric"
        returnKeyType="next"
        label={t('createAccount:password')}
        error={errors.password?.message}
        control={control}
        onSubmitEditing={() => confirmPassword.current.focus()}
      />
      <Form.PasswordInput
        inputRef={confirmPassword}
        name="confirmPassword"
        keyboardType="numeric"
        returnKeyType="done"
        label={t('createAccount:confirmPassword')}
        error={errors.confirmPassword?.message}
        control={control}
      />

      <Footer>
        <Button
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          title={t('createAccount:buttonContinue')}
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
