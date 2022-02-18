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
    login: Yup.string().required(t('formErrors:required')),
    password: Yup.string().required(t('formErrors:required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <>
      <Form.TextInput
        name="login"
        label={t('login:email')}
        errorMessage={errors.login?.message}
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
        errorMessage={errors.password?.message}
        control={control}
      />

      <View style={styles.button}>
        <Button
          title={isSubmitting ? t('login:logging') : t('login:login')}
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
