import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { Col, Row } from 'antd';
import { LoginOutlined, MailOutlined } from '@ant-design/icons';

import { useRecoilValue } from 'recoil';
import { userState } from '@/store/atom';
import { useEffect } from 'react';

const Headers = function () {
  const userInfo = useRecoilValue(userState);

  useEffect(() => {
    console.log('head', userInfo);
    console.log('userInfo.mobile', userInfo.mobile);
  });

  return (
    <div>
      {userInfo.mobile === '' ? (
        <Menu mode="horizontal" defaultSelectedKeys={['login']}>
          <Row justify="center">
            <Col span={80}>
              <Menu.Item key="login" icon={<LoginOutlined />}>
                <NavLink to="/login">登陆</NavLink>
              </Menu.Item>
            </Col>

            <Col span={100}>
              <Menu.Item key="register" icon={<MailOutlined />}>
                <NavLink to="/register">注册</NavLink>
              </Menu.Item>
            </Col>
          </Row>
        </Menu>
      ) : (
        <h1>你登录了</h1>
      )}
    </div>
  );
};
export default Headers;
