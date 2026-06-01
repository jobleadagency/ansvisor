/**
 * Normalize shopping cards captured into `prompt_results.shopping_cards`.
 *
 * Three providers feed this column today with three different raw shapes:
 *
 *   - **Perplexity** (`platform = 'perplexity-web'`) — snake_case keys
 *     (`image_url`, `review_count`, …).
 *   - **Google AI Mode** (`platform = 'google-aimode'`) — camelCase keys
 *     (`imageUrl`, `reviewCount`, …). NB: the live response is camelCase
 *     even though the docs show snake_case — verified in #86.
 *   - **Microsoft Copilot** (`platform = 'copilot-web'`) — camelCase keys.
 *
 * The downstream `prompt_result_shopping_cards` table flattens those onto
 * a single set of analytical columns. Each normalizer here pulls the
 * fields we care about, parses the price into amount + currency, and
 * leaves the original card under `raw` so we can re-derive columns later
 * without going back to the provider.
 *
 * Field-name lookups are intentionally lenient — both providers we've
 * looked at have shipped silent renames before (#49 retro on AI Mode),
 * and the cost of `?? otherName` is tiny.
 */

import { URL } from 'node:url';

// Loose set of currency codes Perplexity / Copilot embed in price strings
// like "$29.99", "EUR 19,90", "₺499". Anything else falls back to null —
// we still capture the numeric amount and the symbol stays in `raw`.
const CURRENCY_SYMBOLS = {
  $: 'USD',
  '€': 'EUR',
  '£': 'GBP',
  '¥': 'JPY',
  '₺': 'TRY',
  '₹': 'INR',
  '₩': 'KRW',
};

const CURRENCY_CODES = new Set([
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'TRY',
  'INR',
  'KRW',
  'CAD',
  'AUD',
  'CHF',
  'CNY',
  'SEK',
  'NOK',
  'DKK',
  'MXN',
  'BRL',
]);

/**
 * @param {unknown} value
 * @returns {{ amount: number|null, currency: string|null }}
 */
function parsePrice(value) {
  if (value == null) return { amount: null, currency: null };

  // Object form: { amount, currency } or { value, currency }
  if (typeof value === 'object' && !Array.isArray(value)) {
    const amount =
      typeof value.amount === 'number'
        ? value.amount
        : typeof value.value === 'number'
          ? value.value
          : Number.parseFloat(value.amount ?? value.value ?? '');
    const currency =
      typeof value.currency === 'string'
        ? value.currency.toUpperCase()
        : typeof value.currencyCode === 'string'
          ? value.currencyCode.toUpperCase()
          : null;
    return {
      amount: Number.isFinite(amount) ? amount : null,
      currency: currency && CURRENCY_CODES.has(currency) ? currency : currency || null,
    };
  }

  // Numeric form (rare, but tolerate)
  if (typeof value === 'number' && Number.isFinite(value)) {
    return { amount: value, currency: null };
  }

  // String form — the common case. Examples we see in the wild:
  //   "$29.99", "USD 29.99", "29.99 USD", "₺499,90", "€19,90"
  if (typeof value === 'string') {
    const trimmed = value.trim();

    // Currency by leading symbol
    let currency = null;
    for (const [symbol, code] of Object.entries(CURRENCY_SYMBOLS)) {
      if (trimmed.includes(symbol)) {
        currency = code;
        break;
      }
    }

    // Currency by 3-letter code anywhere in the string
    if (!currency) {
      const codeMatch = trimmed.match(/\b([A-Z]{3})\b/);
      if (codeMatch && CURRENCY_CODES.has(codeMatch[1])) {
        currency = codeMatch[1];
      }
    }

    // Amount — first decimal-looking number. Handles both "29.99" and
    // "29,99" (EU comma decimals) by normalizing comma → dot.
    const amountMatch = trimmed.replace(/\s+/g, '').match(/-?\d+(?:[.,]\d+)?/);
    const amount = amountMatch ? Number.parseFloat(amountMatch[0].replace(',', '.')) : null;

    return {
      amount: Number.isFinite(amount) ? amount : null,
      currency,
    };
  }

  return { amount: null, currency: null };
}

/**
 * @param {string|null|undefined} url
 * @returns {string|null}
 */
