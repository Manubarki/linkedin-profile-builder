async function fetchGitHubData(githubUrl) {
  try {
    const match = githubUrl.match(/github\.com\/([^\/\?#]+)/);
    if (!match) return null;
    const username = match[1];
    const headers = { "Accept": "application/vnd.github.v3+json", "User-Agent": "LinkedIn-Brand-Builder" };
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, { headers }),
    ]);
    const profile = profileRes.ok ? await profileRes.json() : null;
    const repos = reposRes.ok ? await reposRes.json() : [];
    if (!profile) return null;
    const topRepos = repos.filter(r => !r.fork)
      .sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0,8)
      .map(r => ({ name: r.name, description: r.description||"", stars: r.stargazers_count, language: r.language||"", topics: r.topics||[] }));
    const langCount = {};
    repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language]||0)+1; });
    const topLanguages = Object.entries(langCount).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([l])=>l);
    return { username, bio: profile.bio||"", company: profile.company||"",
      followers: profile.followers, public_repos: profile.public_repos,
      topRepos, topLanguages, totalStars: repos.reduce((s,r)=>s+r.stargazers_count,0) };
  } catch(e) { return null; }
}

function formatGitHubContext(gh) {
  if (!gh) return "";
  const repoList = gh.topRepos.map(r =>
    `  - ${r.name}${r.stars>0?` (⭐${r.stars})`:""}: ${r.description}${r.language?` [${r.language}]`:""}${r.topics.length?` topics: ${r.topics.join(", ")}`:""}`
  ).join("\n");
  return `\nGITHUB PROFILE (${gh.username}):\n- Bio: ${gh.bio}\n- Public repos: ${gh.public_repos} | Followers: ${gh.followers} | Total stars: ${gh.totalStars}\n- Top languages: ${gh.topLanguages.join(", ")}\n- Top repositories:\n${repoList}\nReference specific projects by name.\n`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt, githubUrl, mode, screenshots } = req.body;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "API key not configured" });

    // Build GitHub context
    let githubContext = "";
    if (githubUrl && githubUrl.includes("github.com")) {
      const ghData = await fetchGitHubData(githubUrl);
      githubContext = formatGitHubContext(ghData);
    }

    const fullPrompt = prompt.replace("__GITHUB_DATA__", githubContext);

    // Build message content — images first, then text prompt
    let messageContent = [];

    if (screenshots && screenshots.length > 0) {
      for (const img of screenshots) {
        // img = { data: base64string, mediaType: "image/png" }
        messageContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: img.mediaType || "image/png",
            data: img.data
          }
        });
      }
    }

    messageContent.push({ type: "text", text: fullPrompt });

    const systemPrompt = mode === "score"
      ? "You are a LinkedIn profile expert. Analyse the profile screenshots provided and return detailed section-by-section scoring. Respond with ONLY a valid JSON object — no markdown fences, no text outside the JSON."
      : "You are a world-class personal brand strategist and LinkedIn profile writer. Analyse the LinkedIn profile screenshots provided and rewrite the profile. Respond with ONLY a valid JSON object — no markdown fences, just raw JSON starting with { and ending with }.";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey.trim(),
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: messageContent }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || "API error" });

    const text = (data.content || []).map(b => b.text || "").join("").trim();
    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
