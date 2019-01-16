import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/partner/partner.reducer'

test('attempt retrieving a single partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.partner).toBe(null)
})

test('attempt retrieving a list of partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.partners).toBe(null)
})

test('attempt updating a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.partner).toEqual({id: 1})
})

test('success retrieving a list of partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.partners).toEqual([{id: 1}, {id: 2}])
})

test('success updating a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.partner).toEqual({id: 1})
})
test('success deleting a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.partner).toEqual(null)
})

test('failure retrieving a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.partner).toEqual(null)
})

test('failure retrieving a list of partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.partners).toEqual(null)
})

test('failure updating a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.partner).toEqual(INITIAL_STATE.partner)
})
test('failure deleting a partner', () => {
  const state = reducer(INITIAL_STATE, Actions.partnerDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.partner).toEqual(INITIAL_STATE.partner)
})
