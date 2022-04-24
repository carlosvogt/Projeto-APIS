/* eslint-disable no-nested-ternary */
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@theme';

function RecoverPasswordForm({ onSubmit, isSubmitting, emailSended }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      paddingTop: 16,
    },
  });

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t('translations:emailError'))
      .required(t('translations:requiredError')),
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
        autoCapitalize="none"
        label={t('translations:email')}
        placeholder={t('translations:emailPlaceholder')}
        errorMessage={errors.email?.message}
        control={control}
        returnKeyType="done"
        keyboardType="email-address"
      />

      <View style={styles.button}>
        <Button
          title={
            isSubmitting
              ? t('translations:sending')
              : !isSubmitting && emailSended
              ? t('translations:resend')
              : t('translations:send')
          }
          style={{
            backgroundColor: emailSended ? colors.success : colors.primary,
          }}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
}

RecoverPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  emailSended: PropTypes.bool,
};

RecoverPasswordForm.defaultProps = {
  isSubmitting: false,
  emailSended: false,
};

export default RecoverPasswordForm;
