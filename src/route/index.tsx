import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// 路由的配置组件
export default [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];
