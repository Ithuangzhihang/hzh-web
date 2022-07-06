import { Col, Row } from 'antd';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import route from '@/route';
import { RecoilRoot } from 'recoil';

const Contents: React.FC = () => {
  const element: any = useRoutes(route);
  return (
    <>
      <RecoilRoot>
        <Row>
          <Col span={6}>{element}</Col>
          <div></div>
        </Row>
      </RecoilRoot>
    </>
  );
};

export default Contents;
