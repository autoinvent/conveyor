/// <reference types="vite-plugin-svgr/client" />

import { HTMLAttributes } from 'react';
import { Link, Outlet } from '@tanstack/react-router';

import Logo from '@/assets/logo.svg?react';
import { LucideHome, LucideEclipse, LucideBox } from 'lucide-react';

export interface DashboardProps extends HTMLAttributes<HTMLDivElement> {}

export const Dashboard = ({ ...props }: DashboardProps) => {
  return (
    <div className='w-screen h-screen text-[--text-color] bg-[--bg-color]'>
      <aside className='fixed group text-[--text-muted] inset-y-0 left-0 z-10 border-[--fg-accent] border-r bg-[--bg-accent]' { ...props }>
        <nav className='flex flex-col gap-4 px-2 py-5'>
          <Link className='items-start inline-flex text-start gap-2 text-lg font-semibold hover:text-[--text-color]'>
            <Logo className='h-9 w-9' />
            <span className='ml-1.5 mt-1.5 hidden group-hover:inline'>
              Conveyor
            </span>
          </Link>
          <Link className='py-1.5 items-start h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color]'>
            <LucideHome className='w-9 ' />
            <span className='ml-2 hidden group-hover:inline'>
              Home
            </span>
          </Link>
          <Link className='py-1.5 items-start h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color]'>
            <LucideBox className='w-9' />
            <span className='ml-2 hidden group-hover:inline'>
              Models
            </span>
          </Link>
          <Link className='py-1.5 items-start h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color]'>
            <LucideEclipse className='w-9' />
            <span className='ml-2 hidden group-hover:inline'>
              Themes
            </span>
            </Link>
        </nav>
      </aside>
      <div className=' gap-4 py-4 pl-14'>
        <main className='items-start p-4 px-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
