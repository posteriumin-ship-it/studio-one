# CLAUDE.md

## Project Overview
This project is a premium multi-page studio website built with static HTML, modular CSS, and vanilla JavaScript.

The goal of the site is:
- to create a strong premium first impression
- to communicate trust and clarity
- to present services and selected work
- to generate serious inquiries

This is not a React or Next.js project and should not be converted unless explicitly requested.

## Tech Stack
- Static HTML pages
- Modular CSS files
- Vanilla JavaScript
- Static hosting / deployment

## Architecture Rules
- Preserve the static multi-page architecture
- Do not convert the project into React, Next.js, Vue, or another framework
- Keep JavaScript modular by feature
- Keep CSS modular by section/responsibility
- Keep HTML semantic and clean
- Avoid unnecessary dependencies and libraries

## Project Structure
- `index.html` = main Serbian homepage
- `pages/` = Serbian inner pages
- `en/` = English pages
- `css/` = modular stylesheet files
- `js/` = modular JavaScript files by feature
- `assets/` = images, previews, videos, icons, and supporting visual files

## Design Direction
The visual direction must remain:
- premium
- editorial
- clean
- intentional
- high-end
- polished

The design must avoid:
- generic startup/SaaS aesthetics
- clutter
- weak hierarchy
- inconsistent spacing
- flashy or cheap-looking animations
- rushed mobile layouts

## UX Standards
- Every section must have a clear purpose
- Important content must be easy to scan
- CTA areas must feel obvious but elegant
- Navigation must be intuitive
- Desktop and mobile must both feel intentionally designed
- The site should communicate quality, trust, and professionalism

## HTML Rules
- Prefer semantic HTML (`nav`, `section`, `article`, `header`, `footer`, `button`, `form`, etc.)
- Keep heading hierarchy logical
- Avoid unnecessary wrapper divs unless needed for layout/animation
- Keep repeated structures consistent across pages

## CSS Rules
- Reuse tokens and variables from `tokens.css`
- Keep styling organized by section/responsibility
- Avoid random overrides scattered across files
- Prefer clean, scalable spacing and hierarchy
- Keep responsive behavior consistent and intentional
- Preserve the visual rhythm of the site

## JavaScript Rules
- Keep behavior separated by feature
- Do not mix unrelated logic into one file
- Keep selectors aligned with actual HTML class names
- Prefer clean DOM logic and class-based state changes
- When adding interactions, fail safely if an element is missing
- Avoid fragile hacks unless absolutely necessary

## Bilingual Rules
- Serbian and English versions should remain structurally aligned
- When a shared layout or interaction changes, check whether the same update is needed in both languages
- Preserve language-specific copy, but keep UX consistent

## Editing Behavior
- Before major structural edits, briefly explain the plan
- Do not touch unrelated sections unless necessary
- Do not rewrite working code without reason
- When editing shared elements such as nav, footer, or language switchers, verify all pages that use them
- If design direction is ambiguous, ask before implementing
- Prioritize maintainability and premium polish over quick hacks

## Quality Checks
After significant edits, always check:
- desktop layout
- mobile layout
- spacing consistency
- JS selectors vs HTML class names
- navigation links
- language version consistency
- whether animations break layout or scrolling

## Output Expectations
- Provide production-ready code
- Keep code readable and organized
- Prefer complete final code for the edited file(s) when changes are substantial
- Mention if the same change should be repeated on other pages
