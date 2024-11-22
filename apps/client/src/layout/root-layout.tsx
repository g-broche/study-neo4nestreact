import { Outlet } from 'react-router-dom';
import PageHeader from '../component/page-header';

function RootLayout() {
  return (
    <>
      <PageHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;