import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'get'
  })
}

export function getActivity(token) {
  return request({
    url: '/users/activity',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

export function getUsers(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUser(userid, data) {
  return request({
    url: `/users/${userid}`,
    method: 'put',
    data
  })
}

export function deleteUser(userid) {
  return request({
    url: `/users/${userid}`,
    method: 'delete'
  })
}
