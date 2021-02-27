import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 2
  }
});

const StarBalance = ({ style }) => {
  const [stars, setStars] = React.useState(0);

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc('CMEHDWOQeCbiCozYSewT')
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        setStars(data.stars ?? 0);
      });

    return () => subscriber();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <MaterialIcons name='star' size={24} color='#FFD700' />
      <Text style={styles.text}>{stars}</Text>
    </View>
  );
};

export default StarBalance;