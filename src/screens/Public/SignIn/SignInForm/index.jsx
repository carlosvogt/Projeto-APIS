import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

function SignInForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const password = useRef();

  const styles = StyleSheet.create({
    button: {
      paddingTop: 16,
    },
  });

  const schema = Yup.object().shape({
    email: Yup.string()
      .required(t('formErrors:required'))
      .email(t('formErrors:email')),
    password: Yup.string()
      .required(t('formErrors:required'))
      .min(6, t('formErrors:passwordLength')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <>
      <Form.TextInput
        name="email"
        label={t('login:email')}
        placeholder={t('login:emailPlaceholder')}
        errorMessage={errors.email?.message}
        control={control}
        returnKeyType="next"
        keyboardType="email-address"
        onSubmitEditing={() => password.current.focus()}
        autoCapitalize="none"
      />

      <Form.PasswordInput
        inputRef={password}
        name="password"
        label={t('login:password')}
        placeholder={t('login:passwordPlaceholder')}
        errorMessage={errors.password?.message}
        control={control}
      />

      <View style={styles.button}>
        <Button
          title={isSubmitting ? t('login:accessing') : t('login:access')}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

SignInForm.defaultProps = {
  isSubmitting: false,
};

export default SignInForm;
