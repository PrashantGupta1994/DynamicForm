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
        title: 'What is your biological gender at birth?',
        type: 'DROPDOWN',
        payloadKey: 'gender',
        placeholder: 'Select',
        values: [
          {
            id: 10041,
            value: 'Male',
            parentId: 1004
          },
          {
            id: 10042,
            value: 'Female',
            onSelection: {
              id: 100421,
              parentId: 1004,
              title: 'Are you pregnant?',
              type: 'DROPDOWN',
              payloadKey: 'pregnant',
              placeholder: 'Select',
              values: [
                {
                  id: 1004211,
                  value: 'Yes',
                  parentId: 100421
                },
                {
                  id: 1004212,
                  value: 'No',
                  parentId: 100421,
                  onSelection: {
                    id: 10042121,
                    parentId: 1004212,
                    title: 'Are you taking any contraceptives?',
                    type: 'DROPDOWN',
                    payloadKey: 'contraceptives',
                    placeholder: 'Select',
                    values: [
                      { id: 1, value: 'Yes' },
                      { id: 2, value: 'No' },
                    ],
                    isRequired: true,
                  }
                },
              ],
              isRequired: true,
            }
          },
        ],
        isRequired: true,
      },
    ],
  ],
  pageData: new Map(),
  formPayload: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.SUCCESS:
      //
      break;

    case ACTION_TYPE.UPDATE_PAGE_DATA: {
      return {
        pageData: payload.pageData,
        ...state
      }
    }

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
