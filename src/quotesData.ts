/**
 * ============================================================================
 * QUOTES DOCUMENT (`src/quotesData.ts`)
 * ============================================================================
 *
 * HOW TO MANAGE QUOTES:
 *
 * 1. ADDING NEW QUOTES:
 *    - Add new entries to the `QUOTES` array below.
 *    - Use `\n` (or a multi-line template string) for line breaks in verse.
 *    - You can optionally include an `attribution` field if desired.
 *
 * 2. CHOOSING RANDOM vs. SPECIFIC QUOTE (`QUOTE_CONFIG`):
 *    - Set `mode: 'random'` to pick a random quote from `QUOTES` every time
 *      the page is loaded.
 *    - Set `mode: 'fixed'` and set `fixedIndex: 0` (or `1`, `2`, etc.,
 *      0-indexed) to pin a specific quote so that one always shows.
 * ============================================================================
 */

export interface QuoteItem {
  text: string;
  attribution?: string;
}

export const QUOTE_CONFIG: {
  mode: 'random' | 'fixed';
  fixedIndex: number;
} = {
  // Set QUOTE_CONFIG.mode to 'random' to pick a random quote on each page load, or set mode: 'fixed' with fixedIndex: 0 (or any index) to pin a specific quote.
  mode: 'random',
  fixedIndex: 0
};

export const QUOTES: QuoteItem[] = [
  {
    text: 'Und setzet ihr nicht das Leben ein,\nNie wird euch das Leben gewonnen sein.'
  }
  // Example of how to add more quotes later:
  // {
  //   text: 'Another quote line one,\nAnother quote line two.',
  //   attribution: 'Optional Author'
  // }
];

export function getInitialQuote(): QuoteItem | null {
  if (QUOTES.length === 0) return null;

  if (QUOTE_CONFIG.mode === 'fixed') {
    const idx = Math.max(0, Math.min(QUOTES.length - 1, QUOTE_CONFIG.fixedIndex));
    return QUOTES[idx];
  }

  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomIndex];
}
