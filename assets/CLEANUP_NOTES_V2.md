# Claude redesign cleanup v2

## Fix applied

The mobile screenshot showed Chinese and English text being forced into very narrow columns in a dark numbered or bilingual section.

Cause:
Desktop grid or multi-column layout was still active on mobile, so text containers became too narrow and the browser wrapped text one character per line.

Fix:
Added mobile responsive CSS overrides to force bilingual, numbered, process and approach list sections into a single-column layout below 768px.

## What to test

1. Open the GitHub Pages site on iPhone.
2. Check the dark blue section shown in the screenshot.
3. Confirm English and Chinese descriptions now display in normal horizontal lines.
4. Check About and Services dropdown.
5. Check all service pages.
