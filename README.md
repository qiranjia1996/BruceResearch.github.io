# bruceresearch.github.io

Personal academic site for Qiran Jia. Plain HTML, CSS, and one small JS file —
no build step, no dependencies. Edit a file, push, it's live.

## Structure

```
index.html            Home — photo, short about, interests (kept deliberately brief)
experience.html       Education + experience timelines, grouped skills
publications.html     Publications, presentations, software
blog/index.html       News list
blog/hello-world.html Starter post (unlinked) — copy this to make a new one
assets/css/style.css  All styling, including the 11 theme palettes
assets/js/theme.js    Theme picker, mobile nav, background particle field
assets/Resume.pdf     Resume, linked from the home page
assets/img/           Put photo.jpg here
```

Content lives directly in the HTML, marked with `<!-- EDIT: ... -->` comments.

## Common edits

**Replace the photo.** Overwrite `assets/img/photo.jpg` with another square image —
`index.html` already points at it. Roughly 440×440 keeps it sharp on retina screens.

**Add Google Scholar / ORCID.** In `index.html`, uncomment the two links at the end
of the `<div class="links">` block and paste your URLs in.

**Add a publication.** Copy an existing `<li>` in `publications.html`, change the
title, authors, venue, and links. Wrap your own name in `<span class="me">Q. Jia</span>`
so it stays bold.

**Add a news item.** Add an `<li>` to the News list at the top of `blog/index.html`,
newest first. The home page stays short on purpose — news does not go there.

**Add a blog post.** Copy `blog/hello-world.html` to `blog/your-post.html`, rewrite it,
then link it with an `<li>` in `blog/index.html` (there is no separate Posts list —
add it to the News list or start one).

**Change a skill.** In `experience.html`, the Skills section is grouped `.skill-group`
blocks — each has an `<h3>` label and a `<ul class="pills">`. Add, remove, or rename
the `<li>` chips; add a whole `.skill-group` for a new category.

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
