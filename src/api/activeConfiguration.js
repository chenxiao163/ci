import request from '@/utils/request'

export function addActiveConfig(params) {
  return request({
    url: '/tu',
    method: 'post',
    data: params,
    urlType: 'v1'
  })
}
