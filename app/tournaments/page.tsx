import { Tournament } from "./Tournament";
import { createClient } from '@/app/lib/supabase';
import { fetchTournaments } from '@/app/lib/db';

export default async function TournamentsPage() {
    let tournaments: Tournament[] = [];
    let errorMsg = '';

    try {
        const supabase = await createClient();
        const { data, error } = await fetchTournaments(supabase);
        
        if (error) {
            errorMsg = error.message;
        } else {
            tournaments = (data || []) as Tournament[];
        }
    } catch (err) {
        errorMsg = 'Could not establish connection to the database.';
    }

    return (
        <div className="flex-1 w-full min-h-screen bg-zinc-50 dark:bg-black py-12 px-6 sm:px-12 md:px-16">
            <main className="max-w-6xl mx-auto flex flex-col gap-10">
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                <ul>
                    {tournaments.map((t) => (
                        <li key={t.id}>{t.name} ({t.format})</li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
