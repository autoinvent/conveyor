/// <reference types="vite-plugin-svgr/client" />

import { HTMLAttributes } from "react"
import { Link, Outlet } from "@tanstack/react-router"

import Logo from '@/assets/logo.svg?react'

export interface DashboardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
}

export const Dashboard = ({ className, ...props }: DashboardProps) => {
    return (
        <div className={className ?? 'dashboard'} {...props}>
            <aside>
                <nav>
                    <Link to="/">
                        <Logo />
                    </Link>
                </nav>
            </aside>
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>

    )
}

