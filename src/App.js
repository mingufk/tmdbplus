import { Outlet, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import MainPage from './pages/Main';
import DetailPage from './pages/Detail';
import SearchPage from './pages/Search';
import SignInPage from './pages/Sign-in';

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SignInPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path=":movieId" element={<DetailPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
};

export default App;
