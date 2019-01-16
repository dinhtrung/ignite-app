import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import PartnerActions from './partner.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function * getPartner (api, action) {
  const { partnerId } = action
  // make the call to the api
  const apiCall = call(api.getPartner, partnerId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(PartnerActions.partnerSuccess(response.data))
  } else {
    yield put(PartnerActions.partnerFailure(response.data))
  }
}

export function * getPartners (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getPartners, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PartnerActions.partnerAllSuccess(response.data))
  } else {
    yield put(PartnerActions.partnerAllFailure(response.data))
  }
}

export function * updatePartner (api, action) {
  const { partner } = action
  // make the call to the api
  const idIsNotNull = !!partner.id
  const apiCall = call(idIsNotNull ? api.updatePartner : api.createPartner, partner)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(PartnerActions.partnerUpdateSuccess(response.data))
  } else {
    yield put(PartnerActions.partnerUpdateFailure(response.data))
  }
}

export function * deletePartner (api, action) {
  const { partnerId } = action
  // make the call to the api
  const apiCall = call(api.deletePartner, partnerId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PartnerActions.partnerDeleteSuccess())
  } else {
    yield put(PartnerActions.partnerDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.createdAt) {
    data.createdAt = new Date(data.createdAt)
  }
  if (data.registeredAt) {
    data.registeredAt = localDateToJsDate(data.registeredAt)
  }
  return data
}
