import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dot from './Dot';

function Dots({ total, active }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((value, index) => (
        <Dot key={index.toString()} isActive={active >= index} />
      ))}
    </View>
  );
}

Dots.defaultProps = {
  active: 0,
};

export default Dots;
