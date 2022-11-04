import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DropdownComp} from '../components/DropdownComp';
import {InputComp} from '../components/InputComp';
import {ELEMENT_TYPE} from '../helper/utils';
import {saveFormData, onButtonClick} from '../redux/actions';

export const Home = props => {
  const dispatch = useDispatch();
  const {formData, step, formPayload} = useSelector(state => state);
  let currentPage = formData[step];
  const [fakeRenderer, setFakeRenderer] = useState(false);
  const lastPage = step === formData.length - 1;

  const onFormValueChange = (data, payloadKey) => {
    const params = {value: data, payloadKey: payloadKey};
    dispatch(saveFormData(params));
  };

  const onNextClick = () => {
    currentPage.forEach(element => {
      if (element.isRequired && !formPayload[element.payloadKey]) {
        element.error = '* Reuired';
      } else {
        element.error = null;
      }
    });
    const hasError = currentPage.some(item => item.error);
    if (hasError) {
      setFakeRenderer(!fakeRenderer);
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
