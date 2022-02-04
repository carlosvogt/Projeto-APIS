/* eslint-disable react/jsx-max-depth */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import Button from '../Button';
import CreateNoteForm from '../CreateNoteForm';
import CreateProductionForm from '../CreateProductionForm';
import Title1 from '../typography/Title1';
import Title2 from '../typography/Title2';

const ModalCenter = ({
  title,
  description,
  positiveText,
  positiveAction,
  cancelText,
  cancelFunction,
  showModal,
  mode,
  isSubmitting,
}) => {
  const { colors } = useTheme();
  const deviceWidth = Dimensions.get('window').width;
  const darkMode = false;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode
        ? 'rgba(255,255,255,0.6)'
        : 'rgba(0, 0, 0, 0.4)',
    },
    modalBox: {
      width: deviceWidth - 32,
      backgroundColor: colors.background,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      padding: 16,
      borderRadius: 20,
    },
    question: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 24,
      padding: 8,
    },
    noteContainer: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    viewStyle: { paddingHorizontal: 20 },
    buttonStyle: { width: 200 },
  });

  return (
    <Modal animationType="fade" transparent visible={showModal}>
      <TouchableWithoutFeedback onPress={cancelFunction}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalBox}>
              {mode === 'question' && (
                <>
                  <View style={styles.question}>
                    <Title1 color={colors.reverseBackground} family="medium">
                      {title}
                    </Title1>
                  </View>
                  <View style={styles.question}>
                    <Title2 color={colors.reverseBackground} family="medium">
                      {description}
                    </Title2>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      title={cancelText}
                      onPress={cancelFunction}
                      mode="outlined"
                      textColor="red"
                      titleFamily="medium"
                      viewStyle={styles.viewStyle}
                    />
                    <Button
                      title={positiveText}
                      onPress={positiveAction}
                      viewStyle={styles.viewStyle}
                      style={styles.buttonStyle}
                    />
                  </View>
                </>
              )}
              {mode === 'note' && (
                <View style={styles.noteContainer}>
                  <CreateNoteForm
                    title={title}
                    cancelFunction={cancelFunction}
                    positiveAction={positiveAction}
                    isSubmitting={isSubmitting}
                  />
                </View>
              )}
              {mode === 'production' && (
                <View style={styles.noteContainer}>
                  <CreateProductionForm
                    title={title}
                    cancelFunction={cancelFunction}
                    positiveAction={positiveAction}
                    isSubmitting={isSubmitting}
                  />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

ModalCenter.propTypes = {
  mode: PropTypes.oneOf(['note', 'question', 'production']),
};

ModalCenter.defaultProps = {
  mode: 'question',
};

export default ModalCenter;
