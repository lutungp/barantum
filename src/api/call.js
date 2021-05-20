import request from '@/utils/request'

export function getCalls(id) {
  return request({
    url: `/calls`,
    method: 'get'
  })
}

export function updateCalls(id, data) {
  return request({
    url: `/calls/${id}`,
    method: 'put',
    data
  })
}

export function createCalls(data) {
  return request({
    url: `/calls`,
    method: 'post',
    data
  })
}

export function deleteCall(id) {
  return request({
    url: `/calls/${id}`,
    method: 'delete'
  })
}

export function getCallDetail(id) {
  return request({
    url: `/calls/edit/${id}`,
    method: 'get'
  })
}

export function getCustomerCalls(id) {
  return request({
    url: `/calls/customer/${id}`,
    method: 'get'
  })
}

export function importExcel(data) {
  request.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  return request({
    url: `/calls/import`,
    method: 'post',
    data
  })
}

export function exportExcel() {
  return request({
    url: `/calls/export`,
    method: 'get'
  })
}
