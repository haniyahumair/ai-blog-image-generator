# 🖼️ Blog Image Automation Tool

An AI-powered tool that automatically generates branded social media images from blog content. Drop in a blog post and get 4 ready-to-use images in seconds.

## ✨ How It Works

```
Blog Post (Markdown)
        ↓
Claude AI — extracts headlines, bullets, stats & themes
        ↓
Puppeteer — injects content into HTML templates & screenshots them
        ↓
4 Branded Images (PNG)
```

## 📸 Output

For every blog post the tool generates:
- **1 Featured Image** (1200x630) — for blog banners and social sharing
- **3 In-Blog Images** (1080x1080) — stat callouts and bullet point summaries

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| AI Parsing | Anthropic Claude API |
| Image Generation | Puppeteer (Headless Chrome) |
| Templates | HTML/CSS |
| Config | dotenv |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Anthropic API key ([get one here](https://console.anthropic.com))

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/blog-image-automation.git
cd blog-image-automation
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root folder
```
ANTHROPIC_API_KEY=your-api-key-here
```

4. Add your blog content to `input/blog.md`

5. Run the tool
```bash
node src/pipeline.js
```

6. Find your generated images in the `/output` folder 🎉

## 📁 Project Structure

```
/blog-image-automation
  ├── src/
  │   ├── parser.js          # Claude AI blog parser
  │   ├── imageGenerator.js  # Puppeteer image generator
  │   └── pipeline.js        # Main orchestrator
  ├── templates/
  │   ├── featured.html      # 1200x630 featured image template
  │   ├── bullets.html       # 1080x1080 bullet points template
  │   └── stat.html          # 1080x1080 stat callout template
  ├── input/
  │   └── blog.md            # Drop your blog here
  ├── output/                # Generated images saved here
  └── .env                   # Your API keys (never commit this!)
```

## 🤖 How the AI Parsing Works

The tool sends the blog to Claude AI with a structured prompt that extracts:
- The main H1 headline (shortened for visual display)
- 2-3 content blocks rephrased into bullets or stats
- A theme tag per block (e.g. recovery, mental-health, addiction) used to pick the right template

Claude returns clean JSON that gets injected directly into the HTML templates.

## 🎨 Customising Templates

All templates are plain HTML/CSS files in the `/templates` folder. To match your brand:
- Change background colors in the `body` CSS
- Swap fonts by adding a Google Fonts import
- Add your logo using an `<img>` tag
- Adjust font sizes and spacing as needed

## 📝 Example Input

```markdown
# 5 Signs You Need Addiction Treatment

Addiction affects millions of people worldwide. Studies show that 1 in 7 Americans
will face a substance use disorder in their lifetime...
```

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |

Never commit your `.env` file. It's already in `.gitignore`.

## 🗺️ Roadmap

- [ ] Express.js backend
- [ ] React frontend for web access
- [ ] Custom brand kit support
- [ ] Batch processing multiple blogs
- [ ] More template designs

## 📄 License

MIT
