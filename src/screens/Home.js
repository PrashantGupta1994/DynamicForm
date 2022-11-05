import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DropdownComp} from '../components/DropdownComp';
import {InputComp} from '../components/InputComp';
import {ELEMENT_TYPE} from '../helper/utils';
import { saveFormData, onButtonClick, onPageDataChange } from '../redux/actions';

export const Home = props => {
  const dispatch = useDispatch();
  const { formData, step, pageData, formPayload} = useSelector(state => state);
  const lastPage = step === formData.length - 1;

  let currentPage = pageData.get(step) || formData[step];

  const onFormValueChange = (data, payloadKey, item) => {
    if (item?.onSelection) {
      const hasItem = currentPage.some(elm => elm.id === item.onSelection.id);
      !hasItem ? currentPage.push(item.onSelection) : null
    } else if (item?.parentId) {
      const parentElmIndex = currentPage.findIndex(elm => elm.id === item.parentId);
      currentPage = currentPage.slice(0, parentElmIndex + 1);
    }
    dispatch(onPageDataChange(pageData.set(step, currentPage)));

    const params = { value: data, payloadKey: payloadKey };
    dispatch(saveFormData(params));
  };

  const onNextClick = () => { 
    currentPage.forEach(element => {
      const value = formPayload[element.payloadKey];
      if (element.isRequired && !value) {
        element.error = 'Required';
      } else {
        if (value < element.min || value > element.max) {
          element.error = `value must be between ${element.min} and ${element.max}`;
        } else {
          element.error = null;
        }
      }
    });
    const hasError = currentPage.some(item => item.error);
    if (hasError) {
      dispatch(onPageDataChange(pageData.set(step, currentPage)));
    } else {
      lastPage ? console.log(formPayload) : dispatch(onButtonClick(1));
    }
  };

  return (
    <SafeAreaView style={styles.conatiner}>
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
          <Button onPress={() => dispatch(onButtonClick(0))}>Back</Button>
        )}
        <Button onPress={onNextClick}>{lastPage ? 'Submit' : 'Next'}</Button>
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
  header: {
    flex: 1,
  },
});
