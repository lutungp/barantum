import request from '@/utils/request'

export function getCustomers(params) {
  return request({
    url: '/customer',
    method: 'get',
    params
  })
}

export function getCustomerDetail(id) {
  return request({
    url: `/customer/edit/${id}`,
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

export function importExcel(data) {
  request.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  return request({
    url: `/customer/import`,
    method: 'post',
    data
  })
}

export function exportExcel() {
  return request({
    url: `/customer/export`,
    method: 'get'
  })
}
