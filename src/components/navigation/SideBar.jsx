
'use client';

import { Sidebar } from 'flowbite-react';
import { HiShoppingBag, HiChartPie, HiUser, HiDocumentReport, HiBell } from 'react-icons/hi';
import IMAGES from '../../assets/images'

function SideBar() {
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className='-p-2 flex flex-col'>
      <Sidebar.Logo href="#" img={IMAGES.regideso} imgAlt="" className="flex justify-center w-full h-1/5" />
      <Sidebar.Items className='my-4 flex flex-col h-4/5'>
        <Sidebar.ItemGroup className='gap-2 h-2/6'>
          <Sidebar.Item href="/" icon={HiChartPie} className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="Agents" className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            <Sidebar.Item href="#">List des agents</Sidebar.Item>
            <Sidebar.Item href="#">Ajouter un Agent</Sidebar.Item>
            <Sidebar.Item href="#"></Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse href="#" icon={HiUser} label="Abonnes" className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            <Sidebar.Item href="subscriber">List des Abonnes</Sidebar.Item>
            <Sidebar.Item href="new-subscriber">Ajouter un Abonne</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="index-client" icon={HiBell} className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Index Clients
          </Sidebar.Item>
          <Sidebar.Item href="fuites" icon={HiBell} className="gap-4 py-2 justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Fuites
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiDocumentReport} className="gap-4 py-2  justify-start px-12 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Rapports
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className='gap-2 grow h-2/5 flex items-end justify-center pb-20'>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


export default SideBar;