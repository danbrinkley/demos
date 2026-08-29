import { orgAlert, sampleCommitments, sampleResources, sampleStaff, sampleWorkItems } from './sampleData';
import type { Commitment, OrgAlert, Resource, StaffMember, WorkItem } from './types';

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
  return sampleWorkItems;
}

export function getMyCommitments(): Commitment[] {
  return sampleCommitments;
}

export function getOrgAlert(): OrgAlert | null {
  return orgAlert;
}

export function getStaffDirectory(): StaffMember[] {
  return sampleStaff;
}

export function getResourceCatalog(): Resource[] {
  return sampleResources;
}
