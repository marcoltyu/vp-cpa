# Claude redesign cleanup v3

## Actual issue fixed

The mobile and desktop issue was caused by the bilingual display CSS being overridden.

The site contains alternating English and Chinese elements using:
[data-lang="en"]
[data-lang="zh"]

The original CSS tried to hide one language, but later component rules such as:

.hv-list li { display: grid; }

overrode the earlier display:none rules. As a result, both English and Chinese hero list items became visible at the same time.

## Fix

Added final high-priority language display rules at the end of styles.css using !important.

The visible hero visual list language keeps its intended grid layout. The hidden language is properly hidden.

## What to test

1. English mode should show only English hero list items.
2. Chinese mode should show only Chinese hero list items.
3. The dark blue hero visual section should no longer show alternating English and Chinese numbered items.
4. Check both desktop and iPhone.
