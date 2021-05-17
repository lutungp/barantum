import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/customer/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/customer/info',
    method: 'get'
  })
}

export function getActivity(token) {
  return request({
    url: '/customer/activity',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/customer/logout',
    method: 'post'
  })
}

export function getCustomers(params) {
  return request({
    url: '/customer',
    method: 'get',
    params
  })
}

export function getCustomerDetail(id) {
  return request({
    url: `/customerdetail/${id}`,
    method: 'get'
  })
}

export function confirmCustomerCalls(id, data) {
  return request({
    url: `/customercall/${id}`,
    method: 'post',
    data
  })
}

export function createCustomer(data) {
  return request({
    url: '/customer',
    method: 'post',
    data
  })
}

export function updateCustomer(id, data) {
  return request({
    url: `/customer/${id}`,
    method: 'put',
    data
  })
}

export function deleteCustomer(id) {
  return request({
    url: `/customer/${id}`,
    method: 'delete'
  })
}
