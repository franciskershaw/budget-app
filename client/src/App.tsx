import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactElement } from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import SharedLayout from './layout/SharedLayout';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
