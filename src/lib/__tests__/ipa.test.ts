import { describe, expect, it } from 'vitest';
import { getStressLabel } from '../ipa';

describe('IPA stress labels', () => {
  it('labels first- and second-syllable stress', () => {
    expect(getStressLabel('/aˈma/')).toBe('2nd syllable');
    expect(getStressLabel('/ˈmesa/')).toBe('1st syllable');
    expect(getStressLabel('/isˈdaʔ/')).toBe('2nd syllable');
    expect(getStressLabel('/baˈsaʔ/')).toBe('2nd syllable');
    expect(getStressLabel('/ˈbaka/')).toBe('1st syllable');
    expect(getStressLabel('/baˈka/')).toBe('2nd syllable');
  });

  it('returns null for phrases and missing IPA', () => {
    expect(getStressLabel('/maɡanˌdaŋ uˈmaɡa/')).toBeNull();
    expect(getStressLabel(undefined)).toBeNull();
    expect(getStressLabel('/basa/')).toBeNull();
  });
});
