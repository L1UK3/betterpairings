import React from 'react';

export interface RankBadgeProps {
    position?: number;
}

export const RankBadge = React.memo(({ position }: RankBadgeProps) => {
    const baseClass =
        'flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shadow-xs transition-transform duration-300 hover:scale-110 select-none';

    if (position === 1) {
        return (
            <div
                className={`${baseClass} bg-linear-to-r from-amber-400 to-yellow-500 text-white border border-yellow-300/40`}
                title="1st Place"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                    <path d="M12 2a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                </svg>
            </div>
        );
    }

    if (position === 2) {
        return (
            <div
                className={`${baseClass} bg-linear-to-r from-slate-300 to-slate-400 text-white border border-slate-200/40`}
                title="2nd Place"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8a2 2 0 0 1 2.2-.13L12 5.4m2.79 9.6 4.55-7.86a2 2 0 0 0-.13-2.2L17.6 2.8a2 2 0 0 0-2.2-.13L12 5.4" />
                    <circle cx="12" cy="15" r="5" />
                    <path d="m11 13 1-1v4" />
                    <path d="M14 16h-3" />
                </svg>
            </div>
        );
    }

    if (position === 3) {
        return (
            <div
                className={`${baseClass} bg-linear-to-r from-amber-600 to-amber-700 text-white border border-amber-500/40`}
                title="3rd Place"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-100"
                >
                    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8a2 2 0 0 1 2.2-.13L12 5.4m2.79 9.6 4.55-7.86a2 2 0 0 0-.13-2.2L17.6 2.8a2 2 0 0 0-2.2-.13L12 5.4" />
                    <circle cx="12" cy="15" r="5" />
                    <path d="m11 13 1-1v4" />
                    <path d="M14 16h-3" />
                </svg>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">
            {position}
        </div>
    );
});

RankBadge.displayName = 'RankBadge';
