# Claude redesign cleanup v7

## Issue fixed

The original right-side language switcher existed visually but did not switch the site language.

## Root cause

The previous cleanup did not reliably bind the original Claude `.lang-toggle` buttons. Some buttons used the original `data-lang` structure while the JS was looking for another selector.

## Fix

1. Kept Claude's original `.lang-toggle` UI.
2. Did not add any new language switcher.
3. Added stable `data-i18n-switch` only to buttons inside `.lang-toggle`.
4. Replaced the language switch JavaScript with a robust handler.
5. Preserved localStorage language preference.
6. Kept final CSS rules to hide the inactive language.

## Test

1. Open index.html.
2. Press the original EN / 繁中 button at the right side.
3. Confirm text changes.
4. Go to about.html and service pages.
5. Confirm the selected language persists.
