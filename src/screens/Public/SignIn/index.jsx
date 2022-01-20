import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Container } from '@components';

function SignIn() {
  const { t } = useTranslation();
  return (
    <Container>
      <Title2>{t('formErrors:required')}</Title2>
      <Title1 family="medium">{t('formErrors:required')}</Title1>
    </Container>
  );
}
export default SignIn;
