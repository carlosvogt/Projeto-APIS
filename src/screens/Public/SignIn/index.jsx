import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Container, ToggleButton, Steps } from '@components';
import {
  Add,
  ArrowBack,
  ArrowDown,
  ArrowMore,
  Bee,
  CheckOutline,
  ConfigIcon,
  DarkMode,
  Done,
  Download,
  Gps,
  Home,
  Info,
  LightMode,
  Location,
  Logout,
  Map,
  More,
  Password,
  Person,
  Reload,
  Send,
  Share,
  Trash,
  VisibilityOff,
  VisibilityOn,
} from '@icons';
import { View } from 'react-native';

function SignIn() {
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <Container>
      <Title2>{t('formErrors:required')}</Title2>
      <Title1 family="medium">{t('formErrors:required')}</Title1>

      <ToggleButton
        isEnabled={isEnabled}
        setIsEnabled={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'White' : 'Dark'}
      />
      <Steps total={3} active={0} />
      <View style={{ flexDirection: 'row' }}>
        <Add />
        <ArrowBack />
        <ArrowDown />
        <ArrowMore />
        <Bee />
        <CheckOutline />
        <ConfigIcon />
        <DarkMode />
        <Done />
        <Download />
        <Gps />
        <Home />
        <Info />
        <LightMode />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Location />
        <Logout />
        <Map />
        <More />
        <Password />
        <Person />
        <Reload />
        <Send />
        <Share />
        <Trash />
        <VisibilityOff />
        <VisibilityOn />
      </View>
    </Container>
  );
}
export default SignIn;
