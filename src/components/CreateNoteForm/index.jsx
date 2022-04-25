import React, { useRef } from 'react';
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

function CreateNoteForm({
  title,
  isSubmitting,
  positiveAction,
  cancelFunction,
  defaultData,
}) {
  const { t } = useTranslation();
  const description = useRef();
  const { colors } = useTheme();
  const deviceWidth = Dimensions.get('window').width;

  const schema = Yup.object().shape({
    description: Yup.string().required(t('translations:requiredError')),
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
    buttonStyle: { width: deviceWidth * 0.45 },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: defaultData?.title || '',
      description: defaultData?.description || '',
    },
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.question}>
        <Title1 color={colors.primary} family="medium">
          {title || t('translations:addNotes')}
        </Title1>
      </View>

      <Form.TextInput
        name="title"
        placeholder={t('translations:titlePlaceholder')}
        label={t('translations:title')}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => description.current.focus()}
      />

      <Form.TextInput
        name="description"
        placeholder={t('translations:descriptionPlaceholder')}
        inputRef={description}
        multiline
        clearButtonMode="disabled"
        height={200}
        label={t('translations:requiredDescription')}
        errorMessage={errors.description?.message}
        control={control}
      />

      <Footer withBorder={false} style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Button
            title={t('translations:cancel')}
            onPress={cancelFunction}
            mode="outlined"
            textColor="red"
            titleFamily="medium"
          />
        </View>
        <View>
          <Button
            title={
              isSubmitting ? t('translations:saving') : t('translations:save')
            }
            loading={isSubmitting}
            onPress={handleSubmit(positiveAction)}
            style={styles.buttonStyle}
          />
        </View>
      </Footer>
    </ScrollView>
  );
}

export default CreateNoteForm;
