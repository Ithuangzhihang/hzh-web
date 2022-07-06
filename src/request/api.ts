/* eslint-disable max-len */
import request from './request';

interface userRegistVo {
  nickname: string;
  mobile: string | number;
  password: string | number;
  code: string | number;
}
interface userLoginVo {
  mobile: string | number;
  password: string | number;
}
interface IData {
  id: string | number;
}

// 注册

export const RegisterApi = (user: userRegistVo) =>
  request.post('/ucenterservice/ucenter/UserRegist', user);

// 登陆

export const LoginApi = (user: userLoginVo) =>
  request.post('/ucenterservice/ucenter/Userlogin', user);
// 根据token查看用户信息
export const getUserByTokenApi = () =>
  request.get('/ucenterservice/ucenter/getUserInfoByToken');
// 测试数据
export const GetDataApi = (params: IData) =>
  request.get(`/ucenterservice/ucenter/getUserById/${params.id}`);

// 发送验证码
export const sendMsgApi = (phone: any) => request.get(`/edumsm/msm/send/${phone}`);
