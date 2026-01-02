# Wanderly — Responsive Landing (Demo)

Files:

- `index.html` — landing page with fixed navigation
- `styles.css` — styles and responsive rules
- `script.js` — scroll and hover interactivity

Open locally:

1. Double-click `index.html` to open in your browser, or run a simple server:

```powershell
cd "c:\Users\Personal\Downloads\prodigy infotech\task_1"
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Behavior:

- Navigation is `position: fixed` and visible on all pages.
- When the page scrolls down the header receives a `scrolled` style (background and shadow).
- Hovering (or focusing) a menu item applies a highlighted style; JS also adds a `hovered` class for extra effect.
- On small screens the nav collapses behind a toggle button.

Contact form and images:

- The Contact section now includes a form (`#contact-form`) where users can enter name, email and a message.
- Use the file chooser to attach one or more images (client-side preview supported).
- Images are validated client-side: only image MIME types are accepted and each file is limited to 5MB.
- You can remove selected preview images before submitting.
- The form submit is a local demo (no server) — it shows a success message and clears the form.

New sections:

- `Recommendations`: traveler-picked experiences with images and animated hover states.
- `Plans`: three plan cards with a flip animation to reveal details on hover/focus.
- The hero section uses a background image with a dark overlay for better contrast; replace the URL in `styles.css` if you'd like a different photo.
