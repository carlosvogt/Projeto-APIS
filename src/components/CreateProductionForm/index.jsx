/* eslint-disable react/jsx-max-depth */
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View, Keyboard } from 'react-native';
import { Footer } from '@components/layout';
import { useTheme } from '@theme';
import { validateDate } from '@utils/validators';
import Button from '../Button';
import Form from '../Form';
import Title1 from '../typography/Title1';
import CalendarDialog from '../CalendarDialog';
import DropdownComponent from '../Dropdown';

function CreateProductionForm({
  title,
  isSubmitting,
  positiveAction,
  cancelFunction,
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [showCalendar, setShowCalendar] = useState(false);
  const [openKeyboard, setOpenKeyboard] = useState(true);
  const [selectedOption, setSelectedOption] = useState(false);

  const harvestDate = useRef();
  const amount = useRef();
  const payedOwner = useRef();

  const options = [
    {
      label: 'Sim',
      value: 'Sim',
    },
    {
      label: 'Não',
      value: 'Não',
    },
  ];

  const schema = Yup.object().shape({
    harvest: Yup.string().required(t('formErrors:required')),
    harvestDate: Yup.string()
      .required(t('formErrors:required'))
      .test('date', t('form:label.date'), (value) => {
        if (value) {
          const newSchema = Yup.string().matches(
            validateDate,
            t('form:label.date'),
          );
          return newSchema.isValidSync(value);
        }
        return true;
      }),
    amount: Yup.string().required(t('formErrors:required')),
  });

  const styles = StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      position: 'relative',
      flexGrow: 1,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 16,
    },
    question: {
      width: '100%',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    viewStyle: { paddingHorizontal: 20 },
    buttonStyle: { width: 200 },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  function handleCalendar(value) {
    const formattedData = value.split('-');
    setValue(
      'harvestDate',
      `${formattedData[2]}/${formattedData[1]}/${formattedData[0]}`,
      { shouldValidate: true },
    );
    setShowCalendar(false);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.question}>
        <Title1 color={colors.primary} family="medium">
          {title || t('form:label.addProduction')}
        </Title1>
      </View>

      <Form.TextInput
        name="harvest"
        label={t('form:label.harvest')}
        control={control}
        returnKeyType="next"
        keyboardType="numeric"
        errorMessage={errors.harvest?.message}
        onSubmitEditing={() => harvestDate.current.focus()}
      />
      <Form.TextInput
        name="harvestDate"
        inputRef={harvestDate}
        icon="calendar-range"
        label={t('form:label.harvestDate')}
        control={control}
        maxLength={10}
        iconColor={colors.primary}
        returnKeyType="next"
        maskType="date"
        keyboardType="numeric"
        showSoftInputOnFocus={openKeyboard}
        errorMessage={errors.harvestDate?.message}
        onSubmitEditing={() => amount.current.focus()}
        onPressIcon={() => {
          setOpenKeyboard(false);
          Keyboard.dismiss();
          setShowCalendar(true);
          setOpenKeyboard(true);
        }}
      />
      <Form.TextInput
        name="amount"
        inputRef={amount}
        label={t('form:label.amount')}
        control={control}
        returnKeyType="next"
        keyboardType="numeric"
        errorMessage={errors.amount?.message}
        onSubmitEditing={() => payedOwner.current.focus()}
      />

      <Form.TextInput
        name="payedOwner"
        inputRef={payedOwner}
        keyboardType="numeric"
        label={t('form:label.payedOwner')}
        control={control}
        errorMessage={errors.payedOwner?.message}
      />

      <DropdownComponent
        label={t('form:label.payed')}
        value={selectedOption}
        setValue={setSelectedOption}
        data={options}
      />

      <Footer withBorder={false} style={styles.footer}>
        <Button
          title={t('form:label.cancel')}
          onPress={cancelFunction}
          mode="outlined"
          textColor="red"
          titleFamily="medium"
          viewStyle={styles.viewStyle}
        />
        <Button
          title={t('form:label.save')}
          loading={isSubmitting}
          onPress={handleSubmit(positiveAction)}
          viewStyle={styles.viewStyle}
          style={styles.buttonStyle}
        />
      </Footer>

      <CalendarDialog
        visible={showCalendar}
        onDismiss={() => setShowCalendar(false)}
        onPress={(value) => handleCalendar(value)}
      />
    </ScrollView>
  );
}

export default CreateProductionForm;
