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
      .required(t('translations:requiredError'))
      .email(t('translations:emailError')),
    password: Yup.string()
      .required(t('translations:requiredError'))
      .min(6, t('translations:passwordLengthError')),
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
        label={t('translations:email')}
        placeholder={t('translations:emailPlaceholder')}
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
        label={t('translations:password')}
        placeholder={t('translations:passwordPlaceholder')}
        errorMessage={errors.password?.message}
        control={control}
      />

      <View style={styles.button}>
        <Button
          title={
            isSubmitting
              ? t('translations:accessing')
              : t('translations:access')
          }
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
