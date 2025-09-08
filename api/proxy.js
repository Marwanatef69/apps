// api/proxy.js
export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url query parameter" });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "my-mangadex-client/1.0", // required by MangaDex
      },
    });

    // Pass content type
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Return image or JSON
    const buffer = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
