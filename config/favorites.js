import supabase from "./SupabaseClient";

const TABLE_NAME = "favorites";

export const FAVORITES_TABLE_SQL = `-- SQL to create the favorites table in Supabase:
-- CREATE TABLE favorites (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_email text NOT NULL,
--   show_id text NOT NULL,
--   season integer NOT NULL,
--   episode integer NOT NULL,
--   title text,
--   description text,
--   audio_url text,
--   created_at timestamptz DEFAULT now()
-- );
-- CREATE INDEX ON favorites (user_email);
`;

export const ensureFavoritesTableExists = async () => {
  const { error } = await supabase.from(TABLE_NAME).select("id").limit(1);
  if (error) {
    return {
      exists: false,
      error,
      sql: FAVORITES_TABLE_SQL,
    };
  }
  return { exists: true };
};

export const getFavoriteForEpisode = async ({ userEmail, showId, season, episode }) => {
  if (!userEmail) return { data: null, error: null };
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_email", userEmail)
    .eq("show_id", showId)
    .eq("season", Number(season))
    .eq("episode", Number(episode))
    .single();

  return { data, error };
};

export const getFavoritesForUser = async (userEmail) => {
  if (!userEmail) return { data: [], error: null };
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_email", userEmail)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const toggleFavoriteEpisode = async ({ userEmail, showId, season, episode, title, description, audioUrl }) => {
  if (!userEmail) {
    return { error: new Error("You must be logged in to save favorites.") };
  }

  const { data: existing, error: readError } = await getFavoriteForEpisode({ userEmail, showId, season, episode });
  if (readError) {
    return { error: readError };
  }

  if (existing) {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", existing.id);
    return { data: null, error };
  }

  const payload = {
    user_email: userEmail,
    show_id: showId,
    season: Number(season),
    episode: Number(episode),
    title,
    description,
    audio_url: audioUrl,
  };

  const { data, error } = await supabase.from(TABLE_NAME).insert([payload]);
  return { data, error };
};
