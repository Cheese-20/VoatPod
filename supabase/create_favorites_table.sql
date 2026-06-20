-- Run this SQL in your Supabase SQL editor to create the favorites table.

CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  show_id text NOT NULL,
  season integer NOT NULL,
  episode integer NOT NULL,
  title text,
  description text,
  audio_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS favorites_user_email_idx ON favorites (user_email);
CREATE INDEX IF NOT EXISTS favorites_show_id_idx ON favorites (show_id);
