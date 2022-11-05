import * as ACTION_TYPE from './actionType';

const dispatchValues = formPayload => {
  return {
    type: ACTION_TYPE.UPDATE_FORM_DATA,
    payload: {
      formPayload,
    },
  };
};

const dispatchPageData = pageData => {
  return {
    type: ACTION_TYPE.UPDATE_PAGE_DATA,
    payload: {
      pageData,
    },
  };
};

const dispatchBackClick = _ => {
  return {
    type: ACTION_TYPE.FORM_GO_BACK,
  };
};

const dispatchNextClick = _ => {
  return {
    type: ACTION_TYPE.FORM_GO_NEXT,
  };
};

// ----

export const saveFormData = data => {
  const {value, payloadKey} = data;
  return (dispatch, getState) => {
    const formPayload = getState().formPayload;
    formPayload[payloadKey] = value;
    dispatch(dispatchValues(formPayload));
  };
};

export const onButtonClick = type => {
  return (dispatch, getState) => {
    switch (type) {
      case 0:
        dispatch(dispatchBackClick());
        break;
      case 1:
        dispatch(dispatchNextClick());
        break;
    }
  };
};

export const onPageDataChange = data => {
  return dispatch => {
    dispatch(dispatchPageData(data));
  };
};
