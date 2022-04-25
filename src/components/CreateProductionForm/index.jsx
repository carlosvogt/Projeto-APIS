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
      label: t('translations:yes'),
      value: t('translations:yes'),
    },
    {
      label: t('translations:not'),
      value: t('translations:not'),
    },
  ];

  const schema = Yup.object().shape({
    name: Yup.string().required(t('translations:requiredError')),
    date: Yup.string()
      .required(t('translations:requiredError'))
      .test('date', t('translations:dateError'), (value) => {
        if (value) {
          const newSchema = Yup.string().matches(
            validateDate,
            t('translations:dateError'),
          );
          return newSchema.isValidSync(value);
        }
        return true;
      }),
    qtd: Yup.string().required(t('translations:requiredError')),
    payedQtd: Yup.string(),
    payed: Yup.string(),
  });

  const styles = StyleSheet.create({
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
          {title || t('translations:addProduction')}
        </Title1>
      </View>

      <Form.TextInput
        name="name"
        label={t('translations:requiredHarvest')}
        placeholder={t('translations:harvestPlaceholder')}
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
        label={t('translations:requiredHarvestDate')}
        placeholder={t('translations:harvestDatePlaceholder')}
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
        label={t('translations:requiredAmount')}
        placeholder={t('translations:amountPlaceholder')}
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
        label={t('translations:payedOwner')}
        placeholder={t('translations:payedOwnerPlaceholder')}
        control={control}
        errorMessage={errors.payedQtd?.message}
      />

      <DropdownComponent
        name="payed"
        label={t('translations:payed')}
        value={selectedOption}
        setValue={(value) => handleSetOption(value)}
        data={options}
        mode="bottom"
        defaultValue={defaultData?.payed}
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

      <CalendarDialog
        visible={showCalendar}
        onDismiss={() => setShowCalendar(false)}
        onPress={(value) => handleCalendar(value)}
      />
    </ScrollView>
  );
}

export default CreateProductionForm;
