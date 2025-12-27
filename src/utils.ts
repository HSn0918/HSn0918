export const isUrl = (value?: string): value is string =>
  typeof value === "string" && value.startsWith("http");

export const splitTechStack = (stack?: string): string[] =>
  (stack || "")
    .split(/[,，、/]/)
    .map((item) => item.trim())
    .filter(Boolean);

const starsCache = new Map<string, { stars: number; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const getGitHubStars = async (
  owner: string,
  repo: string
): Promise<number | "N/A"> => {
  const cacheKey = `${owner}/${repo}`;
  const cachedData = starsCache.get(cacheKey);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.stars;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!res.ok) throw new Error("Failed");
    const data = (await res.json()) as { stargazers_count?: number };
    const stars = data.stargazers_count ?? 0;
    starsCache.set(cacheKey, { stars, timestamp: Date.now() });
    return stars;
  } catch (e) {
    return cachedData ? cachedData.stars : "N/A";
  }
};
