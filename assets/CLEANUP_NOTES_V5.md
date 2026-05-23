# Claude redesign cleanup v5

## What was fixed

1. Added visible language switchers:
   Desktop header: EN / 繁中
   Mobile hamburger menu: EN / 繁中

2. Added robust JavaScript language switching:
   Uses html lang="en-HK" and html lang="zh-HK"
   Saves preference to localStorage
   Syncs all EN / 繁中 buttons

3. Reinforced language display CSS at the end of styles.css:
   English mode shows only [data-lang="en"]
   Traditional Chinese mode shows only [data-lang="zh"]

4. Hero practice card divider was softened so it reads as a static divider, not a swipe indicator.

## What to test

1. Desktop: click EN / 繁中 in header.
2. Mobile: open hamburger menu and click EN / 繁中.
3. Confirm homepage switches language.
4. Confirm About page switches language.
5. Confirm all service pages switch language.
6. Confirm the dark blue hero visual card does not show mixed languages.
