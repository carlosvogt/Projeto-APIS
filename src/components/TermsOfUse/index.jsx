import React from 'react';
import { Title2 } from '@components/typography';
import { StyleSheet, View } from 'react-native';
import { t } from 'i18next';

function TermsOfUse() {
  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    titleMargin: {
      marginVertical: 10,
    },
    marginBottom: {
      marginBottom: 10,
    },
  });

  return (
    <>
      <View style={styles.marginBottom}>
        <Title2 family="medium" justify>
          {t('termsOfUse:about')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:description1')}</Title2>
      <Title2 justify>{t('termsOfUse:description2')}</Title2>
      <View style={styles.titleMargin}>
        <Title2 family="medium" justify>
          {t('termsOfUse:1')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:1.1')}</Title2>
      <Title2 justify>{t('termsOfUse:1.2')}</Title2>
      <Title2 justify>{t('termsOfUse:1.3')}</Title2>
      <Title2 justify>{t('termsOfUse:1.4')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.1')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.1.1')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.1.2')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.1.3')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.1')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.2')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.2.1')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.2.2')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.2.3')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.2.4')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.3')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.4')}</Title2>
      <Title2 justify>{t('termsOfUse:1.5.2.5')}</Title2>
      <View style={styles.titleMargin}>
        <Title2 family="medium" justify>
          {t('termsOfUse:2')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:2.1')}</Title2>
      <Title2 justify>{t('termsOfUse:2.2')}</Title2>
      <Title2 justify>{t('termsOfUse:2.3')}</Title2>
      <Title2 justify>{t('termsOfUse:2.4')}</Title2>
      <Title2 justify>{t('termsOfUse:2.5')}</Title2>
      <Title2 justify>{t('termsOfUse:2.6')}</Title2>
      <Title2 justify>{t('termsOfUse:2.7')}</Title2>
      <Title2 justify>{t('termsOfUse:2.8')}</Title2>
      <View style={styles.titleMargin}>
        <Title2 family="medium" justify>
          {t('termsOfUse:3')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:3.1')}</Title2>
      <View style={styles.titleMargin}>
        <Title2 family="medium" justify>
          {t('termsOfUse:4')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:4.1')}</Title2>
      <Title2 justify>{t('termsOfUse:4.2')}</Title2>
      <Title2 justify>{t('termsOfUse:4.3')}</Title2>
      <Title2 justify>{t('termsOfUse:4.4')}</Title2>
      <View style={styles.titleMargin}>
        <Title2 family="medium" justify>
          {t('termsOfUse:5')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:5.1')}</Title2>
      <Title2 justify>{t('termsOfUse:5.2')}</Title2>
      <View style={styles.titleMargin}>
        <Title2 justify family="medium">
          {t('termsOfUse:6')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:6.1')}</Title2>
      <Title2 justify>{t('termsOfUse:6.2')}</Title2>
      <Title2 justify>{t('termsOfUse:6.3')}</Title2>
      <View style={styles.titleMargin}>
        <Title2 justify family="medium">
          {t('termsOfUse:7')}
        </Title2>
      </View>
      <Title2 justify>{t('termsOfUse:7.1')}</Title2>
      <Title2 justify>{t('termsOfUse:7.2')}</Title2>
    </>
  );
}
export default TermsOfUse;
