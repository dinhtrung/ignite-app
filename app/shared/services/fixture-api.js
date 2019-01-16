export default {
  // Functions return fixtures

  // entity fixtures

  updatePartner: (partner) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updatePartner.json')
    }
  },
  getPartners: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPartners.json')
    }
  },
  getPartner: (partnerId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPartner.json')
    }
  },
  deletePartner: (partnerId) => {
    return {
      ok: true
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({currentPassword}) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
