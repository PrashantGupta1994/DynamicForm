import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DropdownComp} from '../components/DropdownComp';
import {InputComp} from '../components/InputComp';
import {ELEMENT_TYPE} from '../helper/utils';
import {saveFormData, onButtonClick, onPageDataChange} from '../redux/actions';

export const Home = props => {
  const dispatch = useDispatch();
  const {formData, step, pageData, formPayload} = useSelector(state => state);
  const lastPage = step === formData.length - 1;

  // 1. `pageData` is Map with key as page number (step) and value as array of UI elements,
  //    any additional dynamic UI that needs to be shown in UI is kept as value in array.
  //    [[1, [INPUT 1, INPUT 2]], [2, [INPUT 1]], [3, [DROPDOWN, DROPDOWN 1, DROPWDOWN 2]]]
  //
  // 2. at first or re-render check if UI is available on Map (if user has intracted with that page),
  //    if not than get UI from formData.
  //
  let currentPage = pageData.get(step) || formData[step];

  const onFormValueChange = (data, payloadKey, item) => {
    // if current intracted UI has any child UI that needs to be drawn
    if (item?.onSelection) {
      // check if its already available on the page
      const hasItem = currentPage.some(elm => elm.id === item.onSelection.id);
      // if not available, push new UI element to map array
      !hasItem ? currentPage.push(item.onSelection) : null;
    } else if (item?.parentId) {
      // if no child UI available, than redraw UI with its parent
      const parentElmIndex = currentPage.findIndex(
        elm => elm.id === item.parentId,
      );
      currentPage = currentPage.slice(0, parentElmIndex + 1);
    }
    dispatch(onPageDataChange(pageData.set(step, currentPage)));

    const params = {value: data, payloadKey: payloadKey};
    dispatch(saveFormData(params));
  };

  const onNextClick = () => {
    // validation
    currentPage.forEach(element => {
      const value = formPayload[element.payloadKey];
      if (element.isRequired && !value) {
        element.error = 'Required';
      } else {
        // validation with values
        if (value < element.min || value > element.max) {
          element.error = `value must be between ${element.min} and ${element.max}`;
        } else {
          element.error = null;
        }
      }
    });
    // if any error found, redraw page
    const hasError = currentPage.some(item => item.error);
    if (hasError) {
      dispatch(onPageDataChange(pageData.set(step, currentPage)));
    } else {
      lastPage ? console.log(formPayload) : dispatch(onButtonClick(1));
    }
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <Text style={styles.stepContainer}>{`Steps: ${step}/${
        formData.length - 1
      }`}</Text>
      <View style={styles.header}>
        {currentPage.map((item, index) => {
          switch (item.type) {
            case ELEMENT_TYPE.INPUT:
              return (
                <InputComp
                  key={index}
                  item={item}
                  formPayload={formPayload}
                  onValueChange={onFormValueChange}
                />
              );
            case ELEMENT_TYPE.DROPDOWN:
              return (
                <DropdownComp
                  key={index}
                  item={item}
                  formPayload={formPayload}
                  onValueChange={onFormValueChange}
                />
              );
            default:
              return null;
          }
        })}
      </View>
      <View style={styles.footer}>
        {step > 1 && (
          <Button
            style={{flex: 1}}
            textColor={'black'}
            mode="outlined"
            onPress={() => dispatch(onButtonClick(0))}>
            Back
          </Button>
        )}
        <Button
          style={{flex: 1}}
          textColor={'white'}
          mode="contained"
          onPress={onNextClick}>
          {lastPage ? 'Submit' : 'Next'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  stepContainer: {
    padding: 12,
    fontSize: 16,
  },
  header: {
    flex: 1,
  },
  footer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
