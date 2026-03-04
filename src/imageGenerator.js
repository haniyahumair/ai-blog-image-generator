const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateImage(templateName, data, outputPath) {
  // Read the HTML template
  const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
  let html = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders with real content
  html = html.replace('{{headline}}', data.headline);
  html = html.replace('{{theme}}', data.theme);

  // Handle bullets
  if (templateName === 'bullets' && data.bullets) {
    const bulletsHtml = data.bullets.map(bullet => `
      <div class="bullet">
        <div class="bullet-dot"></div>
        <p class="bullet-text">${bullet}</p>
      </div>
    `).join('');
    html = html.replace('{{bullets}}', bulletsHtml);
  }

  // Handle stat
  if (templateName === 'stat' && data.stat_line) {
    html = html.replace('{{stat_line}}', data.stat_line);
  }

  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set page size based on template
  if (templateName === 'featured') {
    await page.setViewport({ width: 1200, height: 630 });
  } else {
    await page.setViewport({ width: 1080, height: 1080 });
  }

  // Load the HTML
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Take screenshot
  await page.screenshot({ path: outputPath, type: 'png' });

  await browser.close();
  console.log(`✅ Generated: ${outputPath}`);
}

module.exports = { generateImage };