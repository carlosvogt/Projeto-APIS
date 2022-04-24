import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';

function ChangePasswordForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required(t('translations:requiredError')),
    newPassword: Yup.string()
      .required(t('translations:requiredError'))
      .min(6, t('translations:passwordLengthError')),
    confirmPassword: Yup.string()
      .required(t('translations:requiredError'))
      .oneOf([Yup.ref('newPassword'), null], t('translations:passwordError')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <>
      <Form.PasswordInput
        name="oldPassword"
        label={t('translations:oldPassword')}
        placeholder={t('translations:oldPasswordPlaceholder')}
        returnKeyType="next"
        errorMessage={errors.oldPassword?.message}
        control={control}
        onSubmitEditing={() => newPassword.current.focus()}
      />
      <Form.PasswordInput
        inputRef={newPassword}
        name="newPassword"
        label={t('translations:newPassword')}
        placeholder={t('translations:newPasswordPlaceholder')}
        returnKeyType="next"
        errorMessage={errors.newPassword?.message}
        control={control}
        onSubmitEditing={() => confirmPassword.current.focus()}
      />
      <Form.PasswordInput
        inputRef={confirmPassword}
        name="confirmPassword"
        label={t('translations:confirmPassword')}
        placeholder={t('translations:confirmPasswordPlaceholder')}
        returnKeyType="done"
        errorMessage={errors.confirmPassword?.message}
        control={control}
      />

      <Footer>
        <Button
          title={
            isSubmitting ? t('translations:saving') : t('translations:save')
          }
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </Footer>
    </>
  );
}

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

ChangePasswordForm.defaultProps = {
  isSubmitting: false,
};

export default ChangePasswordForm;
