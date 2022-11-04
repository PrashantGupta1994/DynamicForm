import * as ACTION_TYPE from './actionType';

const initialState = {
  step: 1, // start of form
  formData: [
    [
      {
        // assuming page 0 has no form, just instruction UI
      },
    ],
    [
      {
        id: 1001,
        title: 'What is your age?',
        type: 'INPUT',
        payloadKey: 'age',
        inputType: 'numeric',
        placeholder: 'your age',
        min: 18,
        max: 90,
        isRequired: true,
      },
      {
        id: 1002,
        title: 'What is your height? (in CM)',
        type: 'INPUT',
        payloadKey: 'height',
        inputType: 'numeric',
        placeholder: 'your height',
        min: 120,
        max: 210,
        isRequired: false,
      },
    ],
    [
      {
        id: 1003,
        title: 'What is your weight? (in KG)',
        type: 'INPUT',
        payloadKey: 'weight',
        inputType: 'numeric',
        placeholder: 'your weight',
        min: 30,
        max: 240,
        isRequired: true,
      },
    ],
    [
      {
        id: 1004,
        title: 'Gender',
        type: 'DROPDOWN',
        payloadKey: 'gender',
        placeholder: 'Select',
        values: [
          {id: 1, value: 'Male'},
          {
            id: 2,
            value: 'Female',
          },
        ],
        isRequired: true,
      },
    ],
  ],
  formPayload: {},
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ACTION_TYPE.SUCCESS:
      //
      break;

    case ACTION_TYPE.FORM_GO_BACK: {
      return {
        step: --state.step,
        ...state,
      };
    }

    case ACTION_TYPE.FORM_GO_NEXT: {
      return {
        step: ++state.step,
        ...state,
      };
    }

    case ACTION_TYPE.UPDATE_FORM_DATA:
      return {
        formPayload: payload.formPayload,
        ...state,
      };

    default:
      return Object.assign({}, state);
  }
};
