# Project Overview

The website serves as a hub for a video game that I am currently developing. Visitors can get a first impression of the game through a description, screenshots, and videos. Regular news posts (devlogs) provide insight into the development process, supplemented by a newsletter signup that allows interested parties to stay up to date. In addition, users can quickly access the platforms the game will be available on, as well as links to the associated social media channels. An "About" subpage provides a brief insight into who I am and the history of the game's creation.

The site is a static, multi-page website (no backend, no build step) built with HTML, CSS, and a small amount of vanilla JavaScript, using HTMX to keep shared markup in sync across pages.

## Breakpoints

- **Desktop:** > 1279px
- **Tablet:** ≤ 1279px
- **Mobile:** ≤ 767px

Breakpoints are defined in `em` rather than `px`, so they stay tied to the browser's default font size independently of any later root font-size changes. All other sizing (typography, spacing, most dimensions) is defined in `rem`, so the layout scales correctly if a visitor changes their browser's font-size setting. 1px borders are the one deliberate exception, kept in `px` to stay a true hairline.

## Browser

Developed and tested primarily for Firefox.

## CSS Structure

- All styles live in a single `styles.css` file, using native CSS nesting (`&`, nested selectors, nested media queries) to keep each component's rules — including its own responsive overrides — grouped together in one place, instead of scattered across separate flat rules and media query blocks.
- The HTMX script is loaded with `defer` so it doesn't block HTML parsing.

## Content Architecture

- `header.html`, `footer.html`, and `newsletter.html` are shared components loaded on every page via HTMX (`hx-get`), so structural changes only need to be made in one place.
- Each devlog/news post is its own static HTML file (`article_MMDDYY.html`), linked directly from `news.html`. This avoids needing a backend or templating engine while still keeping every post at its own dedicated, linkable URL.

## Interactivity / JavaScript

- **Active nav-link highlighting:** recalculated after every HTMX swap by comparing the current URL against each nav link.
- **Mobile navigation:** a hamburger button toggles the nav menu open/closed and keeps `aria-expanded` in sync with the actual state.
- **Tab switching** on the media page between "Videos" and "Screenshots".
- **Lightbox gallery:** screenshots open in a lightbox on click; the lightbox can be closed by clicking its close button, clicking the backdrop, or pressing `Escape`.

## Animations

- The hamburger icon animates into an "X" on open. This is driven directly by the `aria-expanded` attribute already used for accessibility, rather than a separate CSS class, so the visual state and the accessibility state can never fall out of sync.
- The mobile nav menu fades and slides in/out instead of switching instantly between `display: none` and `display: flex`.
- The lightbox fades in, with the image scaling in slightly, instead of appearing instantly.
- All of the above respect `prefers-reduced-motion`: transitions are disabled entirely for visitors who have reduced motion enabled at the OS/browser level.

## Accessibility

- Semantic HTML structure (`nav`, `header`, `footer`, headings in order).
- All interactive elements are real, keyboard-operable elements — for example, screenshot thumbnails and the lightbox close control are `<button>` elements rather than an `<img>` or `<span>` with only a click handler, so they can be reached and activated via keyboard, not just the mouse.
- `aria-expanded` on the hamburger button and `aria-label` on icon-only buttons where no visible text is available.
- Visible `:focus-visible` outline on interactive elements that previously suppressed the browser's default focus ring, so keyboard users can see where focus currently is without adding a visible ring on every mouse click.
- Every image has accurate alt text; this included going back and fixing a few cases where an image's alt text no longer matched what the image actually showed (a leftover from copy-pasting markup between pages).
- `rem`/`em`-based sizing throughout (see CSS Structure) instead of fixed `px` values.
- `prefers-reduced-motion` support (see Animations).

### Screen reader testing

The site was manually tested with a screen reader to verify that navigation, the lightbox, and other interactive elements behave correctly for non-visual users. A walkthrough video of this test is available here: [Screen reader test](https://youtu.be/ClKAFhIFZSs)

## Refactoring Notes

Over the course of development, the CSS went through several dedicated cleanup passes based on tutor feedback:

- Converted the entire stylesheet from `px` to `rem`/`em` (see Breakpoints and Accessibility).
- Removed duplicated rules (e.g. a `font-family` declaration repeated on ~12 separate selectors instead of once on `body`; two near-identical rule sets for visually similar elements merged into shared selectors) and a media query that was incorrectly nested inside another media query instead of written as a sibling.
- Standardized CSS nesting so related child selectors and their own responsive overrides are consistently grouped under their parent component, instead of a mix of nested and flat rules across the file.
- Replaced structural use of `<br>` (in form layouts and the footer) with proper CSS layout (`display: flex`) and separate elements, so layout is controlled by CSS rather than manual line breaks in the markup.
- Simplified a redundant 3-value `padding` shorthand that was functionally identical to a single value.

## Images

Screenshots and photos are provided in WebP format to reduce file size; the game logo and icons use PNG for compatibility.

## Git Workflow

The project was developed iteratively across multiple phases (concept → layout/responsiveness → refactoring and polish), with each round of tutor feedback addressed as a separate, focused pass (e.g. HTMX loading behavior, CSS unit conversion, keyboard accessibility, alt text) rather than one large end-of-project cleanup.
