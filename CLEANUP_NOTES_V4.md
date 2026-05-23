# Claude redesign cleanup v4

## Actual layout bug fixed

The issue shown on desktop and mobile was caused by this structure:

<li><b>Title</b> description text</li>

The list item used CSS Grid with a narrow first column for the counter. The text node after <b> became a separate grid item and was placed into the narrow column, causing one-word or one-character wrapping.

## Fix

Each hero visual list item has now been changed to:

<li>
  <span class="hv-copy">
    <b>Title</b>
    <span>Description</span>
  </span>
</li>

Additional CSS keeps `.hv-copy` in the second grid column.

## Basic link / asset scan

HTML files checked: 9
Local href/src references checked: 318
Missing local references found: 0

No missing local files detected in href/src references.

## What to test

1. Desktop hero visual card: descriptions should appear in normal lines.
2. iPhone hero visual card: descriptions should appear in normal lines.
3. English mode should show only English list items.
4. Chinese mode should show only Chinese list items.
5. Test About and Services dropdown.
