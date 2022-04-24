import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Footer } from '@components/layout';
import { useTheme } from '@theme';
import Button from '../Button';
import Form from '../Form';
import Title1 from '../typography/Title1';

function CreateNoteForm({ isSubmitting, positiveAction, cancelFunction }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const deviceWidth = Dimensions.get('window').width;

  const schema = Yup.object().shape({
    password: Yup.string()
      .required(t('translations:requiredError'))
      .min(6, t('translations:passwordLengthError')),
  });

  const styles = StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flexGrow: 1,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: -10,
    },
    question: {
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    viewStyle: { paddingHorizontal: 20 },
    buttonStyle: { width: deviceWidth * 0.45 },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.question}>
        <Title1 color={colors.primary} family="medium">
          {t('translations:confirmUser')}
        </Title1>
      </View>

      <Form.PasswordInput
        name="password"
        label={t('translations:password')}
        placeholder={t('translations:passwordPlaceholder')}
        errorMessage={errors.password?.message}
        control={control}
      />

      <Footer withBorder={false} style={styles.footer}>
        <Button
          title={t('translations:cancel')}
          onPress={cancelFunction}
          mode="outlined"
          textColor="red"
          titleFamily="medium"
          viewStyle={styles.viewStyle}
        />
        <Button
          title={
            isSubmitting ? t('translations:deleting') : t('translations:delete')
          }
          loading={isSubmitting}
          onPress={handleSubmit(positiveAction)}
          viewStyle={styles.viewStyle}
          style={styles.buttonStyle}
        />
      </Footer>
    </ScrollView>
  );
}

export default CreateNoteForm;
