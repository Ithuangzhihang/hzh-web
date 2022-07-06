import { atom } from 'recoil';

interface registerVo {
  nickname?: string;
  phone?: string;
}
interface User {
  age: number | undefined;
  avatar: string | undefined;
  gmtCreate: string | undefined;
  gmtModified: string | undefined;
  mobile: string | undefined;
  nickname: string | undefined;
  sex: string | undefined;
}
// 验证码 state
export const codeState = atom<any>({
  key: 'codeStateKey',
  default: '获取验证码',
});
export const secondstate = atom({
  key: 'secondstate',
  default: 60,
});

// 注册信息 state
export const registerUserState = atom<registerVo>({
  key: 'registerUserState',
  default: {},
});

// 用户信息 state
export const userState = atom<User>({
  key: 'userState',
  default: {
    age: 1,
    avatar: '',
    gmtCreate: '',
    gmtModified: '',
    mobile: '',
    nickname: '',
    sex: '',
  },
});
