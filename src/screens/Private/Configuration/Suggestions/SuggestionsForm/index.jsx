import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Footer } from '@components/layout';

function SuggestionsForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const message = useRef();

  const schema = Yup.object().shape({
    subject: Yup.string().required(t('formErrors:required')),
    message: Yup.string().required(t('formErrors:required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <>
      <Form.TextInput
        name="subject"
        label={t('suggestions:subject')}
        placeholder={t('suggestions:subjectPlaceholder')}
        returnKeyType="next"
        errorMessage={errors.subject?.message}
        control={control}
        onSubmitEditing={() => message.current.focus()}
      />
      <Form.TextInput
        inputRef={message}
        name="message"
        label={t('suggestions:message')}
        placeholder={t('suggestions:messagePlaceholder')}
        returnKeyType="done"
        errorMessage={errors.message?.message}
        control={control}
        multiline
        height={300}
        clearButtonMode="disabled"
      />

      <Footer>
        <Button
          title={t('suggestions:send')}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </Footer>
    </>
  );
}

SuggestionsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

SuggestionsForm.defaultProps = {
  isSubmitting: false,
};

export default SuggestionsForm;
