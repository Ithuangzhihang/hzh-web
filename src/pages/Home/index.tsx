import { GetDataApi } from '@/request/api';
import { userState } from '@/store/atom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface IData {
  id: string | number;
}
const Home = function () {
  const [userInfo] = useRecoilState(userState);

  useEffect(() => {
    console.log('home', userInfo);
  });

  // 测试get方法
  const getUserData = (value: IData) => {
    GetDataApi(value).then((response: any) => {
      console.log('response', response);
    });
  };

  return (
    <>
      <button onClick={() => getUserData({ id: 1 })}>点击查询数据</button>

      <h1>欢迎来到我家</h1>
    </>
  );
};
export default Home;
