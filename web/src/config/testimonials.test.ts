import { describe, expect, it } from 'vitest';
import { comparisonPoints, testimonials } from './testimonials';

describe('marketing proof content', () => {
  it('includes product proof points', () => {
    expect(testimonials.length).toBeGreaterThan(0);
    expect(comparisonPoints.length).toBeGreaterThan(0);
  });
});
