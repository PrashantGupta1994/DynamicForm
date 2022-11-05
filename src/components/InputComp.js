import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

export const InputComp = props => {
  const {title, placeholder, payloadKey, error} = props.item;

  const onChangeText = value => {
    props.onValueChange ? props.onValueChange(value, payloadKey) : null;
  };

  return (
    <View style={styles.conatiner}>
      <TextInput
        label={title}
        mode={'outlined'}
        style={styles.input}
        value={props.formPayload[payloadKey] || ''}
        placeholder={placeholder || ''}
        keyboardType={'default'}
        onChangeText={onChangeText}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'black',
  },
  conatiner: {
    padding: 12,
  },
  input: {},
  error: {
    fontSize: 12,
    color: 'red',
  },
});
