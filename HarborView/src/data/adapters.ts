import { knowledgeResources } from './knowledge';
import type { KnowledgeResource } from './knowledge';
import {
  orgAlert,
  sampleCommitments,
  sampleProjects,
  sampleRequests,
  sampleResources,
  sampleStaff,
  sampleWorkItems,
} from './sampleData';
import type {
  Commitment,
  OrgAlert,
  Resource,
  StaffMember,
  WorkItem,
  WorkspaceProject,
  WorkspaceRequest,
} from './types';

/**
 * Local adapter layer.
 *
 * Components never import sampleData directly — they go through these
 * functions, which is the seam a future integration replaces. A Planner,
 * Asana, or SharePoint adapter would implement the same three signatures
 * (returning the same normalized WorkItem/Commitment/OrgAlert shapes from
 * data/types.ts) and nothing above this layer would need to change.
 */

export function getMyOpenItems(): WorkItem[] {
  return sampleWorkItems.filter((item) => item.tier === 'attention');
}

export function getMyCommitments(): Commitment[] {
  return sampleCommitments;
}

export function getMyRequests(): WorkspaceRequest[] {
  return sampleRequests;
}

export function getMyProjects(): WorkspaceProject[] {
  return sampleProjects;
}

export function getOrgAlert(): OrgAlert | null {
  return orgAlert ?? {
    id: 'office-closure-september-7',
    message: 'Main office closed Monday, September 7',
    severity: 'notice',
  };
}

export function getStaffDirectory(): StaffMember[] {
  return sampleStaff;
}

export function getResourceCatalog(): Resource[] {
  return [...knowledgeResources, ...sampleResources];
}

export function getKnowledgeCatalog(): KnowledgeResource[] {
  return knowledgeResources;
}
