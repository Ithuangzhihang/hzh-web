/* eslint-disable no-const-assign */
import { Button, Checkbox, Col, Form, Input, message, Row, Select } from 'antd';
const { Option } = Select;
import './style.less';
import title from '@/assets/title.svg';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterApi, sendMsgApi } from '@/request/api';
import { useRecoilState } from 'recoil';
import { registerUserState } from '@/store/atom';

interface userRegistVo {
  nickname: string;
  mobile: string | number;
  password: string | number;
  code: string | number;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 4,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

const Register: React.FC = () => {
  const navgate = useNavigate();
  const [form] = Form.useForm();
  // 存储表单的数据,antd不建议这样做
  const [registerUser, setregisterUserState] = useRecoilState(registerUserState);

  // 倒计时的方法

  // const timeDown = () => {
  //   console.log('timeDownsecond', second);

  //   let result = setInterval(() => {
  //     console.log('second', second);
  //     setSecondstate(second - 1);
  //     setCodeTest(second);
  //     if (second < 1) {
  //       clearInterval(result);
  //       // sending = true;
  //       // this.disabled = false;
  //       setSecondstate(60);
  //       setCodeTest('获取验证码');
  //     }
  //   }, 1000);
  // };

  // 通过手机号发送验证码
  // 发送验证码的接口
  const sendMsg = () => {
    console.log(registerUser.phone);
    sendMsgApi(registerUser.phone).then((response: any) => {
      console.log('response', response);
      message.success('发送验证码成功');
      // timeDown();
    });
  };

  //  当满足条件以后的注册方式
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const user: userRegistVo = {
      nickname: values.nickname,
      mobile: values.mobile,
      password: values.password,
      code: values.code,
    };
    console.log('user', user);

    RegisterApi(user)
      .then((response: any) => {
        console.log('response', response);
        message.success('注册成功');
        navgate('/login');
      })
      .catch((response) => {
        message.error(response.message);
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="pageBox">
      <div className="RegisterBox">
        <img src={title} alt="title" className="login-welcom-svg" />
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[
              {
                required: true,
                message: '请填写你的昵称',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请填写你的密码',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="再次确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认你的密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码需要一致!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="手机号码"
            rules={[{ required: true, message: '请输入你的手机号' }]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
              onChange={(e) => {
                console.log(e.target.value);
                console.log(registerUser);
                setregisterUserState({ phone: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item label="验证码">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="code"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button onClick={sendMsg}>发送验证码</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              我阅读并同意该条约 <a href="">中华人民共和国刑法</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Link to="/login" className="register-to-forgot">
              已有账号,去登陆
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
