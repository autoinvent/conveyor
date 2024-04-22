/// <reference types="vite-plugin-svgr/client" />

import { HTMLAttributes } from 'react';
import { Link, Outlet } from '@tanstack/react-router';

import Logo from '@/assets/logo.svg?react';
import { LucideHome, LucideEclipse, LucideBox } from 'lucide-react';
import React from 'react';

export interface DashboardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Dashboard = ({ className, ...props }: DashboardProps) => {
    const [isHovered, setIsHovered] = React.useState(false); // State to track hover
    const asideWidth = isHovered ? 'auto' : '14rem';
    // Function to handle mouse enter event
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div
            className={className ?? 'flex min-h-screen w-full flex-col bg-[--bg-color] text-[--text-color]'}
            {...props}
        >
            <aside className={`fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-[--fg-accent] sm:flex width-${asideWidth}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <nav className={`flex flex-col items-center gap-4 px-2 sm:py-5 width-${asideWidth}`}>
                    <Link
                        className={
                            'group flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
                        }
                        to='/'
                    >
                        <span className='h-9 flex items-center'>
                            <Logo className='h-9 w-9'/>
                            {isHovered && <span className="ml-2">{" Conveyor"}</span>}
                        </span>
                    </Link>
                    <Link
                        className={
                            'group flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
                        }
                        to='/'
                    >

                        <span className="h-9 flex items-center">
                            <LucideHome />
                            {isHovered && <span className="ml-2">{" Home"}</span>}
                        </span>
                    </Link>
                    <Link
                        className={
                            'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
                        }
                        to='/'
                    >
                        
                        <span className="h-9 flex items-center">
                            <LucideBox />
                            {isHovered && <span className="ml-2">{" Models"}</span>}
                        </span>
                    </Link>
                    <Link
                        className={
                            'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
                        }
                        to='/'
                    >
                        
                        <span className="h-9 flex items-center">
                            <LucideEclipse />
                            {isHovered && <span className="ml-2">{" Themes"}</span>}
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
