import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';

function SignIn() {
  const { t } = useTranslation();
  return (
    <>
      <Title2>{t('formErrors:required')}</Title2>
      <Title1 family="medium">{t('formErrors:required')}</Title1>
    </>
  );
}
export default SignIn;
