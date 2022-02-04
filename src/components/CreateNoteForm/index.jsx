import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
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
}) {
  const { t } = useTranslation();
  const description = useRef();
  const { colors } = useTheme();

  const schema = Yup.object().shape({
    description: Yup.string().required(t('formErrors:required')),
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
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.question}>
        <Title1 color={colors.primary} family="medium">
          {title || t('form:label.addNote')}
        </Title1>
      </View>

      <Form.TextInput
        name="title"
        label={t('form:label.title')}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => description.current.focus()}
      />

      <Form.TextInput
        name="description"
        inputRef={description}
        multiline
        clearButtonMode="disabled"
        height={200}
        label={t('form:label.description')}
        errorMessage={errors.description?.message}
        control={control}
      />

      <Footer withBorder={false} style={styles.footer}>
        <Button
          title={t('form:label.cancel')}
          onPress={cancelFunction}
          mode="outlined"
          textColor="red"
          titleFamily="medium"
          viewStyle={{ paddingHorizontal: 20 }}
        />
        <Button
          title={t('form:label.save')}
          loading={isSubmitting}
          onPress={handleSubmit(positiveAction)}
          viewStyle={{ paddingHorizontal: 20 }}
          style={{
            width: 200,
          }}
        />
      </Footer>
    </ScrollView>
  );
}

export default CreateNoteForm;