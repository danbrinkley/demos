import { describe, expect, it } from 'vitest';
import { knowledgeHref, knowledgeResources, knowledgeTasks, recentlyUpdated, searchKnowledge } from './knowledge';

describe('Knowledge catalog', () => {
  it('gives every task a resource and every resource a unique destination', () => {
    expect(new Set(knowledgeResources.map((item) => item.id)).size).toBe(knowledgeResources.length);
    expect(new Set(knowledgeResources.map(knowledgeHref)).size).toBe(knowledgeResources.length);
    for (const task of knowledgeTasks) expect(knowledgeResources.some((item) => item.id === task.resourceId)).toBe(true);
  });
  it('searches meaningful keywords using case-insensitive, multi-word matching', () => {
    expect(searchKnowledge(knowledgeResources, '  REIMBURSEMENT receipts ', '').map((item) => item.id)).toContain('expense-guide');
    expect(searchKnowledge(knowledgeResources, 'program templates', '').map((item) => item.id)).toContain('report-template');
    expect(searchKnowledge(knowledgeResources, 'volunteer onboarding', 'finance')).toEqual([]);
  });
  it('filters by topic and handles unknown topics or queries honestly', () => {
    expect(searchKnowledge(knowledgeResources, '', 'finance')).toHaveLength(4);
    expect(searchKnowledge(knowledgeResources, 'no-match-xyz', '')).toEqual([]);
    expect(searchKnowledge(knowledgeResources, '', 'not-a-topic')).toEqual([]);
  });
  it('shows three changed resources in review-date order without mutating the catalog', () => {
    const before = knowledgeResources.map((item) => item.id);
    expect(recentlyUpdated(knowledgeResources).map((item) => item.id)).toEqual(['expense-guide', 'volunteer-checklist', 'report-template']);
    expect(knowledgeResources.map((item) => item.id)).toEqual(before);
  });
});