function extractHostname(url) {
  if (!url || typeof url !== 'string') return null;
  try {
    return new URL(url).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return null;
  }
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function toNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const n = Number.parseFloat(value.replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function toInteger(value) {
  const n = toNumber(value);
  return n == null ? null : Math.round(n);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function toStringOrNull(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Perplexity card normalizer. Snake_case provider shape:
 *
 *   { title, brand, price, image_url, url, rating, review_count, merchant, … }
 *
 * @param {object} card
 * @param {number} position
 */
export function parsePerplexityCard(card, position) {
  const price = parsePrice(card.price);
  const merchantUrl = toStringOrNull(card.url ?? card.link);
  return {
    position,
    product_title: toStringOrNull(card.title ?? card.name),
    product_brand: toStringOrNull(card.brand ?? card.merchant),
    price_amount: price.amount,
    price_currency: price.currency,
    image_url: toStringOrNull(card.image_url ?? card.image),
    merchant_url: merchantUrl,
    merchant_domain: extractHostname(merchantUrl),
    rating: toNumber(card.rating),
    review_count: toInteger(card.review_count ?? card.reviews),
    raw: card,
  };
}

/**
 * Google AI Mode card normalizer. CamelCase provider shape:
 *
 *   { title, brand, price, imageUrl, url, rating, reviewCount, merchant, … }
 *
 * @param {object} card
 * @param {number} position
 */
export function parseAiModeCard(card, position) {
  const price = parsePrice(card.price);
  const merchantUrl = toStringOrNull(card.url ?? card.link);
  return {
    position,
    product_title: toStringOrNull(card.title ?? card.name ?? card.productName),
    product_brand: toStringOrNull(card.brand ?? card.merchant),
    price_amount: price.amount,
    price_currency: price.currency,
    image_url: toStringOrNull(card.imageUrl ?? card.image),
    merchant_url: merchantUrl,
    merchant_domain: extractHostname(merchantUrl),
    rating: toNumber(card.rating),
    review_count: toInteger(card.reviewCount ?? card.reviews),
    raw: card,
  };
}

/**
 * Microsoft Copilot card normalizer. CamelCase, slightly different field
 * names from AI Mode (`productName`, `productBrand`, `merchantName`).
 *
 * @param {object} card
 * @param {number} position
 */
export function parseCopilotCard(card, position) {
  const price = parsePrice(card.price);
  const merchantUrl = toStringOrNull(card.url ?? card.link ?? card.productUrl);
  return {
    position,
    product_title: toStringOrNull(card.productName ?? card.title ?? card.name),
    product_brand: toStringOrNull(card.productBrand ?? card.brand ?? card.merchantName),
    price_amount: price.amount,
    price_currency: price.currency,
    image_url: toStringOrNull(card.imageUrl ?? card.image),
    merchant_url: merchantUrl,
    merchant_domain: extractHostname(merchantUrl),
    rating: toNumber(card.rating),
    review_count: toInteger(card.reviewCount ?? card.reviewsCount ?? card.reviews),
    raw: card,
  };
}

/**
 * Pick the right normalizer for a platform / scraper id.
 *
 * @param {string|null|undefined} platform
 */
function pickParser(platform) {
  if (!platform || typeof platform !== 'string') return null;
  const p = platform.toLowerCase();
  if (p.startsWith('perplexity')) return parsePerplexityCard;
  if (p.startsWith('google-aimode') || p === 'google-ai-mode') return parseAiModeCard;
  if (p.startsWith('copilot')) return parseCopilotCard;
  return null;
}

/**
 * Normalize the raw `shopping_cards` array off a prompt_results row into
 * an array of analytical-column-shaped objects ready for insert.
 *
 * Returns `[]` for any platform without a parser or for empty input —
 * the worker can safely call this on every result without branching.
 *
 * @param {string} platform
 * @param {unknown} cards
 */
export function normalizeShoppingCards(platform, cards) {
  if (!Array.isArray(cards) || cards.length === 0) return [];
  const parser = pickParser(platform);
  if (!parser) return [];
  return cards
    .map((card, i) => {
      if (!card || typeof card !== 'object') return null;
      try {
        return parser(card, i);
      } catch (err) {
        // A bad card shouldn't kill the whole batch — log and drop.
        console.error('[shopping-cards] parser failed:', err.message, { platform, position: i });
        return null;
      }
    })
    .filter(Boolean);
}

/**
 * Match a normalized card against the tracked brand and competitors.
 * Returns `{ matched_brand_id, matched_brand_role }`.
 *
 *   - `own` when the product brand, product title, or merchant domain
 *     contains the tracked brand name OR matches one of its domains.
 *     `matched_brand_id` is the brand's uuid.
 *   - `competitor` when those same fields contain a tracked competitor's
 *     name or merchant domain. `matched_brand_id` is the competitor's uuid.
 *   - `other` otherwise. `matched_brand_id` is null.
 *
 * Substring matching mirrors the citations matcher in response-parser.js —
 * keeps the two surfaces aligned without an extra dependency.
 *
 * @param {ReturnType<typeof parsePerplexityCard>} card
 * @param {{ brandId: string, brandName: string, domains: string[] }} brand
 * @param {Array<{ id: string, name: string, domain: string|null }>} competitors
 */
export function matchCardBrand(card, brand, competitors) {
  const blob = [card.product_brand, card.product_title, card.merchant_domain]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const brandName = brand.brandName?.toLowerCase() ?? '';
  if (brandName && blob.includes(brandName)) {
    return { matched_brand_id: brand.brandId, matched_brand_role: 'own' };
  }
  for (const domain of brand.domains ?? []) {
    const d = domain?.toLowerCase();
    if (d && card.merchant_domain === d) {
      return { matched_brand_id: brand.brandId, matched_brand_role: 'own' };
    }
  }

  for (const comp of competitors ?? []) {
    const compName = comp.name?.toLowerCase();
    if (compName && blob.includes(compName)) {
      return { matched_brand_id: comp.id, matched_brand_role: 'competitor' };
    }
    const compDomain = comp.domain?.toLowerCase();
    if (compDomain && card.merchant_domain === compDomain) {
      return { matched_brand_id: comp.id, matched_brand_role: 'competitor' };
    }
  }

  return { matched_brand_id: null, matched_brand_role: 'other' };
}
