import { SupabaseClient } from '@supabase/supabase-js';

/*---------------------------------------------------------------------------------------

    Tournament-related functions

---------------------------------------------------------------------------------------*/

export async function fetchTournaments(supabase: SupabaseClient) {
    return supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });
}

export async function fetchTournament(
    supabase: SupabaseClient,
    tournamentId: string
) {
    return supabase
        .from('tournaments')
        .select('*')
        .eq('id', tournamentId)
        .single();
}

export async function insertTournament(
    supabase: SupabaseClient,
    data: {
        name: string;
        format?: string;
        description?: string | null;
        max_players?: number | null;
        status?: 'setup' | 'active' | 'completed';
    }
) {
    return supabase
        .from('tournaments')
        .insert({
            name: data.name,
            format: data.format || 'swiss',
            description: data.description || null,
            max_players: data.max_players || null,
            status: data.status || 'setup',
        })
        .select()
        .single();
}

/*---------------------------------------------------------------------------------------

    Match-related functions

---------------------------------------------------------------------------------------*/

export async function fetchMatch(
    supabase: SupabaseClient,
    tournamentId: string,
    matchId: string
) {
    let query = supabase
        .from('matches')
        .select(
            `
            id,
            round,
            table_number,
            player_1:players!player1_id(id, name),
            player_2:players!player2_id(id, name),
            player_1_score,
            player_2_score,
            status
            `
        )
        .eq('tournament_id', tournamentId);

    return query.order('table_number', { ascending: true });
}

export async function fetchMatches(
    supabase: SupabaseClient,
    tournamentId: string,
    round?: number
) {
    let query = supabase
        .from('matches')
        .select(
            `
            id,
            round,
            table_number,
            player_1:players!player1_id(id, name),
            player_2:players!player2_id(id, name),
            player_1_score,
            player_2_score,
            status
            `
        )
        .eq('tournament_id', tournamentId);

    if (round !== undefined) {
        query = query.eq('round', round);
    }

    return query.order('table_number', { ascending: true });
}

export async function insertMatch(
    supabase: SupabaseClient,
    tournamentId: string,
    round: number,
    tableNumber: number,
    player1Id: string,
    player2Id: string
) {
    return supabase
        .from('matches')
        .insert({
            tournament_id: tournamentId,
            round,
            table_number: tableNumber,
            player1_id: player1Id,
            player2_id: player2Id,
            player_1_score: 0,
            player_2_score: 0,
            status: 'pending',
        })
        .select()
        .single();
}

export async function insertMatches(
    supabase: SupabaseClient,
    tournamentId: string,
    matches: {
        round: number;
        table_number: number;
        player1_id: string;
        player2_id: string;
    }[]
) {
    const matchesToInsert = matches.map((match) => ({
        tournament_id: tournamentId,
        round: match.round,
        table_number: match.table_number,
        player1_id: match.player1_id,
        player2_id: match.player2_id,
        player_1_score: 0,
        player_2_score: 0,
        status: 'pending',
    }));

    return supabase.from('matches').insert(matchesToInsert).select();
}

/*---------------------------------------------------------------------------------------

    Player-related functions

---------------------------------------------------------------------------------------*/

export async function fetchPlayer(supabase: SupabaseClient, id: string) {
    return supabase.from('players').select('*').eq('id', id).single();
}

export async function fetchPlayers(supabase: SupabaseClient) {
    return supabase
        .from('players')
        .select('*')
        .order('name', { ascending: true });
}

export async function insertPlayer(supabase: SupabaseClient, name: string) {
    return supabase.from('players').insert({ name }).select().single();
}
