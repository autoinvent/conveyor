/// <reference types="vite-plugin-svgr/client" />

import { ComponentProps } from 'react';
import { LucideHome, LucideBox, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { Link, Outlet } from '@tanstack/react-router';

import Logo from '@/logo.svg?react';

import { useConveyor } from '../Conveyor';

export interface DashboardProps extends ComponentProps<'div'> {}

export const Dashboard = ({ ...props }: DashboardProps) => {
  const { selected: models } = useConveyor((state) => state.models);

  return (
    <div className="w-screen h-screen text-[--text-color] bg-[--bg-color]">
      <aside
        className="fixed w-14 whitespace-nowrap group text-[--text-muted] inset-y-0 left-0 z-10 border-[--fg-accent] border-r bg-[--bg-accent] hover:w-[150px] transition-[width]"
        {...props}
      >
        <nav className="flex flex-col gap-4 px-2 py-5">
          <div className="items-start transition-colors inline-flex text-start gap-2 py-1 rounded-md text-lg font-semibold text-[--text-color] cursor-default overflow-hidden">
            <Logo className="h-9 w-9" />
            <span className="ml-1.5 mt-1.5 hidden group-hover:inline">
              Conveyor
            </span>
          </div>
          <hr className="border-t border-[--fg-accent]" />
          <Link
            className="py-1.5 rounded-md hover:bg-[--fg-accent] items-start transition-colors h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color] overflow-hidden"
            to="/"
          >
            <LucideHome className="w-9 " />
            <span className="ml-2 hidden group-hover:inline">Home</span>
          </Link>
          <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <Accordion.Item className="transition-all" value="Models">
              <Accordion.Header className="flex">
                <Accordion.AccordionTrigger className="rounded-md hover:bg-[--fg-accent] border-0 px-0 flex flex-1 items-center justify-between py-1.5 font-semibold text-lg transition-all hover:text-[--text-color] [&[data-state=open]>svg]:rotate-180">
                  <LucideBox className="w-9  transition-transform duration-200" />
                  <span className="ml-3 hidden group-hover:inline">Models</span>
                  <ChevronDown className="hidden group-hover:inline h-4 w-4 shrink-0 transition-transform duration-200" />
                </Accordion.AccordionTrigger>
              </Accordion.Header>
              <Accordion.AccordionContent className="hidden group-hover:flex flex-col mt-1 gap-1 overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                {Object.keys(models).map((model) => (
                  <Link
                    key={model}
                    to={`/${model}`}
                    className=" hover:bg-[--fg-accent] rounded-md py-1.5 pl-[52px] inline h-9 w-full text-lg font-semibold hover:text-[--text-color] overflow-hidden"
                  >
                    {model}
                  </Link>
                ))}
              </Accordion.AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
          {/* <hr className="border-t border-[--fg-accent]" />
          <span className="py-1.5 rounded-md hover:bg-[--fg-accent] items-start transition-colors h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color] overflow-hidden">
            <LucideEclipse className="w-9" />
            <span className="ml-2 hidden group-hover:inline">Themes</span>
          </span> */}
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
