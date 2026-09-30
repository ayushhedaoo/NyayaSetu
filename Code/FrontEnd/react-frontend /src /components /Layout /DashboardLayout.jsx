import React from 'react';
import Sidebar from '../Navigation/Sidebar';
import TopNav from '../Navigation/TopNav';

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex text-body-md antialiased">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen w-[calc(100%-16rem)]">
        <TopNav />
        <main className="flex-1 p-margin-desktop max-w-container-max mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
