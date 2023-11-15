
'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiUser, HiDocumentReport, HiBell } from 'react-icons/hi';

function SideBar() {
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className='-p-2 flex flex-col'>
      <Sidebar.Logo href="#" img="/src/assets/logo.png" imgAlt="" className="flex justify-center w-full h-1/5" />
      <Sidebar.Items className='my-4 flex flex-col h-4/5'>
        <Sidebar.ItemGroup className='gap-2 h-2/6'>
          <Sidebar.Item href="#" icon={HiChartPie} className="py-2 mb-8 flex gap-2 justify-start px-12">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser} className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Agents
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser} className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Clients
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiBell} className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Fuites
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiDocumentReport} className="gap-4 py-2  justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Rapports
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className='gap-2 grow h-2/5 flex items-end justify-center pb-20'>
          <Sidebar.Item href="/login" icon={HiArrowSmRight} className="gap-4 py-2 bg-blue-400 text-white font-bold px-4">
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


export default SideBar;