/* eslint-disable react/jsx-max-depth */
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
} from 'react-native';
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
  defaultData,
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [showCalendar, setShowCalendar] = useState(false);
  const [openKeyboard, setOpenKeyboard] = useState(true);
  const [selectedOption, setSelectedOption] = useState(false);
  const deviceWidth = Dimensions.get('window').width;
  const date = useRef();
  const qtd = useRef();
  const payedQtd = useRef();

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
    name: Yup.string().required(t('formErrors:required')),
    date: Yup.string()
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
    qtd: Yup.string().required(t('formErrors:required')),
    payedQtd: Yup.string(),
    payed: Yup.string(),
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
    buttonStyle: { width: deviceWidth * 0.45 },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: defaultData?.name || '',
      date: defaultData?.date || '',
      qtd: defaultData?.qtd || '',
      payedQtd: defaultData?.payedQtd || '',
      payed: defaultData?.payed || '',
    },
  });

  function handleCalendar(value) {
    const formattedData = value.split('-');
    setValue(
      'date',
      `${formattedData[2]}/${formattedData[1]}/${formattedData[0]}`,
      { shouldValidate: true },
    );
    setShowCalendar(false);
  }

  const handleSetOption = (value) => {
    setSelectedOption(value);
    setValue('payed', value, {
      shouldValidate: true,
    });
  };

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
        name="name"
        label={t('form:label.harvest')}
        placeholder={t('form:label.harvestPlaceholder')}
        control={control}
        returnKeyType="next"
        keyboardType="numeric"
        errorMessage={errors.name?.message}
        onSubmitEditing={() => date.current.focus()}
      />
      <Form.TextInput
        name="date"
        inputRef={date}
        icon="calendar-range"
        label={t('form:label.harvestDate')}
        placeholder={t('form:label.harvestDatePlaceholder')}
        control={control}
        maxLength={10}
        iconColor={colors.primary}
        returnKeyType="next"
        maskType="date"
        keyboardType="numeric"
        showSoftInputOnFocus={openKeyboard}
        errorMessage={errors.date?.message}
        onSubmitEditing={() => qtd.current.focus()}
        onPressIcon={() => {
          setOpenKeyboard(false);
          Keyboard.dismiss();
          setShowCalendar(true);
          setOpenKeyboard(true);
        }}
      />
      <Form.TextInput
        name="qtd"
        inputRef={qtd}
        label={t('form:label.amount')}
        placeholder={t('form:label.amountPlaceholder')}
        control={control}
        returnKeyType="next"
        keyboardType="numeric"
        errorMessage={errors.qtd?.message}
        onSubmitEditing={() => payedQtd.current.focus()}
      />

      <Form.TextInput
        name="payedQtd"
        inputRef={payedQtd}
        keyboardType="numeric"
        label={t('form:label.payedOwner')}
        control={control}
        errorMessage={errors.payedQtd?.message}
      />

      <DropdownComponent
        name="payed"
        label={t('form:label.payed')}
        value={selectedOption}
        setValue={(value) => handleSetOption(value)}
        data={options}
        mode="bottom"
        defaultValue={defaultData?.payed}
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
