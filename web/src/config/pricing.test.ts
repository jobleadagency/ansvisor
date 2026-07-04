import { describe, expect, it } from 'vitest';
import { faqItems, pricingPlans } from './pricing';

describe('pricing config', () => {
  it('includes starter, growth, and enterprise plans', () => {
    expect(pricingPlans.map((plan) => plan.name)).toEqual(['Starter', 'Growth', 'Enterprise']);
  });

  it('includes launch-ready FAQ content', () => {
    expect(faqItems.length).toBeGreaterThan(0);
    expect(faqItems[0]?.question).toContain('self-host');
  });
});
