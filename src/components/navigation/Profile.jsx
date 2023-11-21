// 'use client';

import { Dropdown } from 'flowbite-react';
import Avatar from './Avatar';
import { logout } from '../auth/LoginPage';

function Profile() {
  
  return (
    <div className='h-14 flex justify-end items-center gap-4 text-gray-400 hover:text-gray-800s px-12'>
      <form className="flex items-center">   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                </svg>
            </div>
            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required/>
        </div>
        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
        </button>
      </form>
      <span className='grow'></span>
      <span className="material-symbols-outlined">notifications</span>
      <Dropdown
          label={<Avatar alt="User settings" img="/images/people/profile-picture-5.jpg" rounded />}
          arrowIcon={false}
          inline
        >
          <Dropdown.Header>
            <span className="block text-sm">Josue Batey</span>
            <span className="block truncate text-sm font-medium">josue@gmail.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
        <Dropdown.Item className='bg-red-500'>
          <button onClick={()=> logout()}>Sign out</button>
          </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
export default Profile;