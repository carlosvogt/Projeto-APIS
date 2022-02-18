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
    oldPassword: Yup.string().required(t('formErrors:required')),
    newPassword: Yup.string()
      .required(t('formErrors:required'))
      .min(6, t('formErrors:passwordLength')),
    confirmPassword: Yup.string()
      .required(t('formErrors:required'))
      .oneOf([Yup.ref('newPassword'), null], t('formErrors:password')),
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
        label={t('changePassword:oldPassword')}
        returnKeyType="next"
        errorMessage={errors.oldPassword?.message}
        control={control}
        onSubmitEditing={() => newPassword.current.focus()}
      />
      <Form.PasswordInput
        inputRef={newPassword}
        name="newPassword"
        label={t('changePassword:newPassword')}
        returnKeyType="next"
        errorMessage={errors.newPassword?.message}
        control={control}
        onSubmitEditing={() => confirmPassword.current.focus()}
      />
      <Form.PasswordInput
        inputRef={confirmPassword}
        name="confirmPassword"
        label={t('changePassword:confirmPassword')}
        returnKeyType="done"
        errorMessage={errors.confirmPassword?.message}
        control={control}
      />

      <Footer>
        <Button
          title={
            isSubmitting ? t('changePassword:saving') : t('changePassword:save')
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
