import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { Container, ToggleButton, Steps, Button } from '@components';
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
  const loading = true;
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
        <Send />
        <Share />
        <Trash />
        <VisibilityOff />
        <VisibilityOn />
      </View>

      <Button title="Logar" margin={16} onPress={() => console.log('teste')} />

      <Button
        loading={loading}
        loadingBlock={!!loading}
        title="Logando"
        onPress={() => console.log('teste')}
      />

      <Button disabled title="Bloqueado" onPress={() => console.log('teste')} />

      <Button
        title="Esqueceu sua senha?"
        onPress={() => console.log('teste')}
        mode="outlined"
        titleFamily="light"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'yellow',
        }}
      >
        <Button
          title="Cancelar"
          onPress={() => console.log('teste')}
          mode="outlined"
          textColor="red"
          titleFamily="medium"
          viewStyle={{ paddingHorizontal: 20 }}
        />
        <Button
          title="Salvar"
          onPress={() => console.log('teste')}
          viewStyle={{ paddingHorizontal: 20 }}
          style={{
            width: 200,
          }}
        />
      </View>
    </Container>
  );
}
export default SignIn;
