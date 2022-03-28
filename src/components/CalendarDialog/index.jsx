/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import DataHelper from '@utils/date-helper';
import { useSelector } from 'react-redux';
import { TitleHeader, Title2 } from '../typography';
import Button from '../Button';

function CalendarDialog({ visible, onDismiss, onPress }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const inicialValues = DataHelper().format('DD-MMMM-YYYY').split('-');
  const inicialDay = DataHelper().format('YYYY-MM-DD');
  const [year, setYear] = useState(inicialValues[2]);
  const [month, setMonth] = useState(`${inicialValues[1]} ${inicialValues[2]}`);
  const [selectedDay, setSelectedDay] = useState(inicialDay);
  const darkMode = useSelector((state) => state.mode.darkMode);

  const deviceWidth = Dimensions.get('window').width;
  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode
        ? 'rgba(255,255,255,0.6)'
        : 'rgba(0, 0, 0, 0.4)',
    },
    modalBox: {
      width: deviceWidth - 64,
      backgroundColor: colors.background,
      borderRadius: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16,
    },
    viewStyle: { paddingHorizontal: 20 },
    buttonStyle: { width: 200 },
  });

  function selectMonth(value) {
    const valueDate = `${value.month}/${value.day}/${value.year}`;
    const monthName = DataHelper(valueDate).format('MMMM');
    setYear(value.year);
    setMonth(`${monthName} ${value.year}`);
  }

  const handleClick = () => {
    onPress(selectedDay);
  };

  LocaleConfig.locales.default = {
    monthNames: [
      t('calendar:monthNames:january'),
      t('calendar:monthNames:february'),
      t('calendar:monthNames:march'),
      t('calendar:monthNames:april'),
      t('calendar:monthNames:may'),
      t('calendar:monthNames:june'),
      t('calendar:monthNames:july'),
      t('calendar:monthNames:august'),
      t('calendar:monthNames:september'),
      t('calendar:monthNames:october'),
      t('calendar:monthNames:november'),
      t('calendar:monthNames:december'),
    ],
    monthNamesShort: [
      t('calendar:monthNamesShort:jan'),
      t('calendar:monthNamesShort:fev'),
      t('calendar:monthNamesShort:mar'),
      t('calendar:monthNamesShort:apr'),
      t('calendar:monthNamesShort:may'),
      t('calendar:monthNamesShort:jun'),
      t('calendar:monthNamesShort:jul'),
      t('calendar:monthNamesShort:aug'),
      t('calendar:monthNamesShort:sep'),
      t('calendar:monthNamesShort:oct'),
      t('calendar:monthNamesShort:nov'),
      t('calendar:monthNamesShort:dec'),
    ],
    dayNames: [
      t('calendar:dayNames:sunday'),
      t('calendar:dayNames:monday'),
      t('calendar:dayNames:tuesday'),
      t('calendar:dayNames:wednesday'),
      t('calendar:dayNames:thursday'),
      t('calendar:dayNames:friday'),
      t('calendar:dayNames:saturday'),
    ],
    dayNamesShort: [
      t('calendar:dayNamesShort:sun'),
      t('calendar:dayNamesShort:mon'),
      t('calendar:dayNamesShort:tue'),
      t('calendar:dayNamesShort:wed'),
      t('calendar:dayNamesShort:thu'),
      t('calendar:dayNamesShort:fri'),
      t('calendar:dayNamesShort:sat'),
    ],
    today: t('calendar:today:today'),
  };
  LocaleConfig.defaultLocale = 'default';

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onDismiss={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalBox}>
              <ScrollView
                bounces={false}
                scrollEventThrottle={1}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.header}>
                  <Title2 color={colors.secondary}>{year}</Title2>
                  <TitleHeader color={colors.secondary}>{month}</TitleHeader>
                </View>

                <Calendar
                  current={selectedDay}
                  theme={{
                    calendarBackground: colors.background,
                    textSectionTitleColor: colors.reverseBackground,
                    dayTextColor: colors.reverseBackground,
                    monthTextColor: colors.reverseBackground,
                    arrowColor: colors.reverseBackground,
                    todayTextColor: colors.primary,
                    textDayFontSize: 14,
                    textDayHeaderFontSize: 11,
                    textMonthFontSize: 16,
                    'stylesheet.calendar.header': {
                      week: {
                        marginTop: 25,
                        marginBottom: 18,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                    },
                  }}
                  markedDates={{
                    [selectedDay]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: colors.primary,
                      selectedTextColor: colors.background,
                    },
                  }}
                  enableSwipeMonths
                  hideExtraDays
                  onMonthChange={(value) => {
                    selectMonth(value);
                  }}
                  onDayPress={(value) => {
                    setSelectedDay(value.dateString);
                  }}
                />

                <View style={styles.buttonContainer}>
                  <Button
                    title={t('form:label.cancel')}
                    onPress={onDismiss}
                    mode="outlined"
                    textColor="red"
                    titleFamily="medium"
                    viewStyle={styles.viewStyle}
                  />
                  <Button
                    title={t('form:label.select')}
                    onPress={() => handleClick()}
                    viewStyle={styles.viewStyle}
                    style={styles.buttonStyle}
                  />
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

CalendarDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onDismiss: PropTypes.func,
};

CalendarDialog.defaultProps = {
  onDismiss: () => {},
};

export default CalendarDialog;
