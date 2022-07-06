import './App.css';
import { RecoilRoot } from 'recoil';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Headers from './components/Header';
import Contents from './components/Contents';
function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <>
          <Layout>
            <Headers />
            <Content>
              <Contents />
            </Content>
          </Layout>
        </>
      </RecoilRoot>
    </div>
  );
}

export default App;
