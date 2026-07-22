'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface TabOption {
    label: string;
    href?: string;
    value?: string;
}

export interface TabToggleProps {
    tabs: TabOption[];
    activeTab?: string;
    onChange?: (value: string) => void;
}

export default function TabToggle({
    tabs,
    activeTab,
    onChange,
}: TabToggleProps) {
    const pathname = usePathname();

    const isTabActive = (tab: TabOption) => {
        if (tab.href) {
            return pathname === tab.href;
        }
        return activeTab === tab.value;
    };

    return (
        <div className="flex items-center justify-center gap-1.5 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50">
            {tabs.map((tab) => {
                const active = isTabActive(tab);
                const baseClass = `py-1.5 px-3.5 rounded-md text-sm font-bold transition-all duration-150 ease-out select-none border-none cursor-pointer ${
                    active
                        ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50'
                }`;

                if (tab.href) {
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={baseClass}
                        >
                            {tab.label}
                        </Link>
                    );
                }

                return (
                    <button
                        key={tab.value}
                        type="button"
                        className={baseClass}
                        onClick={() => tab.value && onChange?.(tab.value)}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
