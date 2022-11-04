import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

export const DropdownComp = props => {
  const {title, payloadKey, placeholder, values, error} = props.item;

  const onValueChange = item => {
    props.onValueChange ? props.onValueChange(item.value, payloadKey) : null;
  };

  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>{title}</Text>
      <Dropdown
        renderItem={(item, selected) => {
          return (
            <Text style={selected ? styles.bold : styles.normal}>
              {item.value}
            </Text>
          );
        }}
        labelField="value"
        data={values}
        placeholder={placeholder}
        valueField="value"
        value={props.formPayload[payloadKey]}
        onChange={onValueChange}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  input: {
    height: 50,
    padding: 12,
  },
  error: {
    fontSize: 10,
    color: 'red',
  },
  bold: {
    fontWeight: 'bold',
  },
  normal: {},
});
