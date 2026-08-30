import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  getMyCommitments,
  getMyOpenItems,
  getMyProjects,
  getMyRequests,
  getOrgAlert,
  getResourceCatalog,
  getStaffDirectory,
} from '../data/adapters';
import { currentUser } from '../data/sampleData';
import type {
  Commitment,
  CurrentUser,
  OrgAlert,
  Resource,
  StaffMember,
  WorkItem,
  WorkspaceProject,
  WorkspaceRequest,
} from '../data/types';

interface WorkspaceDataContextValue {
  currentUser: CurrentUser;
  workItems: WorkItem[];
  commitments: Commitment[];
  requests: WorkspaceRequest[];
  projects: WorkspaceProject[];
  alert: OrgAlert | null;
  staff: StaffMember[];
  resources: Resource[];
  /** Marks a work item's detail action as done. The single source of truth every view reads from. */
  completeWorkItem: (id: string) => void;
  /** Most recent status-change message for assistive tech; empty when nothing has happened yet. */
  liveMessage: string;
  /** Which work-item detail panels are currently expanded — shared so search can open one from outside Home. */
  expandedItemIds: Set<string>;
  toggleItemExpanded: (id: string) => void;
  /** Set when search asks Home to scroll to and focus a specific (now-expanded) item. */
  pendingFocusItemId: string | null;
  requestItemFocus: (id: string) => void;
  clearItemFocus: () => void;
}

const WorkspaceDataContext = createContext<WorkspaceDataContextValue | null>(null);

export function WorkspaceDataProvider({ children }: { children: ReactNode }) {
  const [workItems, setWorkItems] = useState<WorkItem[]>(() => getMyOpenItems());
  const [liveMessage, setLiveMessage] = useState('');
  const [expandedItemIds, setExpandedItemIds] = useState<Set<string>>(() => new Set());
  const [pendingFocusItemId, setPendingFocusItemId] = useState<string | null>(null);

  // Loaded once from the adapter layer; this demo never mutates these locally.
  const [commitments] = useState<Commitment[]>(() => getMyCommitments());
  const [requests] = useState<WorkspaceRequest[]>(() => getMyRequests());
  const [projects] = useState<WorkspaceProject[]>(() => getMyProjects());
  const [alert] = useState<OrgAlert | null>(() => getOrgAlert());
  const [staff] = useState<StaffMember[]>(() => getStaffDirectory());
  const [resources] = useState<Resource[]>(() => getResourceCatalog());

  const completeWorkItem = useCallback(
    (id: string) => {
      const target = workItems.find((item) => item.id === id);
      if (!target || target.completed) return;

      setWorkItems((items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                completed: true,
                requiresAction: false,
                status: item.kind === 'expense' && item.status === 'pending_approval' ? 'approved' : item.status,
                statusLabel: item.completedStatusLabel ?? item.statusLabel,
              }
            : item,
        ),
      );
      setLiveMessage(target.completedAnnouncement ?? `${target.title} completed.`);
    },
    [workItems],
  );

  const toggleItemExpanded = useCallback((id: string) => {
    setExpandedItemIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Triggered from a click handler (GlobalSearch), not from an effect: opens
  // the item's panel and records that Home should scroll/focus it once mounted.
  const requestItemFocus = useCallback((id: string) => {
    setExpandedItemIds((current) => new Set(current).add(id));
    setPendingFocusItemId(id);
  }, []);
  const clearItemFocus = useCallback(() => setPendingFocusItemId(null), []);

  const value = useMemo<WorkspaceDataContextValue>(
    () => ({
      currentUser,
      workItems,
      commitments,
      requests,
      projects,
      alert,
      staff,
      resources,
      completeWorkItem,
      liveMessage,
      expandedItemIds,
      toggleItemExpanded,
      pendingFocusItemId,
      requestItemFocus,
      clearItemFocus,
    }),
    [
      workItems,
      commitments,
      requests,
      projects,
      alert,
      staff,
      resources,
      completeWorkItem,
      liveMessage,
      expandedItemIds,
      toggleItemExpanded,
      pendingFocusItemId,
      requestItemFocus,
      clearItemFocus,
    ],
  );

  return <WorkspaceDataContext.Provider value={value}>{children}</WorkspaceDataContext.Provider>;
}

export function useWorkspaceData(): WorkspaceDataContextValue {
  const context = useContext(WorkspaceDataContext);
  if (!context) {
    throw new Error('useWorkspaceData must be used within a WorkspaceDataProvider');
  }
  return context;
}
