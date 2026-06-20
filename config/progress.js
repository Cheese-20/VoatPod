const STORAGE_KEY = "podcast-progress";

const loadProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load progress", error);
    return [];
  }
};

const saveProgress = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save progress", error);
  }
};

export const getIncompleteProgressItems = () => {
  return loadProgress().filter((item) => !item.completed);
};

export const saveEpisodeProgress = (progress) => {
  const items = loadProgress();
  const key = `${progress.showId}-${progress.season}-${progress.episode}`;
  const existingIndex = items.findIndex((item) => item.key === key);
  const payload = {
    key,
    showId: progress.showId,
    season: Number(progress.season),
    episode: Number(progress.episode),
    title: progress.title,
    description: progress.description,
    audioUrl: progress.audioUrl,
    updated: progress.updated,
    completed: progress.completed === true,
    lastVisited: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    items[existingIndex] = { ...items[existingIndex], ...payload };
  } else {
    items.push(payload);
  }

  saveProgress(items);
};

export const markEpisodeComplete = (progressKey) => {
  const items = loadProgress();
  const updated = items.map((item) =>
    item.key === progressKey ? { ...item, completed: true } : item
  );
  saveProgress(updated);
};
