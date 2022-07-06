/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input, message } from 'antd';
import './style.less';
import title from '@/assets/title.svg';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByTokenApi, LoginApi } from '@/request/api';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/atom';

// import { useRecoilState } from "recoil";
// import { UserState } from "@/store/atom";
interface userLoginVo {
  mobile: string | number;
  password: string | number;
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

const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setUserInfo = useSetRecoilState(userState);
  const navgate = useNavigate();

  // 将用户信息存储在atom中

  //  输入全都合法以后点击登陆跳转
  const onFinish = (values: any) => {
    console.log('Success:', values);
    let user: userLoginVo = values;

    // 调用登录的接口
    LoginApi(user).then((response: any) => {
      console.log(response);
      // 这里之前我发现我写的只能通过状态码来判断情况,所以这里要加个判断
      if (response.success) {
        message.success('登陆成功');
        // 再根据token查询用户信息
        localStorage.setItem('UserCookie', response.data.token);
        // 调用根据token查询用户信息的接口
        getUserByTokenApi().then((response) => {
          console.log('getUserByTokenApi', response);
          // 查询成功, 将数据存储在recoil中

          const userInfoT: User = {
            age: response.data.UserInfo.age,
            avatar: response.data.UserInfo.avatar,
            gmtCreate: response.data.UserInfo.gmtCreate,
            gmtModified: response.data.UserInfo.gmtModified,
            mobile: response.data.UserInfo.gmtModified,
            nickname: response.data.UserInfo.nickname,
            sex: response.data.UserInfo.sex,
          };
          setUserInfo(userInfoT);

          // 由于本地存储没有办法直接存储对象,只能通过这种方式
          const struser: string = JSON.stringify(userInfoT);
          // 存储在本地
          localStorage.setItem('user', struser);
          console.log('user', user);

          console.log('struser', struser);
        });

        navgate('/');
      } else {
        message.error(response.message);
      }
    });
  };

  //  如果放在组件内部的话执行两次，但是不报错，每次刷新该界面渲染的时候执行一次，在页面点击跳转的时候不执行
  // useMount(() => {
  //   console.log('useMount');
  // });

  return (
    <div className="pageBox">
      <div className="LoginBox">
        <img src={title} alt="title" className="login-welcom-svg" />
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            label="账号"
            name="mobile"
            rules={[{ required: true, message: '请输入你的账号' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入你的密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>

            <Link to="/register" className="login-form-forgot">
              忘记密码
            </Link>
          </Form.Item>
          <Form.Item>
            <Link to="/register" className="login-form-forgot">
              没有账号,去注册
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
