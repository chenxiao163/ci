import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function lists(params) {
  return request({
    url: '/sg/SendEmail/infoList',
    method: 'get',
    params
  })
}

