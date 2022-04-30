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
import { useSelector } from 'react-redux';
import { Footer } from '@components/layout';
import Button from '../Button';
import CreateNoteForm from '../CreateNoteForm';
import LoginForm from '../LoginForm';
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
  defaultData,
  descriptionBy,
}) => {
  const { colors } = useTheme();
  const deviceWidth = Dimensions.get('window').width;
  const darkMode = useSelector((state) => state.mode.darkMode);

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
      borderRadius: 10,
    },
    question: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 24,
      padding: 8,
    },
    info: {
      width: '100%',
      justifyContent: 'center',
      padding: 8,
    },
    noteContainer: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    buttonStyle: { width: deviceWidth * 0.45 },
    confirmView: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    view: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
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
                    <Title1 color={colors.primary} family="medium">
                      {title}
                    </Title1>
                  </View>
                  <View style={styles.question}>
                    <Title2 color={colors.primary} family="medium">
                      {description}
                    </Title2>
                  </View>
                  <Footer withBorder={false} style={styles.footer}>
                    <View style={{ flex: 1 }}>
                      <Button
                        title={cancelText}
                        onPress={cancelFunction}
                        mode="outlined"
                        textColor="red"
                        titleFamily="medium"
                      />
                    </View>
                    <View>
                      <Button
                        title={positiveText}
                        onPress={positiveAction}
                        style={styles.buttonStyle}
                        loading={isSubmitting}
                      />
                    </View>
                  </Footer>
                </>
              )}
              {mode === 'alert' && (
                <>
                  <View style={styles.info}>
                    <Title1 centered color={colors.primary} family="medium">
                      {title}
                    </Title1>
                  </View>
                  <View style={styles.question}>
                    <Title2 centered color={colors.primary} family="medium">
                      {description}
                    </Title2>
                    <View style={{ marginTop: 10 }}>
                      <Title2 centered color={colors.primary} family="medium">
                        {descriptionBy}
                      </Title2>
                    </View>
                  </View>
                  <View style={styles.confirmView}>
                    <Button
                      title={cancelText}
                      onPress={cancelFunction}
                      style={styles.buttonStyle}
                    />
                  </View>
                </>
              )}
              {mode === 'note' && (
                <View style={styles.noteContainer}>
                  <CreateNoteForm
                    title={title}
                    defaultData={defaultData}
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
                    defaultData={defaultData}
                    cancelFunction={cancelFunction}
                    positiveAction={positiveAction}
                    isSubmitting={isSubmitting}
                  />
                </View>
              )}
              {mode === 'login' && (
                <View style={styles.noteContainer}>
                  <LoginForm
                    title={title}
                    defaultData={defaultData}
                    cancelFunction={cancelFunction}
                    positiveAction={positiveAction}
                    isSubmitting={isSubmitting}
                    positiveText={positiveText}
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
  mode: PropTypes.oneOf(['note', 'question', 'production', 'alert', 'login']),
};

ModalCenter.defaultProps = {
  mode: 'question',
};

export default ModalCenter;
