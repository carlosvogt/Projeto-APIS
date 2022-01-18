import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

function SignIn() {
  const { t } = useTranslation();
  return <Text> {t('formErrors:required')} </Text>;
}
export default SignIn;
