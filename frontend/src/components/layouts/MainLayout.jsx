import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
/* ❌ HeroSection import 삭제 */

const MainLayout = () => {
  return (
    <div className="main-layout">

      <Header />
      


      <main>

        <Outlet />
      </main>
      

      <Footer />
    </div>
  );
};

export default MainLayout;