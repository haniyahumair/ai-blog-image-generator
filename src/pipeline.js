require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parseBlog } = require('./parser');
const { generateImage } = require('./imageGenerator');

async function run() {
  // Read blog from input folder
  const blogPath = path.join(__dirname, '../input/blog.md');
  const blogContent = fs.readFileSync(blogPath, 'utf8');
  
  console.log('📖 Reading blog...');

  // Parse blog with Claude
  console.log('🤖 Parsing blog with Claude...');
  const parsed = await parseBlog(blogContent);
  console.log('✅ Blog parsed!');

  // Create output folder
  const outputDir = path.join(__dirname, '../output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Generate featured image
  console.log('🎨 Generating featured image...');
  await generateImage('featured', {
    headline: parsed.featured_image_headline,
    theme: parsed.in_blog_images[0].theme
  }, path.join(outputDir, 'featured.png'));

  // Generate in-blog images
  for (let i = 0; i < parsed.in_blog_images.length; i++) {
    const image = parsed.in_blog_images[i];
    const templateName = image.format === 'bullets' ? 'bullets' : 'stat';
    
    console.log(`🎨 Generating in-blog image ${i + 1}...`);
    await generateImage(templateName, {
      headline: image.headline,
      theme: image.theme,
      bullets: image.bullets,
      stat_line: image.stat_line
    }, path.join(outputDir, `inblog_${i + 1}.png`));
  }

  console.log('🎉 All images generated! Check the /output folder!');
}

run();