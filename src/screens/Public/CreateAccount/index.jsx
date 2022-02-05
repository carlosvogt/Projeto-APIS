/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container, Steps, Button, useToast, ModalBottom } from '@components';
import { Header, Footer } from '@components/layout';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Title1 } from '@components/typography';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';

function CreateAccount() {
  const toast = useToast();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);

  function toastFunction() {
    toast.success('Conta criada!');
  }

  const styles = StyleSheet.create({
    modalItem: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
  });

  useEffect(() => {
    toastFunction();
    setShowModal(true);
  }, []);

  const handleTakePicture = () => {
    console.log('a');
  };
  const handleChoosePicture = () => {
    console.log('a');
  };
  const handleDelePicture = () => {
    console.log('a');
  };

  const data = [
    { option: t('form:modal.takePicture'), onClick: () => handleTakePicture() },
    {
      option: t('form:modal.selectPicture'),
      onClick: () => handleChoosePicture(),
    },
    {
      option: t('form:modal.deletePicture'),
      onClick: () => handleDelePicture(),
    },
  ];

  return (
    <>
      <Header title="Teste" />
      <Container>
        <Footer>
          <Button onPress={() => console.log('teste')} title="Continuar" />
          <Steps total={3} active={0} />
        </Footer>
      </Container>

      <ModalBottom showModal={showModal} onPressOut={() => setShowModal(false)}>
        {data?.map((item) => {
          return (
            <TouchableOpacity
              key={item.option}
              style={styles.modalItem}
              onPress={item.onClick}
            >
              <Title1 family="medium" color={colors.primary}>
                {item.option}
              </Title1>
            </TouchableOpacity>
          );
        })}
      </ModalBottom>
    </>
  );
}
export default CreateAccount;
