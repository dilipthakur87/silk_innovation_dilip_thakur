import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


import { Images, Metrics } from '../../themes'
import { removeToken } from '../../utils/LocalStorage'

export default function Dashboard(props) {
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Dashboard Page</Text>
      <TouchableOpacity
        style={[Metrics.defaultMargin, Metrics.tinyHorizontalPadding]}
        onPress={() => {
          removeToken(props)
        }} 
      >
        <Image source={Images.logout} style={{ width: 25, height: 25 }} resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
