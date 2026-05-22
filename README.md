# VPCPA Static HTML v10

This version fixes the logo background issue.

## Key updates from v9

1. vpcpa-logo.png regenerated with transparent background.
2. favicon.png regenerated with transparent background.
3. favicon.ico regenerated with transparent background.
4. apple-touch-icon.png regenerated with transparent background.
5. og-image.jpg regenerated using the transparent logo mark, so the logo no longer appears inside a white box.

## GitHub Pages testing note

After replacing files on GitHub Pages, the favicon may still show the old version because browsers cache favicon files strongly.

Recommended checks:
1. Hard refresh the page.
2. Open in incognito mode.
3. Add a temporary query string when testing, e.g. /assets/images/favicon.png?v=10.
4. Wait a few minutes for GitHub Pages cache to refresh.

## Main files to replace

assets/images/vpcpa-logo.png
assets/images/favicon.png
assets/images/favicon.ico
assets/images/apple-touch-icon.png
assets/images/og-image.jpg
