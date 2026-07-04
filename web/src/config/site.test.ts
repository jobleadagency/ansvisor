import { describe, expect, it } from 'vitest';
import { siteConfig } from './site';

describe('site config', () => {
  it('uses the Optumus Analytics brand identity', () => {
    expect(siteConfig.name).toBe('Optumus Analytics');
    expect(siteConfig.description).toContain('AI Search & LLM Visibility');
    expect(siteConfig.url).toBe('https://optumusanalytics.com');
  });
});
