require('dotenv').config();
const axios = require('axios');

async function parseBlog(blogContent) {
  const response = await axios.post(
    'https://api.anthropic.com/v1/messages',
    {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are processing a behavioral health blog for image generation.

        Given the blog content below, return ONLY valid JSON with this structure:
        {
        "h1": "exact H1 text from blog",
        "featured_image_headline": "H1 shortened to max 8 words for visual display",
        "in_blog_images": [
            {
            "theme": "one of: recovery, detox, addiction, mental-health, therapy, family, general",
            "format": "bullets OR stat",
            "headline": "short 5-7 word headline for this image",
            "bullets": ["point 1", "point 2", "point 3"],
            "stat_line": null
            },
            {}
        ]
        }

        Rules:
        - All text must be rephrased — NOT copied verbatim from the blog
        - Bullets max 10 words each
        - Stat lines must cite a real statistic from the blog content only
        - Themes must match available options exactly

        Blog content:
        ${blogContent}`
                }
            ]
            },
            {
            headers: {
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            }
            }
        );

  const text = response.data.content[0].text;
  const clean = text.replace(/```json|```/g, '').trim();
return JSON.parse(clean);
}

module.exports = { parseBlog };