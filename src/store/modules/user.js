import { login, logout, getInfo, getActivity } from '@/api/user'
import { getToken, setToken, getSockToken, setSockToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    socktoken : getSockToken(),
    name: '',
    avatar: '',
    role : '',
    activity : []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_SOCKTOKEN: (state, token) => {
    state.socktoken = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_ACTIVITY: (state, activity) => {
    state.activity = activity
  }
}

const getters = {
  getSockToken: (state) => {
    return state.socktoken
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { name, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: name.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        commit('SET_SOCKTOKEN', response.socktoken)
        setToken(response.token)
        setSockToken(response.socktoken)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, role } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', role)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getActivity({ commit, state }) {
    return new Promise((resolve, reject) => {
      getActivity(state.token).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

