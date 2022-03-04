/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react';
import { useTheme } from '@theme';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Title2, TitleHeader, Title1 } from '@components/typography';
import { useTranslation } from 'react-i18next';
import { More } from '@assets';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function ExpensiveNote({
  hasData,
  modalOptions,
  mode,
  setSelectedCode,
  selectedCode,
  onPress,
  data,
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const darkMode = useSelector((state) => state.mode.darkMode);
  const emptyPlaces = Number(data?.totalPlaces) - Number(data?.quantityFull);

  const styles = StyleSheet.create({
    container: {
      borderWidth: darkMode ? 0 : 1,
      borderColor: colors.primary,
      borderRadius: 20,
      backgroundColor: colors.secondary,
      paddingVertical: 8,
      paddingLeft: 16,
      paddingRight: 8,
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    apiaryContainer: {
      borderWidth: darkMode ? 0 : 1,
      borderColor: colors.primary,
      borderRadius: 20,
      backgroundColor: colors.secondary,
      paddingVertical: 8,
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    noData: {
      backgroundColor: colors.secondary,
      alignItems: 'center',
      marginHorizontal: 1,
    },
    noteListContainer: {
      borderBottomWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.secondary,
      paddingBottom: 8,
      marginHorizontal: 20,
      justifyContent: 'space-between',
    },
    apiaryDescriptionContainer: {
      paddingBottom: 8,
      marginHorizontal: 20,
      justifyContent: 'space-between',
    },
    closedContainer: {
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    subContainer: {
      flexDirection: 'row',
      paddingTop: 10,
      justifyContent: 'space-around',
      paddingLeft: 5,
    },
    emptyApiari: {
      paddingTop: 10,
    },
    leftContainer: { flex: 1 },
    rightContainer: {
      justifyContent: 'center',
      paddingHorizontal: 8,
      alignSelf: 'center',
    },
    noteListRightContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
    },
    menu: {
      height: 55,
      width: 30,
    },
    marginTop: {
      marginTop: 8,
    },
  });

  const triggerStyles = {
    triggerOuterWrapper: {
      flex: 1,
    },
    triggerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
  };

  const optionsStyles = {
    optionsContainer: {
      paddingVertical: 8,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      width: 'auto',
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.secondary,
      elevation: 10,
    },
    optionWrapper: {
      marginVertical: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
  };

  const renderItem = (item) => {
    return (
      <MenuOption
        key={item.option}
        onSelect={item.onClick}
        text={item.option}
        color={colors.error}
        customStyles={{
          optionText: {
            color: item.delete === true ? colors.error : colors.primary,
            fontWeight: item.delete === true ? 'bold' : 'normal',
            fontSize: 16,
          },
        }}
      />
    );
  };

  return (
    <>
      {mode === 'apiary' &&
        (hasData ? (
          <View style={styles.apiaryContainer}>
            <TouchableOpacity onPress={() => onPress()}>
              <TitleHeader centered color={colors.primary}>
                {`${t('form:expensiveNote.apiary')} ${data.name}`}
              </TitleHeader>
              <Title2 centered color={colors.primary}>
                {`${t('form:expensiveNote.ownerPhone')} ${data.phone}`}
              </Title2>
              <View style={styles.subContainer}>
                <Title2 color={colors.primary}>{`${t(
                  'form:expensiveNote.hive',
                )} ${data.quantityFull}`}</Title2>
                <Title2 color={colors.primary}>{`${t(
                  'form:expensiveNote.emptyPlaces',
                )}${emptyPlaces}`}</Title2>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.apiaryContainer}>
            <Title2 centered family="medium" color={colors.primary}>
              {t('form:expensiveNote.noApiari')}
            </Title2>
            <View style={styles.emptyApiari}>
              <Title2 centered color={colors.primary}>
                {t('form:expensiveNote.noApiariBody')}
              </Title2>
            </View>
          </View>
        ))}

      {mode === 'note' &&
        (hasData ? (
          <View style={styles.container}>
            <View style={styles.closedContainer}>
              <View style={styles.leftContainer}>
                <TitleHeader color={colors.primary}>
                  {data.name || t('form:expensiveNote.noTitle')}
                </TitleHeader>
                <View style={styles.marginTop}>
                  <Title2 color={colors.primary}>
                    {data.note || t('form:expensiveNote.noTitle')}
                  </Title2>
                </View>
              </View>
              <TouchableOpacity style={styles.rightContainer}>
                <Menu style={styles.menu}>
                  <MenuTrigger
                    customStyles={triggerStyles}
                    onPress={() => setSelectedCode(selectedCode)}
                  >
                    <More color={colors.primary} />
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles}>
                    {modalOptions.map((item) => renderItem(item))}
                  </MenuOptions>
                </Menu>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <TitleHeader centered family="medium" color={colors.primary}>
              {t('form:expensiveNote.noNoteTitle')}
            </TitleHeader>
            <View style={styles.emptyApiari}>
              <Title2 centered color={colors.primary}>
                {t('form:expensiveNote.noApiariBody')}
              </Title2>
            </View>
          </View>
        ))}

      {mode === 'noteList' &&
        (hasData ? (
          <View style={styles.noteListContainer}>
            <View style={styles.closedContainer}>
              <View style={styles.leftContainer}>
                <TitleHeader color={colors.primary}>
                  {data.name || t('form:expensiveNote.noTitle')}
                </TitleHeader>
                <View>
                  <Title2 color={colors.primary}>
                    {data.note || t('form:expensiveNote.noTitle')}
                  </Title2>
                </View>
              </View>
              <TouchableOpacity style={styles.noteListRightContainer}>
                <Menu style={styles.menu}>
                  <MenuTrigger
                    customStyles={triggerStyles}
                    onPress={() => setSelectedCode(selectedCode)}
                  >
                    <More color={colors.primary} />
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles}>
                    {modalOptions.map((item) => renderItem(item))}
                  </MenuOptions>
                </Menu>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.noData}>
            <TitleHeader family="medium" color={colors.primary}>
              {t('form:expensiveNote.noNoteTitle')}
            </TitleHeader>
            <View style={styles.emptyApiari}>
              <Title2 color={colors.primary}>
                {t('form:expensiveNote.noApiariBody')}
              </Title2>
            </View>
          </View>
        ))}

      {mode === 'production' &&
        (hasData ? (
          <View style={styles.noteListContainer}>
            <View style={styles.closedContainer}>
              <View style={styles.leftContainer}>
                <TitleHeader color={colors.primary}>
                  {data.name || t('apiaries:home.noTitle')}
                </TitleHeader>
                <View>
                  <>
                    <Title2 color={colors.primary}>
                      {`${t('form:expensiveNote.date')} ${data.date}`}
                      {`${t('form:expensiveNote.qtd')} ${data.qtd}`}
                      {t('form:expensiveNote.kg')}
                    </Title2>
                    {data.payed || data.payedQtd ? (
                      <Title2 color={colors.primary}>
                        {`${t('form:expensiveNote.payed')} ${
                          data.payed || t('form:expensiveNote.notInformed')
                        }`}
                        {`${t('form:expensiveNote.qtd')} ${
                          data.payedQtd || t('form:expensiveNote.notInformed')
                        } ${t('form:expensiveNote.kg')}`}
                      </Title2>
                    ) : null}
                  </>
                </View>
              </View>
              <TouchableOpacity style={styles.noteListRightContainer}>
                <Menu style={styles.menu}>
                  <MenuTrigger
                    customStyles={triggerStyles}
                    onPress={() => setSelectedCode(selectedCode)}
                  >
                    <More color={colors.primary} />
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles}>
                    {modalOptions.map((item) => renderItem(item))}
                  </MenuOptions>
                </Menu>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.noData}>
            <TitleHeader family="medium" color={colors.primary}>
              {t('form:expensiveNote.noProduction')}
            </TitleHeader>
            <View style={styles.emptyApiari}>
              <Title2 color={colors.primary}>
                {t('form:expensiveNote.noApiariBody')}
              </Title2>
            </View>
          </View>
        ))}
      {mode === 'apiaryDescription' && (
        <View style={styles.apiaryDescriptionContainer}>
          <View style={styles.closedContainer}>
            <View style={styles.leftContainer}>
              <Title1 color={colors.primary} family="medium">
                {`${t('form:expensiveNote.apiary')} ${data.name}`}
              </Title1>
              <Title2 color={colors.primary} family="medium">
                {`${t('form:expensiveNote.address')} ${data.city}/${
                  data.state
                }`}
              </Title2>
              <Title2 color={colors.primary} family="medium">
                {`${t('form:expensiveNote.fullPlaces')} ${data.quantityFull}`}
              </Title2>
              <Title2 color={colors.primary} family="medium">
                {`${t('form:expensiveNote.emptyPlaces')} ${emptyPlaces}`}
              </Title2>
              <Title2 color={colors.primary} family="medium">
                {`${t('form:expensiveNote.owner')} ${data.owner}`}
              </Title2>
              <Title2 color={colors.primary} family="medium">
                {`${t('form:expensiveNote.ownerPhone')} ${data.phone}`}
              </Title2>
              <Title2 color={colors.primary} family="medium">
                {`${t('form:expensiveNote.ownerPercent')} ${
                  data.ownerPercent
                }%`}
              </Title2>
            </View>
            <TouchableOpacity style={styles.noteListRightContainer}>
              <Menu style={styles.menu}>
                <MenuTrigger customStyles={triggerStyles}>
                  <More color={colors.primary} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  {modalOptions.map((item) => renderItem(item))}
                </MenuOptions>
              </Menu>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

ExpensiveNote.propTypes = {
  mode: PropTypes.oneOf([
    'note',
    'apiary',
    'noteList',
    'production',
    'apiaryDescription',
  ]),
};

ExpensiveNote.defaultProps = {
  mode: 'note',
};

export default ExpensiveNote;
