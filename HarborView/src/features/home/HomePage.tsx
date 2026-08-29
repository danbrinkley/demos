import { useEffect } from 'react';
import { OrgAlertBanner } from '../../components/shell/OrgAlertBanner';
import { DEMO_TODAY } from '../../data/demoDate';
import { selectMyTasks, selectThisWeek } from '../../data/selectors';
import { useWorkspaceData } from '../../state/WorkspaceDataContext';
import { AttentionListSection } from './AttentionListSection';
import { Greeting } from './Greeting';
import './HomePage.css';
import './homeShared.css';
import { ThisWeekSection } from './ThisWeekSection';
import { ActiveProjectsSection } from './ActiveProjectsSection';
import { MyRequestsSection } from './MyRequestsSection';
import { WorkSummarySection } from './WorkSummarySection';

export function HomePage() {
  const {
    currentUser,
    workItems,
    commitments,
    requests,
    projects,
    alert,
    completeWorkItem,
    expandedItemIds,
    toggleItemExpanded,
    pendingFocusItemId,
    clearItemFocus,
  } = useWorkspaceData();

  const myTasks = selectMyTasks(workItems);
  const thisWeek = selectThisWeek(commitments);

  // When search asks Home to open a specific item (already expanded by
  // requestItemFocus), move focus there so keyboard and screen-reader users
  // land on the right content instead of just the URL changing underneath them.
  useEffect(() => {
    if (!pendingFocusItemId) return;

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(`work-item-${pendingFocusItemId}`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target?.focus({ preventScroll: true });
      clearItemFocus();
    });

    return () => cancelAnimationFrame(frame);
  }, [pendingFocusItemId, clearItemFocus]);

  return (
    <div className="hv-home">
      <OrgAlertBanner alert={alert} />

      <Greeting firstName={currentUser.firstName} today={DEMO_TODAY} />

      <WorkSummarySection tasks={myTasks} requests={requests} projects={projects} />

      <div className="hv-home__dashboard-grid">
        <div className="hv-home__work-area">
          <AttentionListSection
            items={myTasks}
            expandedIds={expandedItemIds}
            onToggle={toggleItemExpanded}
            onComplete={completeWorkItem}
          />
          <MyRequestsSection requests={requests} />
          <ActiveProjectsSection projects={projects} />
        </div>
        <aside className="hv-home__upcoming" aria-label="Upcoming commitments">
          <ThisWeekSection commitments={thisWeek} />
        </aside>
      </div>
    </div>
  );
}
