import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/login/LoginCon/login1',
    method: 'get',
    params
  })
}

export function tologin(params) {
  return request({
    url: '/login/LoginCon/login1',
    method: 'get',
    params
  })
}

export function getUserGames(params) {
  return request({
    url: '/permission/UserInfoCon/getGameOwner',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
