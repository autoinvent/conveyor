/// <reference types="vite-plugin-svgr/client" />

import { HTMLAttributes } from 'react';
import { Link, Outlet } from '@tanstack/react-router';

import Logo from '@/assets/logo.svg?react';
import { LucideHome, LucideEclipse, LucideBox } from 'lucide-react';
export interface DashboardProps extends HTMLAttributes<HTMLDivElement> {}

export const Dashboard = ({ ...props }: DashboardProps) => {
  return (
    <div
      className='flex min-h-screen w-full flex-col bg-[--bg-color] text-[--text-color] transition-all duration-1000'
      {...props}
    >
      <aside className='fixed flex inset-y-0 left-0 z-10 flex-col border-r bg-[--bg-accent] sm:flex transition-all duration-1000'>
        <nav className='flex flex-col items-start gap-4 px-2 sm:py-5 w-full'>
          <Link
            className='group h-9 mb-1 flex w-full shrink-0 text-start justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:text-base'
            to='/'
          >
            <span className='h-9 inline-flex w-full text-start'>
              <Logo className='h-9 w-9' />
              <span className='ml-1.5 mt-1.5 hidden group-hover:inline'>
                Conveyor
              </span>
            </span>
          </Link>
          <Link
            className='group flex h-9 w-full shrink-0 text-start justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:text-base'
            to='/'
          >
            <span className='h-9 inline-flex w-full text-start'>
              <LucideHome className='w-9' />
              <span className='ml-2 py-px hidden group-hover:inline'>Home</span>
            </span>
          </Link>
          <Link
            className='group flex h-9 w-full shrink-0 text-start justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:text-base'
            to='/'
          >
            <span className='h-9 inline-flex w-full text-start'>
              <LucideBox className='w-9' />
              <span className='ml-2 py-px hidden group-hover:inline'>
                Models
              </span>
            </span>
          </Link>
          <Link
            className='group flex h-9 w-full shrink-0 text-start justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:text-base'
            to='/'
          >
            <span className='h-9 inline-flex w-full text-start'>
              <LucideEclipse className='w-9' />
              <span className='ml-2 py-px hidden group-hover:inline'>
                Themes
              </span>
            </span>
          </Link>
        </nav>
      </aside>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
