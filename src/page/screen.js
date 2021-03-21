import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function PageNameReplace() {
  return (
    <View style={styles.rootContainer}>
      <Text>PageNameReplace</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(PageNameReplace);
