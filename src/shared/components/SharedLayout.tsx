import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../modules/header/components/Header';
import NavBar from '../../modules/navbar/components/NavBar';
import { IdleOverlay } from './IdleOverlay';

export const SharedLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className="flex h-full ">
        <NavBar />
        <main className="main-height w-full bg-granite px-6 pb-6 lg:px-0 lg:pb-0">
          <section className="containerSection">
            <Suspense>
              <Outlet />
            </Suspense>
          </section>
        </main>
      </div>
      <IdleOverlay />
    </>
  );
};
