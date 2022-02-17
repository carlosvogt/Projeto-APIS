/* eslint-disable react/jsx-max-depth */
import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import Title1 from '../typography/Title1';
import Title2 from '../typography/Title2';
import Footer from '../layout/Footer';
import Button from '../Button';
import CameraButton from './Button';
import Overlay from './Overlay';

function Camera({ onBack, types, photos, hideOverlay, header }) {
  const { t } = useTranslation();
  const cameraRef = useRef();
  const [imagePreview, setImagePreview] = useState(undefined);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [activeType, setActiveType] = useState(0);
  const [photosStorage, setPhotosStorage] = useState([]);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    title: {
      color: colors.primary,
      fontSize: 24,
    },
    subtitle: {
      color: colors.black,
      fontSize: 16,
      fontWeight: '400',
    },
    info: {
      flex: 1,
      backgroundColor: colors.secondary,
    },

    containerCamera: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    camera: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: 'red',
    },
    containerPreview: { flex: 1, backgroundColor: colors.background },
    image: { flex: 2 },
    imageDetail: { flex: 1, backgroundColor: colors.background },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 16,
    },
    button: { width: 'auto' },
    view: { marginTop: 16 },
    scrollView: {
      paddingHorizontal: 16,
    },
  });

  const handleTakePicture = useCallback(async () => {
    setLoadingPreview(true);
    const data = await cameraRef.current.takePictureAsync({
      quality: 1,
      fixOrientation: true,
      forceUpOrientation: true,
    });
    setImagePreview(data);
    setLoadingPreview(false);
  }, []);

  const storePhotos = useCallback((type, image) => {
    setPhotosStorage((old) => [...old, { type, image }]);
  }, []);

  const handleConfirmTake = useCallback(() => {
    storePhotos(types[activeType], imagePreview);
    if (types.length === activeType + 1) {
      photos([
        ...photosStorage,
        { type: types[activeType], image: imagePreview },
      ]);
    } else {
      setActiveType((old) => old + 1);
    }
    setImagePreview(undefined);
  }, [activeType, imagePreview, photos, photosStorage, storePhotos, types]);

  return !imagePreview ? (
    <View style={styles.containerCamera}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={
          types[0] === 'selfie'
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
        flashMode={RNCamera.Constants.FlashMode.on}
      >
        <Overlay
          hideOverlay={hideOverlay}
          type={types[activeType]}
          onBack={() => onBack()}
          header={header}
        />
      </RNCamera>
      <CameraButton
        loading={loadingPreview}
        onPress={() => handleTakePicture()}
      />
    </View>
  ) : (
    <View style={styles.containerPreview}>
      <Image style={styles.image} source={{ uri: imagePreview.uri }} />
      <View style={styles.imageDetail}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.view}>
            <Title1 color={colors.primary}>
              {t('components:camera.imageConfirmation')}
            </Title1>
          </View>

          <View style={styles.view}>
            <Title2 color={colors.primary}>
              {t('components:camera.imageBody')}
            </Title2>
          </View>
        </ScrollView>
        <Footer withBorder={false} style={styles.footer}>
          <View style={styles.button}>
            <Button
              onPress={() => setImagePreview(undefined)}
              title={t('components:camera.takeAnother')}
            />
          </View>
          <View style={styles.button}>
            <Button
              mode="contained"
              onPress={() => handleConfirmTake()}
              title={t('components:camera.conclusion')}
            />
          </View>
        </Footer>
      </View>
    </View>
  );
}

export default Camera;
