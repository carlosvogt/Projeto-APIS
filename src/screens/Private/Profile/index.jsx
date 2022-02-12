import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

function Profile() {
  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <Text>Tela de configuração</Text>
    </ScrollView>
  );
}
export default Profile;
