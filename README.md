# Cyberpunk Tarot Website

A neon-drenched, grid-lined tarot deck website featuring Major Arcana cards in Moebius-inspired cyberpunk style.

---

## Quick Start

### 1. Add Your Images

Drop your 22 Major Arcana images into:

```
images/major-arcana/
```

**Expected filenames** (rename your images to match):

| # | Filename |
|---|----------|
| 0 | `00-fool.png` |
| 1 | `01-magician.png` |
| 2 | `02-high-priestess.png` |
| 3 | `03-empress.png` |
| 4 | `04-emperor.png` |
| 5 | `05-hierophant.png` |
| 6 | `06-lovers.png` |
| 7 | `07-chariot.png` |
| 8 | `08-strength.png` |
| 9 | `09-hermit.png` |
| 10 | `10-wheel.png` |
| 11 | `11-justice.png` |
| 12 | `12-hanged-man.png` |
| 13 | `13-death.png` |
| 14 | `14-temperance.png` |
| 15 | `15-devil.png` |
| 16 | `16-tower.png` |
| 17 | `17-star.png` |
| 18 | `18-moon.png` |
| 19 | `19-sun.png` |
| 20 | `20-judgement.png` |
| 21 | `21-world.png` |

> **Tip:** JPG, PNG, or WebP all work. Just update the filename in `cards.json` if using a different extension.

---

### 2. Edit Card Names & Descriptions

Open `cards.json` in any text editor. Each card looks like this:

```json
{
  "id": 0,
  "title": "The Fool",
  "image": "00-fool.png",
  "description": "Your description here..."
}
```

**Change:**
- `title` → Your custom card name
- `image` → Your image filename (if different)
- `description` → Your custom description

---

### 3. View Your Site

**Option A: Simple (double-click)**
- Just open `index.html` in your browser
- Note: Some browsers block local file loading. If cards don't appear, use Option B.

**Option B: Local Server (recommended)**

Using Python:
```bash
cd cyberpunk-tarot
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

Using Node.js:
```bash
npx serve
```

Using VS Code:
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## File Structure

```
cyberpunk-tarot/
├── index.html          ← Main webpage
├── cards.json          ← Edit card titles & descriptions here
├── README.md           ← You are here
├── css/
│   └── style.css       ← Styling (edit colors, fonts, etc.)
├── js/
│   └── app.js          ← Functionality (loads cards, modal)
└── images/
    └── major-arcana/   ← Drop your 22 card images here
        ├── 00-fool.png
        ├── 01-magician.png
        └── ...
```

---

## Customization

### Change Colors

Edit `css/style.css` at the top - find the `:root` section:

```css
:root {
  --neon-pink: #ff2a6d;      /* Pink accents */
  --neon-cyan: #05d9e8;      /* Cyan/teal accents */
  --neon-purple: #d300c5;    /* Purple accents */
  --neon-yellow: #f9f002;    /* Yellow (unused by default) */
  --dark-bg: #0d0221;        /* Main background */
  --darker-bg: #05010d;      /* Darker background */
}
```

### Change Site Title

Edit `index.html` - find and change:

```html
<h1 class="site-title glitch" data-text="Cyberpunk Tarot">Cyberpunk Tarot</h1>
<p class="site-subtitle">Major Arcana</p>
```

### Change About Text

Edit `index.html` - find the `#about` section and update the paragraph.

### Add a Favicon

1. Add your favicon image to `images/favicon.png`
2. Uncomment this line in `index.html`:
```html
<link rel="icon" type="image/png" href="images/favicon.png">
```

---

## Image Recommendations

- **Aspect Ratio:** 2:3 (portrait) works best (e.g., 400x600, 800x1200)
- **Format:** PNG or WebP for quality, JPG for smaller files
- **Size:** 400-800px wide is plenty for web display

---

## Troubleshooting

**Cards not showing?**
- Make sure image filenames in `cards.json` match your actual files
- Check browser console (F12) for errors
- Try using a local server instead of opening the file directly

**JSON errors?**
- Make sure all strings have quotes: `"title": "The Fool"`
- Check for missing commas between objects
- Use a JSON validator: https://jsonlint.com

**Images look stretched?**
- Try images with 2:3 aspect ratio
- Or edit `.card-image` in `style.css` to change `object-fit`

---

## Deploying Online

Easy free hosting options:

- **GitHub Pages:** Push to GitHub, enable Pages in settings
- **Netlify:** Drag & drop your folder at netlify.com
- **Vercel:** Connect your GitHub repo

No build step needed - it's all static HTML/CSS/JS.

---

Made for the neon-lit corners of the digital realm.
