import React from 'react';
import { Layout } from './components/Layout';
import { GeneratorPage } from './pages/GeneratorPage';

/** 메인 앱(BrowserRouter)에 임베드할 때는 HashRouter를 쓰지 않습니다. 단독 실행은 index.tsx에서 HashRouter로 감쌉니다. */
const App: React.FC = () => {
  return (
    <Layout>
      <GeneratorPage />
    </Layout>
  );
};

export default App;
