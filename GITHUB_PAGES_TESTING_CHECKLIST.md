# GitHub Pages Testing Checklist

## Upload

1. Upload all files in this folder to the root of the GitHub Pages repository.
2. Keep `.nojekyll` in the root directory.
3. Make sure `index.html` is in the root directory, not inside another folder.

## Files that must exist

index.html
about.html
404.html
robots.txt
sitemap.xml
.nojekyll
assets/css/styles.css
assets/js/main.js
assets/images/vpcpa-logo.png
assets/images/favicon.png
assets/images/favicon.ico
assets/images/apple-touch-icon.png
assets/images/og-image.jpg
services/audit-and-assurance.html
services/taxation.html
services/accounting-and-bookkeeping.html
services/corporate-secretarial.html
services/business-advisory.html
services/sfc-licensed-corporations.html

## Testing

1. Open the GitHub Pages URL.
2. Test desktop dropdown menu under About and Services.
3. Test mobile menu.
4. Open all six service pages.
5. Open about.html.
6. Test email link.
7. Test telephone link.
8. Open /assets/images/favicon.png?v=11 directly to confirm the latest transparent icon.
9. Open /assets/images/og-image.jpg directly to check social preview image.

## Cache notes

Browsers cache favicons strongly. If the old icon still appears:

1. Open in incognito mode.
2. Hard refresh.
3. Open /assets/images/favicon.png?v=11 directly.
4. Wait a few minutes for GitHub Pages cache to refresh.

## Before live domain

1. Replace any GitHub Pages test URL references if added manually.
2. Confirm final domain is https://www.vp-cpa.com/.
3. Point domain DNS to hosting.
4. Enable HTTPS.
5. Submit sitemap.xml to Google Search Console.
