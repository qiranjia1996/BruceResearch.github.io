# bruceresearch.github.io

Personal academic site for Qiran Jia. Plain HTML, CSS, and one small JS file —
no build step, no dependencies. Edit a file, push, it's live.

## Structure

```
index.html            Home — bio, interests, skills, recent news
experience.html       Education + experience timelines
publications.html     Publications, presentations, software
blog/index.html       Post listing
blog/hello-world.html Starter post — copy this to make a new one
assets/css/style.css  All styling, including the 11 theme palettes
assets/js/theme.js    Theme picker, mobile nav, skill-bar animation
assets/Resume.pdf     Resume, linked from the home page
assets/img/           Put photo.jpg here
```

Content lives directly in the HTML, marked with `<!-- EDIT: ... -->` comments.

## Common edits

**Add your photo.** Save a square image as `assets/img/photo.jpg`. In `index.html`,
delete the `<span>QJ</span>` line and uncomment the `<img>` line below it.

**Add Google Scholar / ORCID.** In `index.html`, uncomment the two links at the end
of the `<div class="links">` block and paste your URLs in.

**Add a publication.** Copy an existing `<li>` in `publications.html`, change the
title, authors, venue, and links. Wrap your own name in `<span class="me">Q. Jia</span>`
so it stays bold.

**Add a blog post.** Copy `blog/hello-world.html` to `blog/your-post.html`, rewrite it,
then add one `<li>` to the list in `blog/index.html`.

**Change a skill bar.** In `index.html`, each bar has `data-level="90"` and
`aria-valuenow="90"` — change both numbers to match.

**Add a theme.** Copy a `[data-theme="..."]` block in `style.css`, rename it, adjust the
color tokens, then add a matching `<li><button data-theme="yourname">` to the theme menu
in all five HTML files.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Pushing to `main` publishes to https://bruceresearch.github.io via GitHub Pages
(source: `main` branch, root). `.nojekyll` stops GitHub from running Jekyll over the files.
