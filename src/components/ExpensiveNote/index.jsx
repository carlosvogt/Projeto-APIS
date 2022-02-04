import React, { useState } from 'react';
import { useTheme } from '@theme';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Title2, TitleHeader, Title4 } from '@components/typography';
import { useTranslation } from 'react-i18next';
import { More } from '@assets';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import PropTypes from 'prop-types';

function ExpensiveNote({
  name,
  qtdEmpty,
  qtdOccupy,
  notes,
  hasData,
  modalOptions,
  mode,
  setSelectedCode,
  selectedCode,
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [status, setStatus] = useState(false);

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 20,
      backgroundColor: colors.background,
      paddingVertical: 16,
      paddingLeft: 16,
      paddingRight: 8,
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    closedContainer: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    subContainer: {
      flexDirection: 'row',
      paddingTop: 10,
      justifyContent: 'space-between',
      paddingLeft: 5,
    },
    emptyApiari: {
      paddingTop: 10,
    },
    noteContainer: {
      paddingTop: 10,
    },
    leftContainer: { flex: 1 },
    rightContainer: {
      justifyContent: 'center',
      paddingHorizontal: 8,
      alignSelf: 'center',
    },
    openContainer: {
      paddingTop: 10,
      paddingLeft: 5,
      borderTopWidth: 1,
      marginTop: 16,
      borderTopColor: colors.primary,
    },
    menu: {
      height: 50,
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
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.secondary,
    },
    optionWrapper: {
      marginVertical: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      color: colors.primary,
    },
  };

  const renderItem = (item) => {
    return (
      <MenuOption
        key={item.option}
        onSelect={item.onClick}
        text={item.option}
      />
    );
  };

  return (
    <>
      {mode === 'apiary' &&
        (hasData ? (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setStatus(!status)}>
              <View style={styles.closedContainer}>
                <View style={styles.leftContainer}>
                  <TitleHeader color={colors.primary}>
                    {name || t('form:expensiveNote.noTitle')}
                  </TitleHeader>
                  <View style={styles.subContainer}>
                    <Title2 color={colors.primary}>{`${t(
                      'form:expensiveNote.hive',
                    )} ${qtdOccupy}`}</Title2>
                    <Title2 color={colors.primary}>{`${t(
                      'form:expensiveNote.emptyPlaces',
                    )}${qtdEmpty}`}</Title2>
                  </View>
                  {status &&
                    (notes.length > 0 ? (
                      notes.map((item) => {
                        return (
                          <View key={item.code} style={styles.openContainer}>
                            <Title4 color={colors.primary}>
                              {item.nome || t('form:expensiveNote.noTitle')}
                            </Title4>
                            <View style={styles.noteContainer}>
                              <Title2 color={colors.primary}>
                                {item.note}
                              </Title2>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <View style={styles.openContainer}>
                        <Title4 color={colors.primary}>
                          {t('form:expensiveNote.noNoteTitle')}
                        </Title4>
                        <View style={styles.noteContainer}>
                          <Title2 color={colors.primary}>
                            {t('form:expensiveNote.noNoteBody')}
                          </Title2>
                        </View>
                      </View>
                    ))}
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
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <Title2 family="medium" color={colors.primary}>
              {t('form:expensiveNote.noApiari')}
            </Title2>
            <View style={styles.emptyApiari}>
              <Title2 color={colors.primary}>
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
                  {name || t('form:expensiveNote.noTitle')}
                </TitleHeader>
                <View style={styles.marginTop}>
                  <Title2 color={colors.primary}>
                    {notes || t('form:expensiveNote.noTitle')}
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
    </>
  );
}

ExpensiveNote.propTypes = {
  mode: PropTypes.oneOf(['note', 'apiary']),
};

ExpensiveNote.defaultProps = {
  mode: 'note',
};

export default ExpensiveNote;
