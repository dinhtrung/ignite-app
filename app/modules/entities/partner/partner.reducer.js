import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  partnerRequest: ['partnerId'],
  partnerAllRequest: ['options'],
  partnerUpdateRequest: ['partner'],
  partnerDeleteRequest: ['partnerId'],

  partnerSuccess: ['partner'],
  partnerAllSuccess: ['partners'],
  partnerUpdateSuccess: ['partner'],
  partnerDeleteSuccess: [],

  partnerFailure: ['error'],
  partnerAllFailure: ['error'],
  partnerUpdateFailure: ['error'],
  partnerDeleteFailure: ['error']
})

export const PartnerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  partner: null,
  partners: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    partner: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    partners: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { partner } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    partner
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { partners } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    partners
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { partner } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    partner
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    partner: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    partner: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    partners: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    partner: state.partner
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    partner: state.partner
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PARTNER_REQUEST]: request,
  [Types.PARTNER_ALL_REQUEST]: allRequest,
  [Types.PARTNER_UPDATE_REQUEST]: updateRequest,
  [Types.PARTNER_DELETE_REQUEST]: deleteRequest,

  [Types.PARTNER_SUCCESS]: success,
  [Types.PARTNER_ALL_SUCCESS]: allSuccess,
  [Types.PARTNER_UPDATE_SUCCESS]: updateSuccess,
  [Types.PARTNER_DELETE_SUCCESS]: deleteSuccess,

  [Types.PARTNER_FAILURE]: failure,
  [Types.PARTNER_ALL_FAILURE]: allFailure,
  [Types.PARTNER_UPDATE_FAILURE]: updateFailure,
  [Types.PARTNER_DELETE_FAILURE]: deleteFailure
})
