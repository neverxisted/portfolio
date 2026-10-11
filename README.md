# Abdul Rahman — Developer Portfolio

A responsive, high-aesthetic developer portfolio built with modern semantic HTML5, vanilla CSS3 glassmorphism, dynamic animations, and interactive JavaScript.

## ✨ Features

- **High-End Glassmorphism Aesthetics**: Deep space dark mode with frosted acrylic cards, dynamic accent glow themes, and subtle mesh lighting.
- **Interactive Accent Theme Switcher**: Instant switching between Cyber Cyan, Electric Violet, and Emerald Matrix (saved in `localStorage`).
- **Interactive Hero Sandbox**:
  - `profile.ts`: Syntax-highlighted developer spec with runnable code simulator.
  - `config.json`: Technical capabilities overview.
  - `terminal`: Working interactive CLI shell (`help`, `skills`, `projects`, `contact`, `hire`, `clear`).
- **Constellation Background**: Subtle particle canvas with proximity connection lines.
- **Interactive Projects Showcase**:
  - Filterable by category (`All`, `AI / Data`, `Web`).
  - 3D perspective mouse tilt on project cards.
  - Rich animated visuals (pulsing network graph, holographic scanner, interactive progress box).
  - Detailed modal popups with architecture breakdown.
- **Real Working Contact System**:
  - In-browser contact form connected to `FormSubmit.co` AJAX dispatcher.
  - Sends messages directly to **rahman2006notfound@gmail.com**.
  - Preset inquiry chips (Internship, Project, Chat).
  - 1-click fallback to launch default email client (`mailto:`).
  - 1-click copy buttons with toast notifications for Email and Phone.
- **Scroll Progress & Reading Meter**:
  - Linear progress bar at top of viewport.
  - Circular SVG progress meter inside the Back-to-Top button.

## 🚀 How to Run Locally

Open `index.html` in any modern web browser, or run via VS Code Live Server.

Using Python HTTP Server:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

## 📬 Receiving Emails from the Contact Form (One-Time Activation)

The contact form is configured to send submissions straight to `rahman2006notfound@gmail.com` using the free [FormSubmit](https://formsubmit.co) service without requiring any backend code.

**First-Time Activation Step:**
1. Open your portfolio in a browser and send a test message from the contact form.
2. FormSubmit will automatically send an email to `rahman2006notfound@gmail.com` with a button: **"Activate Form"**.
3. Click **"Activate Form"** once in your Gmail inbox.
4. From that moment on, every message submitted on your website will arrive directly in your Gmail inbox!

## 🌐 Deploying to GitHub Pages

1. Push `index.html`, `style.css`, `script.js`, and `README.md` to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.
