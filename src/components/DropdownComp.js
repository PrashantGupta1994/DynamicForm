import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

export const DropdownComp = props => {
  const {title, payloadKey, placeholder, values, error} = props.item;

  const onValueChange = item => {
    // check if `onValueChange` cb is available to send -
    // value, payloadKey, and child element to draw
    props.onValueChange
      ? props.onValueChange(item.value, payloadKey, item)
      : null;
  };

  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>{title}</Text>
      <Dropdown
        style={styles.dropdown}
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
    // flex: 1,
    padding: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
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
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  normal: {
    padding: 8,
    fontSize: 16,
  },
});
