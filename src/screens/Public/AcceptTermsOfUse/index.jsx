import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Button, useToast, TermsOfUse } from '@components';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Footer, Header } from '@components/layout';
import { useTheme } from '@theme';

function AcceptTermsOfUse() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();
  const deviceWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: -10,
    },
    buttonStyle: { width: deviceWidth * 0.45 },
  });

  const handleCreateAccount = () => {
    const acceptedAt = Date();
    navigation.navigate('CreateAccountPersonalInfo', {
      params: { accepted: true, acceptedAt },
    });
  };

  const handleDisagreeTerms = () => {
    navigation.goBack();
    toast.error(t('translations:termsDisagree'));
  };

  return (
    <>
      <Header title={t('termsOfUse:title')} />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <TermsOfUse />
        </Container>
      </ScrollView>

      <View style={{ margin: 8 }}>
        <Footer withBorder={false} style={styles.footer}>
          <View style={{ flex: 1 }}>
            <Button
              title={t('translations:reject')}
              onPress={() => handleDisagreeTerms()}
              mode="outlined"
              textColor={colors.error}
              titleFamily="medium"
            />
          </View>
          <View>
            <Button
              title={t('translations:accept')}
              onPress={() => handleCreateAccount()}
              style={styles.buttonStyle}
            />
          </View>
        </Footer>
      </View>
    </>
  );
}
export default AcceptTermsOfUse;
