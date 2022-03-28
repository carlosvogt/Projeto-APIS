/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from '@theme';
import { useSelector } from 'react-redux';

const ModalBottom = ({ onPressOut, showModal, children }) => {
  const { colors } = useTheme();
  const darkMode = useSelector((state) => state.mode.darkMode);

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: darkMode
        ? 'rgba(255,255,255,0.6)'
        : 'rgba(0, 0, 0, 0.4)',
    },
    handle: {
      width: '22%',
      marginTop: 8,
      borderRadius: 10,
      height: 4,
      alignSelf: 'center',
      backgroundColor: colors.primary,
    },
    modalBody: {
      width: '100%',
      alignItems: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    modalView: {
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: colors.background,
      alignItems: 'center',
      paddingTop: 26,
    },
  });

  return (
    <Modal animationType="fade" transparent visible={showModal}>
      <TouchableWithoutFeedback onPress={onPressOut}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={[styles.modalBody, { backgroundColor: colors.background }]}
            >
              <View style={styles.handle} />
              <View style={styles.modalView}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalBottom;
