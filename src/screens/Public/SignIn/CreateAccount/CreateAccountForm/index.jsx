import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function CreateAccountForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const password = useRef();

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
    <Form.Container>
      <Form.TextInput
        name="login"
        label="Login"
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
        label="Senha"
        error={errors.password?.message}
        control={control}
      />

      <Button
        title="Enviar"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </Form.Container>
  );
}

CreateAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

CreateAccountForm.defaultProps = {
  isSubmitting: false,
};

export default CreateAccountForm;
