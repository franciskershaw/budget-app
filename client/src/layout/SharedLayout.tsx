import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';

const SharedLayout = (): ReactElement => {
  return (
    <>
      <nav>Navbar</nav>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default SharedLayout;
