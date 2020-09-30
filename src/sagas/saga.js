import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { conditionalExpression } from '@babel/types';

export function* watcher() {
    yield takeLatest('GET_FORM_REQUEST', getForm)
}


function fetchForm() {
    return (
        axios.get("https://ca.platform.simplifii.xyz/api/v1/static/assignment1")
    )
}

function* getForm() {
  
    const response = yield call(fetchForm);
    const data = response.data;
    yield put({ type: "GET_FORM", data });
}