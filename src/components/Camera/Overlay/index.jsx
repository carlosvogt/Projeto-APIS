import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import Center from './Center';
import { Header } from '../../layout';

function Overlay({ hideOverlay }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  });
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: hideOverlay ? 'none' : colors.black },
      ]}
    >
      <Header title={t('translations:takePicture')} />
      {!hideOverlay && <Center />}
    </View>
  );
}

export default Overlay;
