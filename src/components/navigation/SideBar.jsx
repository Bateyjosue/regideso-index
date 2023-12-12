
'use client';

import { Sidebar } from 'flowbite-react';
import { HiShoppingBag, HiChartPie, HiUser, HiDocumentReport, HiBell } from 'react-icons/hi';
import IMAGES from '../../assets/images'
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className='-p-2 flex flex-col overflow-y-hidden h-fit'>
      <Sidebar.Logo
        href="#"
        img={IMAGES.regideso}
        imgAlt=""
        className="w-full h-1/4" />
      <Sidebar.Items className='my-4 flex flex-col h-4/5 '>
        <Sidebar.ItemGroup className='gap-2 h-2/6'>
          <Sidebar.Item href="/" icon={HiChartPie} className="gap-4 py-2 justify-start px-4 hover:bg-blue-200 hover:text-white hover:rounded-none">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="Agents" className="gap-4 py-2 justify-start px-4 hover:bg-blue-200 hover:text-white hover:rounded-none">
            <div className=' flex flex-col items-start pl-4'>
              <Sidebar.Item href="#" className="hover:bg-blue-200 hover:text-white">List des agents</Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-blue-200 hover:text-white">Ajouter un Agent</Sidebar.Item>
            </div>
            <Sidebar.Item href="#"></Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse href="#" icon={HiUser} label="Abonnes" className="gap-4 py-2 justify-start px-4 hover:bg-blue-200 hover:text-white hover:rounded-none ">
            <div className=' flex flex-col items-start pl-4'>
            <Sidebar.Item className="hover:bg-blue-200 hover:text-white">
              <Link to='subscriber'>Tous les Abonnes</Link>
            </Sidebar.Item>
            <Sidebar.Item className="hover:bg-blue-200 hover:text-white">
              <Link to='new-subscriber'>Add new Subscriber</Link>
            </Sidebar.Item>
            </div>
          </Sidebar.Collapse>
          <Sidebar.Item icon={HiBell} className="gap-4 py-2 justify-start px-4 hover:bg-blue-200 hover:text-white hover:rounded-none">
            <Link to='index-client'>Index Clients</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiBell} className="gap-4 py-2 justify-start px-4 hover:bg-blue-200 hover:text-white hover:rounded-none">
            <Link to='fuites'>
              Fuites
            </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiDocumentReport} className="gap-4 py-2  justify-start px-4 hover:bg-blue-200 hover:text-white hover:rounded-none">
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