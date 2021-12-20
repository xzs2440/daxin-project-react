import service from '../../src/utils/request'

/**
 * 登录接口
 */
export function Login (data) {
  return service.request({
    url: '/login/',
    method: "post",
    data
  })
}
/**
 * 获取验证码
 */
export function GetSms (data) {
  return service.request({
    url: '/getSms/ ',
    method: "post",
    data
  })
}