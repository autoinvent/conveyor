/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import { ComponentProps } from 'react';
import { LucideHome, LucideEclipse, LucideBox } from 'lucide-react';
import { Link, Outlet } from '@tanstack/react-router';

import Logo from '@/assets/logo.svg?react';

import { useConveyor } from '../Conveyor';
import { twMerge } from 'tailwind-merge';

export interface DashboardProps extends ComponentProps<'div'> {}

export const Dashboard = ({ ...props }: DashboardProps) => {
  const { selected: models } = useConveyor((state) => state.models);
  const [modelsOpen, setModelsOpen] = React.useState(false);
  //TODO const [themeOpen, themeOpen] = React.useState(false);

  const toggleModels = () => {
    setModelsOpen((prevState) => !prevState);
  };
  return (
    <div className="w-screen h-screen text-[--text-color] bg-[--bg-color]">
      <aside
        className="fixed w-14 whitespace-nowrap group text-[--text-muted] inset-y-0 left-0 z-10 border-[--fg-accent] border-r bg-[--bg-accent] hover:w-[150px] transition-[width]"
        {...props}
      >
        <nav className="flex flex-col gap-4 px-2 py-5">
          <div className="items-start inline-flex text-start gap-2 text-lg font-semibold text-[--text-color] cursor-default overflow-hidden">
            <Logo className="h-9 w-9" />
            <span className="ml-1.5 mt-1.5 hidden group-hover:inline">
              Conveyor
            </span>
          </div>
          <Link
            className="py-1.5 items-start h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color] overflow-hidden"
            to="/"
          >
            <LucideHome className="w-9 " />
            <span className="ml-2 hidden group-hover:inline">Home</span>
          </Link>
          <div>
            <Link
              className={twMerge(
                'py-1.5 items-start h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color] overflow-hidden',
                modelsOpen ? 'group-hover:text-[--text-color]' : '',
              )}
              onClick={toggleModels}
            >
              <LucideBox className="w-9" />
              <span className="ml-2 hidden group-hover:inline">Models</span>
            </Link>
            {modelsOpen && (
              <div className="ml-[52px] hidden group-hover:flex flex-col mt-1 gap-1">
                {Object.keys(models).map((model) => (
                  <Link
                    key={model}
                    to={`/${model}`}
                    className="py-1.5 items-end inline h-9 w-full text-lg font-semibold hover:text-[--text-color] overflow-hidden"
                  >
                    {model}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link className="py-1.5 items-start h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color] overflow-hidden">
            <LucideEclipse className="w-9" />
            <span className="ml-2 hidden group-hover:inline">Themes</span>
          </Link>
        </nav>
      </aside>
      <div className="ml-14">
        <main className="mx-[10%] max-w-[80%] p-4 px-6 text-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
