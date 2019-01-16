import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getPartner, getPartners, updatePartner, deletePartner } from '../../../../../app/modules/entities/partner/partner.sagas'
import PartnerActions from '../../../../../app/modules/entities/partner/partner.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getPartner(1)
  const step = stepper(getPartner(FixtureAPI, { partnerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PartnerActions.partnerSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getPartner(FixtureAPI, { partnerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PartnerActions.partnerFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getPartners()
  const step = stepper(getPartners(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PartnerActions.partnerAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getPartners(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PartnerActions.partnerAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updatePartner({id: 1})
  const step = stepper(updatePartner(FixtureAPI, { partner: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PartnerActions.partnerUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updatePartner(FixtureAPI, { partner: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PartnerActions.partnerUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deletePartner({id: 1})
  const step = stepper(deletePartner(FixtureAPI, { partnerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PartnerActions.partnerDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deletePartner(FixtureAPI, { partnerId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PartnerActions.partnerDeleteFailure()))
})
