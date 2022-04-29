/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react';
import { useTheme } from '@theme';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Title2, TitleHeader, Title1, Title6 } from '@components/typography';
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
      borderRadius: 10,
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
      borderRadius: 10,
      backgroundColor: colors.secondary,
      paddingVertical: 8,
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    apiaryListContainer: {
      borderWidth: darkMode ? 0 : 1,
      borderColor: colors.primary,
      borderRadius: 12,
      backgroundColor: colors.secondary,
      paddingTop: 8,
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    disabledApiaryListContainer: {
      borderWidth: darkMode ? 0 : 1,
      borderColor: colors.lightGray,
      borderRadius: 12,
      backgroundColor: colors.secondary,
      paddingTop: 8,
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    apiaryContainerNoData: {
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
      marginTop: 8,
      paddingLeft: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: colors.primary,
    },
    disabledSubContainer: {
      marginTop: 8,
      paddingLeft: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: colors.lightGray,
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
    apiaryInfo: { marginVertical: 16 },
    lastModify: { alignItems: 'flex-start' },
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
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
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
      {mode === 'disabledApiary' && (
        <View style={styles.disabledApiaryListContainer}>
          <TouchableOpacity onPress={() => onPress()}>
            <Title1 centered color={colors.lightGray} family="medium">
              {`${t('translations:textApiary')} ${data.name}`}
            </Title1>
            {data.phone !== '' && (
              <Title2 centered color={colors.primary}>
                {`${t('translations:textOwnerPhone')} ${data.phone}`}
              </Title2>
            )}
            <View style={styles.disabledSubContainer}>
              <TitleHeader color={colors.secondary} family="medium" centered>
                {`${t('translations:textCapacity')} ${data.totalPlaces}`}
              </TitleHeader>
              <TitleHeader color={colors.secondary} family="medium" centered>
                {t('translations:inactivatedApiary')}
              </TitleHeader>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {mode === 'apiary' &&
        (hasData ? (
          <View style={styles.apiaryListContainer}>
            <TouchableOpacity onPress={() => onPress()}>
              <Title1 centered color={colors.primary} family="medium">
                {`${t('translations:textApiary')} ${data.name}`}
              </Title1>
              {data.phone !== '' && (
                <Title2 centered color={colors.primary}>
                  {`${t('translations:textOwnerPhone')} ${data.phone}`}
                </Title2>
              )}
              <View style={styles.subContainer}>
                <TitleHeader color={colors.secondary} family="medium" centered>
                  {`${t('translations:textCapacity')} ${data.totalPlaces}`}
                </TitleHeader>
                <Title2 color={colors.secondary} family="medium" centered>
                  {`${t('translations:textInstalled')} ${
                    data.quantityFull
                  }  |  ${t('translations:textAvailable')} ${emptyPlaces}`}
                </Title2>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.apiaryContainerNoData}>
            <TitleHeader centered family="medium" color={colors.primary}>
              {t('translations:noApiari')}
            </TitleHeader>
          </View>
        ))}

      {mode === 'note' &&
        (hasData ? (
          <View style={styles.container}>
            <View style={styles.closedContainer}>
              <View style={styles.leftContainer}>
                <Title1 color={colors.primary} family="medium">
                  {data.title || t('translations:noTitle')}
                </Title1>
                <View style={styles.lastModify}>
                  <Title6 family="medium" color={colors.primary}>
                    {data.lastModify}
                  </Title6>
                </View>
                <View style={styles.marginTop}>
                  <Title2 color={colors.primary}>
                    {data.description || t('translations:noTitle')}
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
          <View style={styles.apiaryContainerNoData}>
            <TitleHeader centered family="medium" color={colors.primary}>
              {t('translations:noNoteTitle')}
            </TitleHeader>
          </View>
        ))}

      {mode === 'noteList' &&
        (hasData ? (
          <View style={styles.noteListContainer}>
            <View style={styles.closedContainer}>
              <View style={styles.leftContainer}>
                <View style={styles.marginTop}>
                  <Title1 color={colors.primary} family="medium">
                    {data.title || t('translations:noTitle')}
                  </Title1>
                </View>
                <View style={styles.lastModify}>
                  <Title6 family="medium" color={colors.primary}>
                    {data.lastModify}
                  </Title6>
                </View>

                <View style={styles.marginTop}>
                  <Title2 color={colors.primary}>
                    {data.description || t('translations:noTitle')}
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
          <View style={styles.apiaryContainerNoData}>
            <TitleHeader family="medium" color={colors.primary}>
              {t('translations:noNoteTitle')}
            </TitleHeader>
          </View>
        ))}

      {mode === 'production' &&
        (hasData ? (
          <View style={styles.noteListContainer}>
            <View style={styles.closedContainer}>
              <View style={styles.leftContainer}>
                <View style={styles.marginTop}>
                  <Title1 color={colors.primary} family="medium">
                    {data.name || t('translations:noTitle')}
                  </Title1>
                </View>
                <View style={styles.lastModify}>
                  <Title6 family="medium" color={colors.primary}>
                    {data.lastModify}
                  </Title6>
                </View>

                <View style={styles.marginTop}>
                  <>
                    <Title2 color={colors.primary}>
                      {`${t('translations:textDate')} ${data.date}`}
                      {`${t('translations:textQtd')} ${data.qtd}`}
                      {t('translations:textKg')}
                    </Title2>
                    <Title2 color={colors.primary}>
                      {`${t('translations:textPayed')} ${data.payed}`}
                      {`${t('translations:textQtd')} ${
                        data.payedQtd || '0'
                      } ${t('translations:textKg')}`}
                    </Title2>
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
          <View style={styles.apiaryContainerNoData}>
            <TitleHeader family="medium" color={colors.primary}>
              {t('translations:noProduction')}
            </TitleHeader>
          </View>
        ))}
      {mode === 'apiaryDescription' && (
        <View style={styles.apiaryDescriptionContainer}>
          <View style={styles.closedContainer}>
            <View style={styles.leftContainer}>
              <Title1 color={colors.primary} family="medium" centered>
                {`${t('translations:textApiary')} ${data.name}`}
              </Title1>
              <View style={styles.apiaryInfo}>
                <Title2 color={colors.primary} family="medium" centered>
                  {`${t('translations:textOwner')} ${data.owner}`}
                </Title2>
                {data.ownerPercent !== '' && (
                  <Title2 color={colors.primary} family="medium" centered>
                    {`${t('translations:textOwnerPercent')} ${
                      data.ownerPercent
                    }%`}
                  </Title2>
                )}
                {data.phone !== '' && (
                  <Title2 color={colors.primary} family="medium" centered>
                    {`${t('translations:textOwnerPhone')} ${data.phone}`}
                  </Title2>
                )}
                <Title2 color={colors.primary} family="medium" centered>
                  {`${t('translations:textAddress')} ${data.city} - ${
                    data.state
                  }`}
                </Title2>
              </View>
              <TitleHeader color={colors.primary} family="medium" centered>
                {`${t('translations:textCapacity')} ${data.totalPlaces}`}
              </TitleHeader>
              <Title2 color={colors.primary} family="medium" centered>
                {`${t('translations:textInstalled')} ${
                  data.quantityFull
                }  |  ${t('translations:textAvailable')} ${emptyPlaces}`}
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
    'disabledApiary',
  ]),
};

ExpensiveNote.defaultProps = {
  mode: 'note',
};

export default ExpensiveNote;
