# VoatPod

VoatPod is a podcast discovery web app with show browsing, episode playback, favorites, progress tracking, search, filter, and user profile management. 

## Key Features & Pages 

- Login and Signup
  <img width="966" height="509" alt="Screenshot 2026-06-21 at 01 05 28" src="https://github.com/user-attachments/assets/9e4455eb-a9e6-47ba-8597-8395c59070d3" />

- Home page with trending shows, genre filtering, and continue listening progress
  <img width="965" height="510" alt="Screenshot 2026-06-21 at 01 15 28" src="https://github.com/user-attachments/assets/7f9bf026-793f-446c-b1b8-ee214d430a25" />

- Podcast detail page with season/episode selection
   <img width="942" height="653" alt="Screenshot 2026-06-21 at 01 17 33" src="https://github.com/user-attachments/assets/9d4ad7b7-feae-474c-8800-b4b2787b3ad8" />

- Episode detail page with audio playback and favorite toggle
  <img width="946" height="645" alt="Screenshot 2026-06-21 at 01 16 24" src="https://github.com/user-attachments/assets/7eaade7f-36de-4343-bbb9-4a1c051797c6" />
- Search page with sorting and filtering
  <img width="964" height="664" alt="Screenshot 2026-06-21 at 01 18 09" src="https://github.com/user-attachments/assets/2272b8d0-d070-4bec-a38b-7ba320dbe61c" />

- Favorites page that loads saved episodes from Supabase
  <img width="962" height="427" alt="Screenshot 2026-06-21 at 01 18 32" src="https://github.com/user-attachments/assets/521934fc-ddef-49c5-9575-39a2faa4d4e4" />

- User profile management and account actions
  <img width="952" height="615" alt="Screenshot 2026-06-21 at 01 18 49" src="https://github.com/user-attachments/assets/c34655b5-7a09-410c-9db7-bd91d72c716a" />

- Persisted listening progress in `localStorage`

## Tech Stack

- Javascript
- React 
- Vite
- React Router DOM v6
- Supabase JS
- Fuse.js for search
- Zustand for state management
- Plain CSS styling

## Pages

- `/` — Login / signup page
- `/Home` — Home dashboard with trending, genres, and continue listening
- `/Search` — Search podcasts and sort/filter results
- `/Favorites` — Saved favorite episodes list
- `/Profile` — User profile, update, and delete actions
- `/podcast/:id` — Podcast detail page
- `/podcast/:id/season/:seasonNumber/episode/:episodeNumber` — Episode detail page

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file at the project root with your Supabase config:

```env
VITE_SOME_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_KEY="your-anon-key"
```

3. Run the development server:

```bash
npm run dev
```

4. Open the app at the URL shown by Vite (usually `http://localhost:5175`).

## Supabase Favorites Table

The app stores user favorites in a Supabase table named `favorites`.

Create the table in Supabase SQL editor using:

```sql
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
```

## Important Notes

- The app uses `localStorage` to persist incomplete episode progress via `config/progress.js`.
- Favorites require a logged-in user and Supabase connectivity.
- The Supabase client is configured in `config/SupabaseClient.js`.

## Project Structure

- `src/main.jsx` — entry point and route definitions
- `Pages/` — page components such as `Home`, `Search`, `Profile`, `PodcastDetail`, `EpisodeDetail`, `Favorites`
- `Components/` — shared UI components like navigation and podcast cards
- `config/` — Supabase client, favorites helpers, progress storage, and data loader
- `Styles/` — page-specific styling
- `supabase/create_favorites_table.sql` — table creation SQL

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview build locally
- `npm run lint` — lint source files

## Running in Production

Build and serve the app with:

```bash
npm run build
npm run preview
```
