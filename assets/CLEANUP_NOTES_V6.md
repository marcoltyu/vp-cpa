# Claude redesign cleanup v6

## What changed

1. Removed the extra language switchers added in cleanup v5:
   header-lang-toggle
   mobile-lang-toggle

2. Restored the intended approach:
   Use Claude's original .lang-toggle design.

3. Added robust JS binding to the original .lang-toggle buttons.

4. Kept the important language display CSS fixes:
   English mode shows only English content.
   Traditional Chinese mode shows only Traditional Chinese content.

5. Kept cleanup v4 hero visual list structure fix.

## What to test

1. Use the original right-side language switcher.
2. Switch to 繁中 and confirm the homepage changes.
3. Switch back to EN.
4. Test About and Service pages.
5. Confirm no extra duplicated EN / 繁中 switchers appear.
