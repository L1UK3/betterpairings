import React from 'react';
import { RankBadge } from './RankBadge';

export interface StandingsPlayer {
    id: string;
    name: string;
    position: number;
    points: number;
    wins: number;
    losses: number;
    draws: number;
    omw: number; // Opponent Match-Win % (e.g. 0.5843)
    oomw: number; // Opponent's Opponent Match-Win %
    dropped?: boolean;
}

export interface StandingsTableProps {
    players?: StandingsPlayer[];
    isLoading?: boolean;
}

export default function StandingsTable({
    players = [],
    isLoading = false,
}: StandingsTableProps) {
    const formatPercent = (val: number) => {
        return `${(val * 100).toFixed(2)}%`;
    };

    return (
        <div className="flex flex-col w-full h-full min-h-0">
            <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 shadow-xs [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                <table className="w-full border-collapse text-left">
                    <thead className="sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 z-10">
                        <tr className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            <th className="py-3 px-4 w-16 text-center">Rank</th>
                            <th className="py-3 px-4">Player</th>
                            <th className="py-3 px-4 text-center w-24">
                                Record
                            </th>
                            <th className="py-3 px-4 text-center w-20">
                                Points
                            </th>
                            <th className="py-3 px-4 text-right w-24 hidden md:table-cell">
                                OMW%
                            </th>
                            <th className="py-3 px-4 text-right pr-6 w-24 hidden lg:table-cell">
                                OOMW%
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td className="py-4 px-4 flex justify-center items-center">
                                        <div className="w-7 h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-sm w-32" />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-sm w-12 mx-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-10 mx-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-right pr-6 hidden md:table-cell">
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-sm w-12 ml-auto" />
                                    </td>
                                    <td className="py-4 px-4 text-right pr-6 hidden lg:table-cell">
                                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-sm w-12 ml-auto" />
                                    </td>
                                </tr>
                            ))
                        ) : players.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-16 text-sm text-zinc-500 dark:text-zinc-400"
                                >
                                    No standings data available.
                                </td>
                            </tr>
                        ) : (
                            players.map((player) => (
                                <tr
                                    key={player.id}
                                    className={`hover:bg-zinc-50/55 dark:hover:bg-zinc-900/40 transition-colors duration-150 group ${
                                        player.dropped ? 'opacity-50' : ''
                                    }`}
                                >
                                    <td className="py-2.5 px-4 flex justify-center items-center">
                                        <RankBadge position={player.position} />
                                    </td>
                                    <td className="py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors duration-150">
                                        <div className="flex items-center gap-2">
                                            <span>{player.name}</span>
                                            {player.dropped && (
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 uppercase tracking-wide">
                                                    Dropped
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-4 text-center text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                        {player.wins}-{player.losses}-
                                        {player.draws}
                                    </td>
                                    <td className="py-2.5 px-4 text-center text-sm font-bold">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                                            {player.points}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-4 text-right text-sm font-medium text-zinc-600 dark:text-zinc-300 hidden md:table-cell">
                                        {formatPercent(player.omw)}
                                    </td>
                                    <td className="py-2.5 px-4 text-right pr-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">
                                        {formatPercent(player.oomw)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
