import request from '@/utils/request'
import { getToken, getName } from '@/utils/auth'

export function emailDetai(params) {
  return request({
    url: '/sg/SendEmailCon/infoList',
    method: 'get',
    params
  })
}

export function sendEmail(data) {
  return request({
    url: '/sg/SendEmailCon/save?user_name=' + getName() + '&token=' + getToken(),
    method: 'post',
    data
  })
}

export function emailAction(params) {
  return request({
    url: '/sg/SendEmailCon/operate',
    method: 'post',
    params
  })
}

export function getProduct(params) {
  return request({
    url: '/sg/SendEmailCon/getGameData',
    method: 'get',
    params
  })
}

export function getUids(params) {
  return request({
    url: '/sg/SendEmailCon/getSeverList',
    method: 'get',
    params
  })
}

export function getStates(params) {
  return request({
    url: '/sg/SendEmailCon/getStateList',
    method: 'get',
    params
  })
}

// 获取礼包
export function getGifts(params) {
  return request({
    url: '/sg/SendEmailCon/getGameProduct',
    method: 'get',
    params
  })
}

// 获取礼包
export function getEmailtypes(params) {
  return request({
    url: '/sg/SendEmailCon/mailType',
    method: 'get',
    params
  })
}
export function saveMailTemplate(params) {
  return request({
    url: "/v1/idlethreenew/mail/saveMailTemplate",
    method: "post",
    data: params,
    urlType: 'v1'
  })
}
export function getMailTemplate(params) {
  return request({
    url: "/v1/idlethreenew/mail/getMailTemplate",
    method: "post",
    data: params,
    urlType: 'v1'
  })
}
export function deleteMailTemplate(params) {
  return request({
    url: "/v1/idlethreenew/mail/deleteMailTemplate",
    method: "post",
    data: params,
    urlType: 'v1'
  })
}
export function updateMailTemplate(params) {
  return request({
    url: "/v1/idlethreenew/mail/updateMailTemplate",
    method: "post",
    data: params,
    urlType: 'v1'
  })
}

export function selectMailTemplate(params) {
  return request({
    url: "/v1/idlethreenew/mail/selectMailTemplate",
    method: "post",
    data: params,
    urlType: 'v1'
  })
}

