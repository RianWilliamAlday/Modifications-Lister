export default async function handler(request, response) {
  const { search } = request.query;

  if (!search) {
    return response.status(400).json({ error: "Search query parameter is required" });
  }

  try {
    const apiKey = process.env.GAMES;

    if (!apiKey) {
      return response.status(500).json({ error: "RAWG API key is missing on the server." });
    }

    const cleanSearch = search.trim().replace(/\s+/g, '+');
    const targetUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${cleanSearch}&page_size=5`;

    const res = await fetch(targetUrl);

    if (!res.ok) {
      return response.status(res.status).json({ error: "Failed to fetch data from RAWG" });
    }

    const data = await res.json();
    
    return response.status(200).json(data);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}