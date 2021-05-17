import request from '@/utils/request'

export function getActivities(params) {
  return request({
    url: '/activity',
    method: 'get',
    params
  })
}

export function createActivity(data) {
  return request({
    url: '/activity',
    method: 'post',
    data
  })
}

export function updateActivity(id, data) {
  return request({
    url: `/activity/${id}`,
    method: 'put',
    data
  })
}

export function deleteActivity(id) {
  return request({
    url: `/activity/${id}`,
    method: 'delete'
  })
}

export function confirmActivity(id) {
  return request({
    url: `/activity/confirm/${id}`,
    method: 'put'
  })
}
