import React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';

export const InputComp = props => {
  const {title, placeholder, payloadKey, error} = props.item;

  const onChangeText = value => {
    props.onValueChange ? props.onValueChange(value, payloadKey) : null;
  };

  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={props.formPayload[payloadKey]}
        placeholder={placeholder || ''}
        keyboardType={'default'}
        onChangeText={onChangeText}
      />
      {error && <Text style={styles.error}>* Required</Text>}
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
  input: {
    height: 50,
    padding: 12,
  },
  error: {
    fontSize: 10,
    color: 'red',
  },
});
