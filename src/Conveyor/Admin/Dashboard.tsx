/// <reference types="vite-plugin-svgr/client" />

import { HTMLAttributes } from 'react';
import { Link, Outlet } from '@tanstack/react-router';

import Logo from '@/assets/logo.svg?react';

export interface DashboardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Dashboard = ({ className, ...props }: DashboardProps) => {
    return (
        <div
            className={className ?? 'flex min-h-screen w-full flex-col bg-[--bg-color] text-[--text-color]'}
            {...props}
        >
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-[--fg-accent] sm:flex'>
                <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
                    <Link
                        className={
                            'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
                        }
                        to='/'
                    >
                        <Logo />
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
